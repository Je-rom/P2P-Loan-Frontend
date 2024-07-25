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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import StepIndicator from '@/components/register-components/step-indicator';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Define the schema for the PIN form validation
const pinSchema = z.object({
  pin: z.string()
    .length(4, {
      message: 'Your PIN must be exactly 4 digits.',
    })
    .regex(/^\d{4}$/, {
      message: 'Your PIN must only contain numbers.',
    }),
  confirmPin: z.string()
    .min(1, { message: 'Confirm PIN is required.' }),
}).refine((data) => data.pin === data.confirmPin, {
  path: ['confirmPin'],
  message: "PINs don't match.",
});

type PINFormValues = z.infer<typeof pinSchema>;

const CreatePin: React.FC = () => {
  const { formData, prevStep, updateFormData } = useFormStore();
  const [pinCreation, setPinCreation] = useState(formData.pinCreation);

  // Initialize the form with validation schema and default values
  const form = useForm<PINFormValues>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: pinCreation.pin || '',
      confirmPin: pinCreation.pin || '',
    },
  });

  const onSubmit = (data: PINFormValues) => {
    updateFormData({ pinCreation: { pin: data.pin } });
    // Optionally move to the next step
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="flex items-center justify-center mt-8">
          <div className="w-full text-center">
            <StepIndicator />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <h1 className="text-md flex gap-2 items-center">
              <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
                {5}
              </span>
              Create PIN
            </h1>
            <p className="text-md mt-2">Set up your secure PIN</p>
            <p className="text-xs mt-2">
              Choose a 4-digit PIN that you'll use to access your account. Make sure it's something memorable but secure.
            </p>
          </div>
          <div className="w-full max-w-lg mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-light">
                          Create PIN
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"  // Changed to text for better number input handling
                            maxLength={4}
                            {...field}
                            className="py-3 px-4 rounded-xl w-full"
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
                    name="confirmPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-light">
                          Confirm PIN
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"  // Changed to text for better number input handling
                            maxLength={4}
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
                    className="w-full max-w-md rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                    type="submit"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Confirm'
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

export default CreatePin;
