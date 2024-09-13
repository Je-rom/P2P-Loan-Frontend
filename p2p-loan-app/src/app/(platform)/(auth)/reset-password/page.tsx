'use client';
import React, { Suspense, useEffect, useState } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const token = searchParams?.get('token');
  const email = searchParams?.get('email');

  const { resetPasswordMutation } = useAuth();

  const ResetPasswordSchema = z
    .object({
      newPassword: z
        .string()
        .min(8, { message: 'Your new password must be at least 8 characters' }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm Password is required' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmPassword'],
      message: "Passwords don't match",
    });

  type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const isLoading = resetPasswordMutation.isPending;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token || !email) {
      toast.error('Invalid or missing token and email.');
      return;
    }
    resetPasswordMutation.mutateAsync(
      {
        token,
        email,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
      },
    );
  };

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/reg-background.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white p-6 rounded-xl w-[700px] h-[400px] flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center">
            <h1 className="font-bold text-base mt-4">Set a new password</h1>
            <p className="mt-2 text-xs">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md mt-3"
            >
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="newPassword"
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

              <div className="py-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Re-enter Password
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
    </Suspense>
  );
};

export default ResetPasswordPage;
