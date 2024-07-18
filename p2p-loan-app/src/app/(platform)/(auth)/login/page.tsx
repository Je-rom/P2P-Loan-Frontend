"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginSchema = z.object({
  username: z.string().email({
    message: "Invalid username or email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col px-6 md:px-0">
        <section className="relative flex flex-1 justify-between md:w-full">
          <div className="absolute inset-0 w-full h-full hidden md:flex items-center justify-center">
            <div className="w-full h-full relative">
              <Image
                src={"/signupbg.png"}
                alt="signup"
                width={900}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute left-1 transform -translate-y-1/2 mt-96 ml-16">
              <Image src="/splash.webp" alt="Logo" width={650} height={700} />
            </div>
          </div>
          <div className="relative bg-white md:w-[54%] md:rounded-md w-full flex flex-col justify-center ml-auto">
            <h2 className="mt-16 text-center text-3xl md:text-4xl font-bold leading-9 tracking-tight text-purple-950">
              Sign In
            </h2>
            <p className="mt-1 text-center text-1xl leading-10 tracking-wide text-gray-900">
              Welcome Back
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
