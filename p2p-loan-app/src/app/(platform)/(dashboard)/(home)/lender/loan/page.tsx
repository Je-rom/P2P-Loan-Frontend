'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LenderLoanDetailsTable from '@/components/lender-components/lender-loan-details-table';

const ActiveLoan = () => {
  const [fullName, setFullName] = useState('');
  const router = useRouter();

  const cards = [
    {
      img: (
        <Image
          src={'/active-loans.svg'}
          alt="active-loans"
          width={50}
          height={20}
        />
      ),
      amount: 529.0,
      text: 'Active Loans',
    },
  ];
  // useEffect(() => {
  //   const firstName = localStorage.getItem('firstName');
  //   const lastName = localStorage.getItem('lastName');
  //   if (firstName && lastName) {
  //     setFullName(`${firstName} ${lastName}`);
  //   }
  // }, []);
  return (
    <div>
      <h1 className="text-2xl">Your Loans</h1>
      <div className="flex flex-wrap gap-4 p-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-full md:w-[350px] shadow-xl">
            <CardHeader></CardHeader>
            <CardContent>
              <div className="flex gap-5">
                <div className="items-center">{card.img}</div>
                <div>
                  <h1 className="font-bold text-2xl">{card.text}</h1>
                  <h1 className="font-bold text-lg">{card.amount}</h1>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <LenderLoanDetailsTable />
    </div>
  );
};

export default ActiveLoan;
