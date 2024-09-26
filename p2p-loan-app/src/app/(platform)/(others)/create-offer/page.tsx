'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import TermsAndConditionDialog from './term-conditions-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useLoanOffer from '@/hooks/useLoanOffer';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useWallet from '@/hooks/useWallet';
import { Loader2 } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

const getMinDuration = (frequency: string) => {
  switch (frequency) {
    case 'Daily':
      return 1;
    case 'Weekly':
      return 7;
    case 'Monthly':
      return 30;
    default:
      return 0; // Default case, if frequency is not set
  }
};

const formSchema = z.object({
  loanAmount: z
    .string()
    .nonempty('Loan Amount is required')
    .refine(
      (val) => {
        const amount = parseInt(val, 10);
        return amount >= 1000 && amount <= 500000;
      },
      {
        message: 'Loan Amount must be between 1,000 and 500,000 naira',
      },
    ),
  interestRate: z
    .string()
    .nonempty('Interest Rate is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid interest rate'),
  accruingInterestRate: z
    .string()
    .nonempty('Accruing Interest Rate is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid accruing interest rate'),
  loanDurationDays: z
    .string()
    .nonempty('Loan Duration is required')
    .regex(/^\d+$/, 'Loan Duration must be a number'),
  gracePeriodDays: z
    .string()
    .nonempty('Grace Period is required')
    .regex(/^\d+$/, 'Grace Period must be a number'),
  repaymentFrequency: z.string().nonempty('Repayment Frequency is required'),
  walletId: z.string().nonempty('Wallet ID is required'),
  additionalNote: z.string().max(288, 'Maximum 288 characters allowed'),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateOfferPage = () => {
  const { getWalletQuery } = useWallet();
  const { CreateLoanOfferMutation } = useLoanOffer();
  const createLoanOfferMutation = CreateLoanOfferMutation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<{
    walletId: string;
    accountNumber: string;
  }>({ walletId: '', accountNumber: '' });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: '',
      interestRate: '',
      accruingInterestRate: '',
      loanDurationDays: '',
      gracePeriodDays: '',
      repaymentFrequency: '',
      walletId: '',
      additionalNote: '',
      termsAccepted: false,
    },
  });

  const maxCharacters = 288;

  // Fetch user type from local storage
  useEffect(() => {
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType);
  }, []);

  // Fetch wallet details and set wallet info
  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWallet = result[0];
        setWalletInfo({
          walletId: firstWallet.id,
          accountNumber: firstWallet.accountNumber,
        });
        setValue('walletId', firstWallet.id);
      }
    }
  }, [getWalletQuery.isSuccess, getWalletQuery.data, setValue]);

  useEffect(() => {
    if (getWalletQuery.isError) {
      toast.error('Failed to fetch wallet');
    }
  }, [getWalletQuery.isError]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const frequency = data.repaymentFrequency;
    const duration = parseInt(data.loanDurationDays, 10);
    const minDuration = getMinDuration(frequency);

    if (duration < minDuration) {
      toast.error(
        'For the selected frequency, the loan duration must be at least 7 days for Weekly and 30 days for Monthly',
      );
      return;
    }

    try {
      const createLoanOfferRequest = {
        walletId: data.walletId,
        amount: data.loanAmount,
        repaymentFrequency: data.repaymentFrequency,
        gracePeriodDays: parseInt(data.gracePeriodDays, 10),
        loanDurationDays: duration,
        interestRate: parseFloat(data.interestRate),
        accruingInterestRate: data.accruingInterestRate,
        additionalInformation: data.additionalNote,
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
  };

  const isLoading = createLoanOfferMutation.isPending;
  const additionalNoteLength = watch('additionalNote').length;
  const termsAccepted = watch('termsAccepted');

  return (
    <>
      <button onClick={() => router.back()}>
        <div className="flex items-center">
          <MoveLeft className="w-5" />
          <h1 className="ml-1 font-bold text-sm">Back</h1>
        </div>
      </button>
      <div>
        <h1 className="font-bold text-xl mt-4">Create New Offer</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-6 p-4 mt-10">
          {[
            {
              label: 'Loan Amount',
              name: 'loanAmount',
              placeholder: 'Enter the loan amount',
              type: 'number',
            },
            {
              label: 'Your Wallet Id',
              name: 'walletId',
              placeholder: 'Add your borrow pointe wallet',
              type: 'text',
            },
            {
              label: 'Interest Rate',
              name: 'interestRate',
              placeholder: 'Specify the interest rate',
              type: 'text',
            },
            {
              label: 'Accruing Interest Rate',
              name: 'accruingInterestRate',
              placeholder: 'Accruing interest rate',
              type: 'text',
            },
            {
              label: 'Grace Period',
              name: 'gracePeriodDays',
              placeholder: 'Specify grace period',
              type: 'text',
            },
            {
              label: 'Loan Duration',
              name: 'loanDurationDays',
              placeholder: 'Specify loan duration',
              type: 'text',
            },
          ].map((field, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full"
            >
              <h1 className="mb-2 md:mb-0 md:w-1/4">
                {field.label} <span className="text-red-500">*</span>
              </h1>
              <div className="relative w-full md:w-3/4">
                <Input
                  {...register(field.name as keyof FormValues)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full"
                  readOnly={field.name === 'walletId'}
                  value={
                    field.name === 'walletId' ? walletInfo.walletId : undefined
                  }
                />
                {errors[field.name as keyof FormValues] && (
                  <span className="text-red-500">
                    {errors[field.name as keyof FormValues]?.message}
                  </span>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <h1 className="mb-2 md:mb-0 md:w-1/4">
              Payment Frequency <span className="text-red-500">*</span>
            </h1>
            <div className="relative w-full md:w-3/4">
              <select
                {...register('repaymentFrequency')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              {errors.repaymentFrequency && (
                <span className="text-red-500">
                  {errors.repaymentFrequency?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full p-4">
          <h1 className="mb-2 md:mb-0 md:w-1/4">Additional Note</h1>
          <div className="relative w-full md:w-3/4">
            <Textarea
              {...register('additionalNote')}
              placeholder="Add any additional notes here..."
              maxLength={maxCharacters}
            />
            <div className="text-sm text-gray-500">
              {additionalNoteLength}/{maxCharacters} characters
            </div>
            {errors.additionalNote && (
              <span className="text-red-500">
                {errors.additionalNote?.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto">
            <div className="flex">
              <h1>Click to see the </h1>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-blue-400 ml-1"
              >
                Terms and Conditions
              </button>
            </div>

            <TermsAndConditionDialog
              open={isOpen}
              onOpenChange={() => setIsOpen(!isOpen)}
            />
            <div className="flex items-start space-x-2 mt-2">
              <Checkbox
                checked={termsAccepted}
                onCheckedChange={(checked) => {
                  setValue('termsAccepted', !!checked);
                  if (checked) {
                    clearErrors('termsAccepted'); // Clear the error when the checkbox is ticked
                  }
                }}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium">
                  Accept terms and conditions
                </label>
                {errors.termsAccepted && (
                  <span className="text-red-500">
                    {errors.termsAccepted?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full md:w-auto justify-center">
            <Button
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-500 font-semibold"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateOfferPage;
