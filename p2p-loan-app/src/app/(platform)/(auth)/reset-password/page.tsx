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

const ResetPasswordPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const ResetPasswordSchema = z.object({
        password: z
            .string()
            .min(8, { message: 'Your new password must be at least 8 characters' }),
        confirmPassword: z
            .string()
            .min(1, { message: 'Confirm Password is required' }),
    })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: "Passwords don't match",
        });


    type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setIsLoading(true);
        triggerConfetti();

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
            <div className="bg-white p-6 rounded-xl w-[800px] h-[450px] flex flex-col items-center justify-center">
                <div className="w-full max-w-md text-center">
                    <h1 className="font-bold text-2xl mt-4">Set a new password</h1>
                    <p className="mt-2">
                        Your previous password has been reseted. Please set a new password for your account.
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
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-light">
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

                        <div className="py-2">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-light">
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
                                        <FormMessage/>
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
                                {isLoading ? <Loader2 className="animate-spin"/> : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;