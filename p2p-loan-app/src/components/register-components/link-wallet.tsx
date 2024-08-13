'use client';
import React, { useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import StepIndicator from '@/components/register-components/step-indicator';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Confetti } from '@/components/ui/confetti';

const LinkWallet: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } = useFormStore();
  const { step } = useFormStore();
  const [walletId, setWalletId] = useState('');

  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify BVN' },
    { number: 3, label: 'Verify Email ' },
    { number: 4, label: 'Wallet' },
  ];

  const currentStep = steps.find((s) => s.number === step);
  const email = localStorage.getItem('email');
  const user_type = localStorage.getItem('user_type');
  const router = useRouter();

  const WalletSchema = z.object({
    wallet: z.string({
      required_error: 'Please select a wallet provider to display.',
    }),
  });

  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
  });

  const onSubmit = async (data: z.infer<typeof WalletSchema>) => {
    // Update formData with the selected wallet provider
    updateFormData({
      linkWallet: {
        ...formData.linkWallet,
        walletProvider: data.wallet, // Update with the selected wallet
      },
    });

    // Check if user_type is set and route accordingly
    if (user_type) {
      router.push(`/${user_type}`);
    } else {
      console.error('User type is not set.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <div className="flex items-center justify-center mt-8">
            <div className="w-full max-w-2xl text-center">
              <StepIndicator />
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <h1 className="text-md flex gap-2 items-center">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
                  {currentStep?.number}
                </span>
                {currentStep?.label}
              </h1>
              <p className="text-md mt-2">Select a wallet provider</p>
              <p className="text-base mt-2">
                Choose a provider to securely manage your digital assets and
                transactions.
              </p>
              <div className="mt-10 flex justify-center items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="wallet"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-2 border-black">
                                <SelectValue placeholder="Select a verified wallet provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem className="text-lg" value="Monnify">
                                <div className="flex">
                                  <Image
                                    src={'/monnify.png'}
                                    alt="MonnifyLogo"
                                    width={50}
                                    height={10}
                                    className="mr-2"
                                  />
                                  Monnify
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center">
                      <Button
                        className=" bg-blue-600 hover:bg-blue-800"
                        type="submit"
                      >
                        <Confetti /> Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkWallet;
