import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from '@mui/material';

export default function AutocompleteHint() {
  const hint = React.useRef('');
  const [inputValue, setInputValue] = React.useState('');
  return (
    <Autocomplete
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          if (hint.current) {
            setInputValue(hint.current);
            event.preventDefault();
          }
        }
      }}
      onClose={() => {
        hint.current = '';
      }}
      onChange={(event, newValue) => {
        setInputValue(newValue && newValue.label ? newValue.label : '');
      }}
      disablePortal
      inputValue={inputValue}
      id="combo-box-hint-demo"
      options={filterOptions}
      sx={{ width: 90 }}
      renderInput={(params) => {
        return (
          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                position: 'absolute',
                opacity: 0.5,
                left: 14,
                top: 16,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: 'calc(100% - 75px)',
              }}
            >
              {hint.current}
            </Typography>
            <TextField
              {...params}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                const matchingOption = filterOptions.find((option) =>
                  option.label.startsWith(newValue),
                );

                if (newValue && matchingOption) {
                  hint.current = matchingOption.label;
                } else {
                  hint.current = '';
                }
              }}
              label="Filter"
            />
          </Box>
        );
      }}
    />
  );
}

const filterOptions = [
  { label: 'Date' },
  { label: 'Amount' },
  { label: 'Name' },
];
