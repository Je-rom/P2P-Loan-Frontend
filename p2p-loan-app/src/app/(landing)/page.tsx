'use client';
import React, { useState } from 'react';
import { z } from 'zod';
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
import VerifyEmail from '@/components/register-components/verify-email';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const LoginSchema = z.object({
    name: z.string().min(3, {
      message: 'Name must be at least 3 characters',
    }),
    email: z.string().email({
      message: 'Invalid email address',
    }),
    phoneNumber: z.string().min(11, {
      message: 'Phone number must be at least 11 characters',
    }),
    message: z.string().min(16, {
      message: 'Please fill in your request',
    }),
  });

  return (
    <div className="background">
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/reg-background.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <footer className="bg-blue-600  text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            <a href="/privacy-policy" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
            {' | '}
            <a
              href="/terms-of-service"
              className="text-blue-400 hover:underline"
            >
              Terms of Service
            </a>
            {' | '}
            <a href="/contact-us" className="text-blue-400 hover:underline">
              Contact Us
            </a>
          </p>
          <p>© {new Date().getFullYear()} PeerLend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
