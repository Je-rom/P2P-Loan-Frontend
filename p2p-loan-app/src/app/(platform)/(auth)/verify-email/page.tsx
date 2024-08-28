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

const VerifyEmailPage = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null,
  );
  const router = useRouter();
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);
  const token = searchParams?.get('token');
  const email = searchParams?.get('email');
  const { verifyEmailPasswordMutation } = useAuth();

  const VerifyEmailSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address',
    }),
  });

  type VerifyEmailFormValues = z.infer<typeof VerifyEmailSchema>;
  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = verifyEmailPasswordMutation.isPending;

  const onSubmit = async (data: VerifyEmailFormValues) => {
    if (!token || !email) {
      toast.error('Invalid or missing token and email.');
      return;
    }
    verifyEmailPasswordMutation.mutateAsync(
      {
        token,
        email,
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
      },
    );
    // triggerConfetti();
  };

  return (
    <>
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/reg-background.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-white p-6 rounded-xl w-[800px] h-[450px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md text-center">
              <h1 className="font-bold text-2xl mt-4">Verify Your Account</h1>
              <p className="mt-2">
                Your email address has been successfully updated. Please verify
                your new email to secure your account
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-light">
                          Email
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
                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-[450px] rounded-xl bg-blue-500 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default VerifyEmailPage;
