'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { triggerConfetti } from '@/helper/confetti';
import router from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { forgotPasswordMutation } = useAuth();

  const ForgotPasswordSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address',
    }),
  });

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = forgotPasswordMutation.isPending;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const requestData = { email: data.email };
    forgotPasswordMutation.mutateAsync(requestData, {
      onSuccess: () => {
        router.push('/reset-password');
      },
      onError: (error: any) => {
        console.error('Error occurred during forgot password mutation:', error);
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/reg-background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <div className="bg-white p-6 rounded-xl w-[800px] h-[450px]">
        <div className="flex flex-col justify-center items-center mt-20">
          <h1 className="font-bold text-2xl">Forgot your password ?</h1>
          <p>Don't worry it happens to the best of us. Enter your email below to recovery your passowrd</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Email Address
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
              <div className="flex justify-center mt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-[400px] rounded-xl bg-blue-500 hover:bg-blue-700"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div> */}

      <div className="bg-white p-6 rounded-xl w-[800px] h-[450px] flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-start">
            <button
              onClick={() => router.push('/login')}
              className="flex items-center"
            >
              <Image
                src="/chevron_back.svg"
                alt="Back"
                width={20}
                height={20}
              />
              <span>Back to login</span>
            </button>
          </div>
          <h1 className="font-bold text-2xl mt-5">Forgot your password?</h1>
          <p className="mt-2">
            Don't worry it happens to the best of us. Enter your email below to
            recover your password.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md mt-4"
          >
            <div className="py-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-light">
                      Email Address
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
            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-[450px] rounded-xl bg-blue-500 hover:bg-blue-700"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
