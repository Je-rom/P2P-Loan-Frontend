"use client";
import React, { useState } from "react";
import { useFormStore } from "@/context/FormContext";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const BasicInfo: React.FC = () => {
  const { formData, nextStep, updateFormData } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const registerSchema = z
    .object({
      firstName: z.string({ message: "Please input your first name" }),
      middleName: z.string().optional(),
      lastName: z.string({ message: "Please input your last name" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    });

  type RegisterFormValues = z.infer<typeof registerSchema>;
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    // Handle form submission here
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        ...data,
      },
    });
    nextStep();
  };

  return (
    <div
      className="">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isLoading}
                          placeholder="First Name"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
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
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isLoading}
                          placeholder="Middle Name"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
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
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isLoading}
                          placeholder="Last Name"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
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
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isLoading}
                          placeholder="Email Address"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
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
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          placeholder="Password"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
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
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          placeholder="Confirm Password"
                          {...field}
                          className="py-2 px-4 rounded-lg border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
