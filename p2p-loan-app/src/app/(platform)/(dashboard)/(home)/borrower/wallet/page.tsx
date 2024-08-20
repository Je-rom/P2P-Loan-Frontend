'use client';
import React from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Wallet = () => {
  const router = useRouter();
  return (
    <>
      {/* <div>
        <h1 className="font-bold text-2xl">Your Wallet</h1>
        <div>
          <Card className="w-[650px] h-[195px] bg-blue-50 mt-10 rounded-3xl">
            <div className="flex justify-end items-end border border-red-600">
              <Image
                src="/walletElip.svg"
                alt=""
                width={250}
                height={80}
                className=""
              />
            </div>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <Image
                    src="/monnify.png"
                    alt=""
                    width={90}
                    height={80}
                    className="mr-2 rounded-full"
                  />
                  <span className="text-lg">Monnify Account</span>
                </div>
                <div className="flex justify-center md:justify-end"></div>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-start">
              <h1 className="mb-2">Available Balance</h1>
              <p className="font-bold text-2xl">₦ 0.00</p>
            </CardFooter>
          </Card>
        </div>
      </div> */}
      <div>
        <Card className="w-[650px] h-[195px] bg-blue-50 mt-10 rounded-3xl relative">
          <div className="flex justify-end items-end relative z-0">
            <Image
              src="/walletElip.svg"
              alt=""
              width={250}
              height={80}
              className="absolute bottom-0 right-0"
            />
          </div>
          <CardHeader className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <Image
                  src="/monnify.png"
                  alt=""
                  width={90}
                  height={80}
                  className="mr-2 rounded-full"
                />
                <span className="text-lg">Monnify Account</span>
              </div>
              <div className="flex justify-center md:justify-end"></div>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col items-start">
            <h1 className="mb-2">Available Balance</h1>
            <p className="font-bold text-2xl">₦ 0.00</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Wallet;
