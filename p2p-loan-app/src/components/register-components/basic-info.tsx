"use client";
import React, { useContext, useState } from "react";
import { FormContext } from "./../../context/FormContext";
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
  const { formData, nextStep, updateFormData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const registerSchema = z
    .object({
      firstName: z.string({ message: "Please Input your first name" }),
      middleName: z.string({ message: "Please Input your middle name" }),
      lastName: z.string({ message: "Please Input your last name" }),
      email: z.string().trim().email({
        message: "Invalid email",
      }),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters",
      }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    });

  type RegisterFormValues = z.infer<typeof registerSchema>;
  const form = useForm<z.infer<typeof registerSchema>>({
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
  };

  return (
    <div className="md:px-28 py-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        disabled={isLoading}
                        placeholder="Email Address"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
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
                    <div className="relative">
                      <Input
                        type="text"
                        disabled={isLoading}
                        placeholder="Email Address"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
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
                    <div className="relative">
                      <Input
                        type="text"
                        disabled={isLoading}
                        placeholder="Email Address"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
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
                    <div className="relative">
                      <Input
                        type="text"
                        disabled={isLoading}
                        placeholder="Email Address"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
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
                    <div className="relative">
                      <Input
                        type="password"
                        disabled={isLoading}
                        placeholder="Password"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
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
                    <div className="relative">
                      <Input
                        type="password"
                        disabled={isLoading}
                        placeholder="Confirm Password"
                        {...field}
                        className="pl-14 py-7 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInfo;
