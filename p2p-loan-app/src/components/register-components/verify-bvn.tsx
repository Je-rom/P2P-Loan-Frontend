'use client';
import React, { useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/register-components/step-indicator';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BVNVerification: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify BVN' },
    { number: 3, label: 'Link Wallet' },
    { number: 4, label: 'Verify Email ' },
  ];

  const bvnSchema = z.object({
    bvn: z
      .string()
      .min(9, {
        message: 'BVN must be at least 9 digits',
      })
      .max(11, {
        message: 'BVN must be at most 11 digits',
      }),
  });

  type BVNFormValues = z.infer<typeof bvnSchema>;
  const form = useForm<BVNFormValues>({
    resolver: zodResolver(bvnSchema),
    defaultValues: {
      bvn: formData.bvnVerification.bvn,
    },
  });

  const onSubmit = (data: BVNFormValues) => {
    setIsLoading(true);
    try {
      updateFormData({
        bvnVerification: {
          ...formData.bvnVerification,
          bvn: data.bvn,
        },
      });
      nextStep();
    } catch (error) {
      setFormError('An error occurred while verifying the BVN.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-base md:max-w-base lg:max-w-xl xl:max-w-4xl">
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
                  2
                </span>
                Verify BVN
              </h1>
              <p className="text-sm mt-2">Why we need your BVN</p>
              <p className="text-xs mt-2">
                Your Bank Verification Number (BVN) helps us verify your
                identity and ensures the security of your account.
              </p>
            </div>
            <div className="w-full max-w-lg mt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="bvn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-light">
                            Bank Verification Number [11-digits]
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="py-3 px-4 rounded-xl w-full"
                              maxLength={11}
                              pattern="\d{11}"
                              title="Please enter exactly 11 digits"
                              inputMode="numeric"
                              onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/\D/g, ''); // Only allow digits
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <Button
                      className="rounded-xl bg-blue-600 hover:bg-blue-800 text-white"
                      type="submit"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        'VERIFY BVN'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BVNVerification;
