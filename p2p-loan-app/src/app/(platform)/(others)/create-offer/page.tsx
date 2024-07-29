'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import LoanOptions from '@/components/shared/create-offer-select-options';
import { Textarea } from '@/components/ui/textarea';

const CreateOfferPage = () => {
  const formFields = [
    { label: 'Occupation', placeholder: 'Add your occupation', type: 'text' },
    {
      label: 'Loan Amount',
      placeholder: 'Enter the loan amount',
      type: 'number',
    },
    {
      label: 'Loan Purpose',
      placeholder: 'Specify the loan purpose',
      type: 'text',
    },
  ];
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
              />
            </div>
          </div>
        ))}
      </div>
      <LoanOptions />
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full p-4">
        <h1 className="mb-2 md:mb-0 md:w-1/4 text-wrap">
          Additional Note and Attach Document <span className="text-red-500">*</span>
        </h1>
        <div className="relative w-full md:w-3/4">
          <Textarea />
        </div>
      </div>
    </>
  );
};

export default CreateOfferPage;
