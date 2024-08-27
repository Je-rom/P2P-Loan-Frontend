'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import TermsAndConditionDialog from './term-conditions-dialog';
import useLoanOffer from '@/hooks/useLoanOffer';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useWallet from '@/hooks/useWallet';

interface FormField {
  label: string;
  placeholder: string;
  type: string;
  name: keyof FormValues;
}

interface FormValues {
  interestRate: string;
  accruingInterestRate: string;
  loanDurationDays: string;
  loanAmount: string;
  gracePeriodDays: string;
  repaymentFrequency: string;
  walletId: string;
  additionalNote: string;
  termsAccepted: boolean;
}

interface Errors {
  [key: string]: string;
}

const CreateOfferPage = () => {
  const { getWalletQuery } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { CreateLoanOfferMutation } = useLoanOffer();
  const createLoanOfferMutation = CreateLoanOfferMutation();
  const router = useRouter();

  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWalletId = result[0].id;
        setFormValues((prevValues) => ({
          ...prevValues,
          walletId: firstWalletId,
        }));
      }
    }
  }, [getWalletQuery.isSuccess, getWalletQuery.data]);

  useEffect(() => {
    if (getWalletQuery.isError) {
      toast.error('Failed to fetch wallet');
    }
  }, [getWalletQuery.isError]);

  const formFields: FormField[] = [
    {
      label: 'Loan Amount',
      placeholder: 'Enter the loan amount',
      type: 'number',
      name: 'loanAmount',
    },
    {
      label: 'Your Wallet',
      placeholder: 'Add your borrow pointe wallet',
      type: 'text',
      name: 'walletId',
    },
    {
      label: 'Interest Rate',
      placeholder: 'Specify the interest rate for this loan',
      type: 'text',
      name: 'interestRate',
    },
    {
      label: 'Accruing Interest Rate',
      placeholder: 'Accuring interest rate',
      type: 'text',
      name: 'accruingInterestRate',
    },
    {
      label: 'Loan duration',
      placeholder: 'Specify the duration for this loan',
      type: 'text',
      name: 'loanDurationDays',
    },
    {
      label: 'Grace Period',
      placeholder: 'Give a fair grace period for your offer',
      type: 'text',
      name: 'gracePeriodDays',
    },
    {
      label: 'Payment Frequency',
      placeholder: 'Payment frequency can only be in Days, Weeks and Month',
      type: 'text',
      name: 'repaymentFrequency',
    },
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    loanAmount: '',
    interestRate: '',
    gracePeriodDays: '',
    loanDurationDays: '',
    repaymentFrequency: '',
    accruingInterestRate: '',
    walletId: '',
    additionalNote: '',
    termsAccepted: false,
  });

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
    if (!formValues.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    return newErrors;
  };
  const userType = localStorage.getItem('user_type');

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const createLoanOfferRequest = {
          walletId: formValues.walletId,
          amount: formValues.loanAmount,
          repaymentFrequency: formValues.repaymentFrequency,
          gracePeriodDays: parseInt(formValues.gracePeriodDays, 10),
          loanDurationDays: parseInt(formValues.loanDurationDays, 10),
          interestRate: parseFloat(formValues.interestRate),
          accruingInterestRate: formValues.accruingInterestRate,
          additionalInformation: formValues.additionalNote,
        };
        const result = await createLoanOfferMutation.mutateAsync(
          createLoanOfferRequest,
        );
        if (result.status === 'Created') {
          router.push(`${userType}/my-offers`);
        }
      } catch (error) {
        console.log(error, 'create offer error');
      }
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
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full p-4">
        <h1 className="mb-2 md:mb-0 md:w-1/4">
          Additional Note <span className="text-red-500"></span>
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
            <TermsAndConditionDialog
              open={isOpen}
              onOpenChange={() => setIsOpen(!isOpen)}
            />
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
            className="bg-blue-500 hover:bg-blue-500 font-semibold"
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
