'use client';
import React, { useEffect, useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import StepIndicator from '@/components/register-components/step-indicator';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import useWallet from '@/hooks/useWallet';

const LinkWallet: React.FC = () => {
  const router = useRouter();
  const { formData, nextStep, updateFormData, prevStep } = useFormStore();
  const { step } = useFormStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { GetWalletProvider } = useWallet();
  const [walletProvider, setWalletProvider] = useState<string | null>(null);
  const { data, isLoading, isError, error } = GetWalletProvider();

  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify BVN' },
    { number: 3, label: 'Link Wallet' },
    { number: 4, label: 'Verify Email' },
  ];

  const currentStep = steps.find((s) => s.number === step);

  const WalletSchema = z.object({
    wallet: z.string().nonempty({ message: 'Please select a wallet provider' }),
  });

  type WalletFormValues = z.infer<typeof WalletSchema>;
  const form = useForm<WalletFormValues>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      wallet: '',
    },
  });

  useEffect(() => {
    if (data) {
      console.log('Fetched wallet providers:', data.result);
      setWalletProvider(data.result[0]?.slug || null);
    }
    if (isError) {
      console.error('Error fetching wallet providers:', error);
      setFormError('Failed to load wallet providers. Please try again.');
    }
  }, [data, isError, error]);

  const handleWalletSubmit: SubmitHandler<WalletFormValues> = async (
    formData,
  ) => {
    setLoading(true);
    setFormError(null); // Clear previous errors
    try {
      const walletProviderId = formData.wallet;
      if (!walletProviderId) {
        setFormError('Please select a wallet provider.');
        return;
      }
      await updateFormData({
        linkWallet: {
          walletProvider: walletProviderId,
        },
      });
      nextStep();
    } catch (error) {
      console.error('Error updating form data:', error);
      setFormError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-base lg:max-w-xl xl:max-w-3xl h-[460px]">
        <div className="flex items-center justify-center mt-8">
          <div className="w-full max-w-2xl text-center">
            <StepIndicator />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <button className="flex items-center mb-2" onClick={handleBack}>
              <Image
                src="/chevron_back.svg"
                alt="Back"
                width={20}
                height={20}
              />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-sm flex gap-2 items-center">
              <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
                {currentStep?.number}
              </span>
              {currentStep?.label}
            </h1>
            <p className="text-sm mt-2">Select a wallet provider</p>
            <p className="text-xs mt-2">
              Choose a provider to securely manage your digital assets and
              transactions.
            </p>
            {formError && <p className="text-red-500">{formError}</p>}
            <div className="mt-10 flex justify-center items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleWalletSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="wallet"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <FormControl className="text-xs">
                            <SelectTrigger className="border-2 border-black">
                              <SelectValue placeholder="Select a wallet provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoading ? (
                              <SelectItem value="loading" disabled>
                                <div className="flex justify-center items-center text-xs">
                                  <svg
                                    className="animate-spin h-3 w-3 mr-3 text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                  </svg>
                                  Loading wallet providers...
                                </div>
                              </SelectItem>
                            ) : isError ? (
                              <SelectItem value="error" disabled>
                                <div className="flex justify-center items-center text-red-600 text-xs">
                                  <svg
                                    className="h-3 w-3 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636"
                                    />
                                  </svg>
                                  Failed to load wallet providers
                                </div>
                              </SelectItem>
                            ) : (
                              data?.result.map((provider) => (
                                <SelectItem
                                  key={provider.id}
                                  className="text-xs"
                                  value={provider.id}
                                >
                                  <div className="flex text-xs">
                                    <Image
                                      src={'/monnify.png'}
                                      alt="MonnifyLogo"
                                      width={30}
                                      height={10}
                                      className="mr-2"
                                    />
                                    {provider.name}
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 w-full"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'NEXT'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkWallet;
