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
import { Loader2 } from 'lucide-react';
import StepIndicator from '@/components/register-components/step-indicator';

const BasicInfo: React.FC = () => {
  const { formData, nextStep, updateFormData } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { step } = useFormStore();

  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify BVN' },
    { number: 3, label: 'Wallet' },
    { number: 4, label: 'Verify Email ' },
  ];

  const currentStep = steps.find((s) => s.number === step);

  const registerSchema = z
    .object({
      firstName: z.string().min(1, { message: 'First name is required' }),
      middleName: z.string().optional(),
      lastName: z.string().min(1, { message: 'Last name is required' }),
      email: z.string().email({ message: 'Invalid email' }),
      BvnDateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Please put in a valid date of birth in MM-DD-YYYY format',
      }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm Password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: "Passwords don't match",
    });

  type RegisterFormValues = z.infer<typeof registerSchema>;
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      BvnDateOfBirth: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (!selectedOption) {
      setFormError('Please select either Lender or Borrower.');
      return;
    }

    const { lastName, firstName, email, BvnDateOfBirth, password } = data;
    const userType = selectedOption === 'lender' ? 'lender' : 'borrower';
    setIsLoading(true);
    try {
      updateFormData({
        basicInfo: {
          firstName,
          lastName,
          email,
          BvnDateOfBirth,
          password,
          userType,
        },
      });
      nextStep();
    } catch (error) {
      setFormError('An error occurred while submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-4">
        <div className="bg-gray-200 p-6 rounded-lg mx-auto">
          <div className="text-center">
            <h1 className="font-bold text-lg md:text-2xl">
              Create your account
            </h1>
            <p className="text-sm md:text-lg p-4">
              Follow these steps to create your account: enter your personal
              details, verify your BVN, and set up your account securely. Let's
              get started!
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* <Button
              onClick={() => handleOptionSelect('lender')}
              className={`w-1/2 sm:w-[150px] md:w-[200px] h-[34px] ${selectedOption === 'lender' ? 'bg-blue-400' : 'bg-blue-800 hover:bg-blue-400 text-lg'}`}
            >
              Lender
            </Button>
            <Button
              onClick={() => handleOptionSelect('borrower')}
              className={`w-1/2 sm:w-[150px] md:w-[200px] h-[34px] ${selectedOption === 'borrower' ? 'bg-blue-400' : 'bg-blue-800 hover:bg-blue-400 text-lg'}`}
            >
              Borrower
            </Button> */}
            <Button
              onClick={() => handleOptionSelect('lender')}
              className={`w-1/2 sm:w-[150px] md:w-[300px] h-[34px] ${
                selectedOption === 'lender'
                  ? 'bg-blue-500 text-white border-none hover:bg-blue-500'
                  : 'bg-gray-200 text-blue-500 border border-black hover:bg-gray-200'
              }`}
            >
              Lender
            </Button>
            <Button
              onClick={() => handleOptionSelect('borrower')}
              className={`w-1/2 sm:w-[150px] md:w-[300px] h-[34px] ${
                selectedOption === 'borrower'
                  ? 'bg-blue-500 text-white border-none hover:bg-blue-500'
                  : 'bg-gray-200 text-blue-500 border border-black hover:bg-gray-200'
              }`}
            >
              Borrower
            </Button>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-full max-w-2xl text-center">
              <StepIndicator />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg">
              <div>
                <h1 className="text-sm flex gap-2">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-lg">
                    {currentStep?.number}
                  </span>
                  {currentStep?.label}
                </h1>
                <p className="text-xs md:text-lg mt-2">
                  Complete the form below to register for an account. Make sure
                  to fill in all the required fields to proceed to the next
                  step.
                </p>
                <h1 className="text-sm font-semibold mt-2">
                  *All fields are required
                </h1>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *First name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            Middle name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *Last name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="BvnDateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="py-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-light">
                            *Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              {...field}
                              className="py-2 px-4 rounded-lg border w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {formError && (
                    <div className="text-red-500 text-center mb-4">
                      {formError}
                    </div>
                  )}

                  <div className="flex justify-center mt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-[400px] rounded-xl bg-blue-600 hover:bg-blue-800 text-lg"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        'Next'
                      )}
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

export default BasicInfo;
