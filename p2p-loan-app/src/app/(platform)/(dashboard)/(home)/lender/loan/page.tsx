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
          width={25}
          height={20}
        />
      ),
      amount: <span style={{ fontSize: '15px' }}>529.0</span>,
      text: <span style={{ fontSize: '15px' }}>Active Loans</span>,
    },
  ];
  return (
    <div>
      <h1 className="text-base font-bold">Your Loans</h1>
      <div className="mt-4 text-xs">
        <p>
          The table below displays the details of the loans you've issued,
          including the loan amount, interest rates, repayment frequency, and
          more. For comprehensive information on each loan, including repayment
          schedules and borrower history, click on 'View details' in the action
          menu.
        </p>
      </div>
      {/* <div className="flex flex-wrap gap-4 p-4">
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
      </div> */}
      <LenderLoanDetailsTable />
    </div>
  );
};

export default ActiveLoan;
