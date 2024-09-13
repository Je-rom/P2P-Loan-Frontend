// import React from 'react';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectFieldProps {
//   label: string;
//   options: SelectOption[];
//   placeholder: string;
// }

// const SelectField: React.FC<SelectFieldProps> = ({
//   label,
//   options,
//   placeholder,
// }) => (
//   <div className="flex flex-col space-y-6 p-4">
//     <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
//       <div className="flex items-center mb-2 md:mb-0 md:w-1/4">
//         <h1 className="">{label}</h1>
//         <span className="text-red-500 ml-1">*</span>
//       </div>
//       <div className="w-full md:w-3/4">
//         <Select>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder={placeholder} />
//           </SelectTrigger>
//           <SelectContent>
//             {options.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </div>
// );

// const LoanOptions: React.FC = () => {
//   const selectOptions = {
//     loanType: [
//       { value: 'personal', label: 'Personal' },
//       { value: 'business', label: 'Business' },
//       { value: 'education', label: 'Education' },
//     ],
//     loanDuration: [
//       { value: 'shortTerm', label: 'Short Term' },
//       { value: 'mediumTerm', label: 'Medium Term' },
//       { value: 'longTerm', label: 'Long Term' },
//     ],
//     interestRate: [
//       { value: 'fixed', label: 'Fixed' },
//       { value: 'variable', label: 'Variable' },
//     ],
//     repaymentPlan: [
//       { value: 'monthly', label: 'Monthly' },
//       { value: 'quarterly', label: 'Quarterly' },
//       { value: 'yearly', label: 'Yearly' },
//     ],
//   };

//   return (
//     <div>
//       <SelectField
//         label="Loan Category"
//         placeholder="Select Loan"
//         options={selectOptions.loanType}
//       />
//       <SelectField
//         label="Loan Duration"
//         placeholder="Select loan duration"
//         options={selectOptions.loanDuration}
//       />
//       <SelectField
//         label="Interest Rate"
//         placeholder="Select interest rate"
//         options={selectOptions.interestRate}
//       />
//       <SelectField
//         label="Frequency of Repayment"
//         placeholder="Select loan repayment"
//         options={selectOptions.repaymentPlan}
//       />
//     </div>
//   );
// };

// export default LoanOptions;
