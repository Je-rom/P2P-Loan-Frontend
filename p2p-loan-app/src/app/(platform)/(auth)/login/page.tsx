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

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Handle form submission here
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
        <div className="bg-white p-6 rounded-xl w-[800px] h-[440px] mx-auto">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-bold text-xl">Welcome Back</h1>
            <p>We’re so excited to see you again</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[400px]">
                <div className="py-2">
                  <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
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
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
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
                            <FormMessage/>
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
                    {isLoading ? <Loader2 className="animate-spin"/> : 'Login'}
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
