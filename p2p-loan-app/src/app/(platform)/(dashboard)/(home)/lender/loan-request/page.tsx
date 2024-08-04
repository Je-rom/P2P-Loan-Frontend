'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Filter from '@/components/ui/filter';

interface LenderOfferCardProps {
  lenderName: string;
  loanAmount: number;
  repaymentOptions: string;
  interestRate: number;
  showButtons: boolean;
  userName?: string;
}

const LenderOfferCard: React.FC<LenderOfferCardProps> = ({
  lenderName,
  loanAmount,
  repaymentOptions,
  interestRate,
  showButtons,
  userName,
}) => {
  return (
    <div className="flex justify-center sm:justify-start mb-4">
      <Card className="w-full max-w-[1250px] shadow-lg bg-gray-100 mx-4 sm:mx-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="ml-4">{userName || lenderName}</span>
          </CardTitle>
          <CardDescription>Loan Request</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>
              <span className="font-bold">Loan Amount: </span>Up to $
              {loanAmount}
            </p>
            <p>
              <span className="font-bold">Interest Rate: </span>
              {interestRate} %
            </p>
            <p>
              <span className="font-bold">Frequency of Repayment: </span>
              {repaymentOptions}
            </p>
          </div>
        </CardContent>
        {showButtons && (
          <CardFooter className="justify-end gap-8">
            <Button className="w-[140px] bg-green-600 hover:bg-green-700">
              Accept
            </Button>
            <Button className="w-[140px] bg-red-600 hover:bg-red-700">
              Reject
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const LendersBorrowersOffer: React.FC = () => {
  const [view, setView] = useState<'received' | 'sent'>('received');
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  const offers = [
    {
      lenderName: 'Lesane Crooks',
      loanAmount: 50000,
      repaymentOptions: 'Monthly',
      interestRate: 5,
    },
    {
      lenderName: 'John Doe',
      loanAmount: 30000,
      repaymentOptions: 'Quarterly',
      interestRate: 4.5,
    },
    {
      lenderName: 'Jane Smith',
      loanAmount: 25000,
      repaymentOptions: 'Monthly',
      interestRate: 6,
    },
    {
      lenderName: 'Alice Johnson',
      loanAmount: 45000,
      repaymentOptions: 'Annually',
      interestRate: 7,
    },
    {
      lenderName: 'Bob Brown',
      loanAmount: 35000,
      repaymentOptions: 'Monthly',
      interestRate: 5.5,
    },
    {
      lenderName: 'Eve Davis',
      loanAmount: 40000,
      repaymentOptions: 'Semi-Annually',
      interestRate: 4.8,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <h1
            className={`text-lg cursor-pointer ${view === 'received' ? 'text-blue-500' : ''}`}
            onClick={() => setView('received')}
          >
            Received
          </h1>
          <h1
            className={`text-lg cursor-pointer ${view === 'sent' ? 'text-blue-500' : ''}`}
            onClick={() => setView('sent')}
          >
            Sent
          </h1>
        </div>
        <Filter />
      </div>
      <div className="mt-10 space-y-4">
        {offers.map((offer, index) => (
          <LenderOfferCard
            key={index}
            lenderName={offer.lenderName}
            loanAmount={offer.loanAmount}
            repaymentOptions={offer.repaymentOptions}
            interestRate={offer.interestRate}
            showButtons={view === 'received'}
            userName={view === 'sent' ? userName : undefined}
          />
        ))}
      </div>
    </>
  );
};

export default LendersBorrowersOffer;
