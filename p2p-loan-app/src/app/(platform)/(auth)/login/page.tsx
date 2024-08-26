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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { LoginResponse } from '@/services/authService';

const LoginPage = () => {
  const router = useRouter();
  const { loginMutation } = useAuth();

  const LoginSchema = z.object({
    email: z.string().email({
      message: 'Invalid username or email address',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  });

  type LoginFormValues = z.infer<typeof LoginSchema>;
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = loginMutation.isPending;

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (data: LoginResponse) => {
        const { status, result: responseData } = data;

        if (status === 'Success') {
          const { userType, email, firstName, lastName } = responseData.user;

          //save user details to local storage
          localStorage.setItem('user_type', userType);
          localStorage.setItem('email', email);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);

          // Redirect based on user role
          if (userType === 'borrower') {
            router.push('/borrower');
          } else if (userType === 'lender') {
            router.push('/lender');
          } else {
            console.error('Invalid user role:', userType);
          }
        }
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
      <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl h-[550px] mx-auto">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="font-bold text-xl">Welcome Back</h1>
          <p>We’re so excited to see you again</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[400px] mt-2"
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
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Password
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
              <p className="mt-1 text-right">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 text-base"
                >
                  Forgot Password?
                </Link>
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-[400px] rounded-xl bg-blue-500 hover:bg-blue-700"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'LOGIN'}
                </Button>
              </div>
              <p className="mt-3 text-center leading-9 tracking-wide">
                Don't have an account?
                <Link
                  href="/register"
                  className="ml-1 text-base underline text-blue-600"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
