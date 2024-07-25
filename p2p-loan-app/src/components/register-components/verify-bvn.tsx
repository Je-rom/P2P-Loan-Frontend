'use client';
import React from 'react';
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

const BVNVerification: React.FC = () => {
  const { formData, nextStep, updateFormData } = useFormStore();
  const { step } = useFormStore();
  const router = useRouter();
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify Email' },
    { number: 3, label: 'Verify BVN' },
  ];

  const currentStep = steps.find((s) => s.number === step);

  const bvnSchema = z.object({
    bvn: z.string().length(11, {
      message: 'BVN must be 11 digits',
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
    updateFormData({ bvnVerification: data });
    nextStep();
    router.push('/login');
  };

  return (
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
            <p className="text-md mt-2">Why we need your BVN</p>
            <p className="text-xs mt-2">
              Your Bank Verification Number (BVN) helps us verify your identity
              and ensures the security of your account. It allows us to provide
              better service and protect your personal information.
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
                        <FormLabel className="text-sm font-light">
                          Bank Verification Number [11-digits]
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="py-3 px-4 rounded-xl w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2 flex justify-center items-center">
                  <Button
                    className="w-[400px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                    type="submit"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Verify BVN'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BVNVerification;
