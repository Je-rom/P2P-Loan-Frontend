'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import VerifyEmail from '@/components/register-components/verify-email';
import Image from 'next/image';

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
    <div className="background bg-transparent bg-gradient-to-r from-white to-blue-300">
      <div className="pt-10 mt-20">
        <div className="flex justify-between">
          <div className="">
            <h1 className="font-bold text-4xl">
              Empower Your Financial Future
            </h1>
            <p className="text-center text-gray-600">
              PeerLend is Link peer-to-peer lending platform that allows you to
              borrow money from other people.
            </p>
          </div>
          <Image
            src={'/hand_image.svg'}
            alt="hand image"
            width={400}
            height={10}
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="pt-10 mt-20">
          <div className="flex justify-between">
            <Image
              src={'/couple_image.svg'}
              alt="indoor-candid-shot-young-african-american-couple-doing-paperwork-together"
              width={600}
              height={100}
            />

            <div className="w-1/2">
              <h1 className="font-bold text-2xl">Why Choose Us</h1>
              <section className="p-6 bg-gray-100">
                <ul className="list-disc list-inside pl-6">
                  <li>
                    Simplified Access to Credit: Borrowers can quickly and
                    easily obtain loans with competitive interest rates,
                    tailored to their needs.
                  </li>
                  <li>
                    Profitable Investment Opportunities: Lenders gain access to
                    a wide range of vetted lending options, allowing them to
                    diversify their investments.
                  </li>
                  <li>
                    Enhanced User Engagement: The app's intuitive interface and
                    personalized recommendations empower users to take control
                    of their finances.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// test the height on different devices to see if it breaks
