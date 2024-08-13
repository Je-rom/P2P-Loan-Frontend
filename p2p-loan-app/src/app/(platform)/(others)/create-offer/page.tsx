'use client';
import React, { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import LoanOptions from '@/components/shared/create-offer-select-options';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import TermsAndConditionDialog from './term-conditions-dialog';

interface FormField {
  label: string;
  placeholder: string;
  type: string;
  name: keyof FormValues;
}

interface FormValues {
  occupation: string;
  loanAmount: string;
  loanPurpose: string;
  additionalNote: string;
  termsAccepted: boolean;
}

interface Errors {
  [key: string]: string;
}

const CreateOfferPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formFields: FormField[] = [
    {
      label: 'Description',
      placeholder: 'Add your occupation',
      type: 'text',
      name: 'occupation',
    },
    {
      label: 'Loan Amount',
      placeholder: 'Enter the loan amount',
      type: 'number',
      name: 'loanAmount',
    },
    {
      label: 'Loan Purpose',
      placeholder: 'Specify the loan purpose',
      type: 'text',
      name: 'loanPurpose',
    },
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    occupation: '',
    loanAmount: '',
    loanPurpose: '',
    additionalNote: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      termsAccepted: e.target.checked,
    }));
  };

  const validateForm = () => {
    let newErrors: Errors = {};
    formFields.forEach((field) => {
      if (!formValues[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    if (!formValues.additionalNote) {
      newErrors.additionalNote = 'Additional Note is required';
    }
    if (!formValues.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Handle form submission
      console.log('Form submitted successfully', formValues);
    }
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Create New Request</h1>
      </div>
      <div className="flex flex-col space-y-6 p-4 mt-10">
        {formFields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full"
          >
            <h1 className="mb-2 md:mb-0 md:w-1/4">
              {field.label} <span className="text-red-500">*</span>
            </h1>
            <div className="relative w-full md:w-3/4">
              <Input
                className={`w-full pl-${field.type === 'number' ? '8' : '3'} md:pl-${field.type === 'number' ? '10' : '4'}`}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={formValues[field.name] as string}
                onChange={handleInputChange}
              />
              {errors[field.name] && (
                <span className="text-red-500">{errors[field.name]}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <LoanOptions />
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full p-4">
        <h1 className="mb-2 md:mb-0 md:w-1/4">
          Additional Note <span className="text-red-500">*</span>
        </h1>
        <div className="relative w-full md:w-3/4">
          <Textarea
            placeholder="Add any additional notes here"
            name="additionalNote"
            value={formValues.additionalNote}
            onChange={handleInputChange}
          />
          {errors.additionalNote && (
            <span className="text-red-500">{errors.additionalNote}</span>
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-auto">
          <h1>
            Click to see the
            <button onClick={() => setIsOpen(true)} className="text-blue-400">
              Terms and Conditions
            </button>
            <TermsAndConditionDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} />
          </h1>
          <div className="flex items-start space-x-2 mt-2">
            <Checkbox
              checked={formValues.termsAccepted}
              onCheckedChange={(checked) =>
                handleCheckboxChange({
                  target: { checked },
                } as ChangeEvent<HTMLInputElement>)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Accept terms and conditions
              </label>
              {errors.termsAccepted && (
                <span className="text-red-500">{errors.termsAccepted}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 w-full md:w-auto justify-center">
          <Button className="bg-white text-gray-400 font-semibold hover:bg-red-700 hover:text-white">
            Cancel
          </Button>
          <Button
            className="bg-blue-400 hover:bg-green-600 font-semibold"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateOfferPage;
