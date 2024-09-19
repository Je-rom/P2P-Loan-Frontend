import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PinInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
}

const AcceptRequestPinDialog: React.FC<PinInputDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    if (pin.length === 0) {
      toast.error('Please enter your PIN.');
      return;
    }
    onSubmit(pin);
    onClose();
  };

  const isPinValid = pin.length === 4 && /^\d+$/.test(pin);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95%] sm:max-w-[400px] h-auto rounded-2xl px-2 py-4 mx-auto">
        <DialogHeader>
          <DialogTitle>Enter PIN</DialogTitle>
          <DialogDescription className="text-xs">
            Please enter your 4-digit PIN to confirm this action.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="pin" className="text-left text-xs">
                PIN
              </Label>
              <Input
                id="pin"
                type="password"
                className="text-xs"
                pattern="\d*"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers
                  if (/^\d*$/.test(value)) {
                    setPin(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={!isPinValid}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptRequestPinDialog;
