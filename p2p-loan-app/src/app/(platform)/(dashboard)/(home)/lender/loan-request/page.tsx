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
import useLoanRequest from '@/hooks/useLoanRequest';
import Image from 'next/image';

interface LenderOfferCardProps {
  lenderName: string;
  loanAmount: number;
  repaymentOptions: string;
  interestRate: number;
  showButtons: boolean;
  status: string;
  gracePeriod: number;
  loanDuration: number;
  accruingInterestRate: number;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-amber-500';
    case 'accepted':
      return 'text-green-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const LenderOfferCard: React.FC<LenderOfferCardProps> = ({
  lenderName,
  loanAmount,
  repaymentOptions,
  interestRate,
  showButtons,
  status,
  gracePeriod,
  loanDuration,
  accruingInterestRate,
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
            <span className="ml-4">{lenderName}</span>
          </CardTitle>
          <CardDescription>Loan request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-bold">Loan Amount: </span>₦{loanAmount}
            </p>
            <p>
              <span className="font-bold">Interest Rate: </span>
              {interestRate} %
            </p>
            <p>
              <span className="font-bold">Frequency of Repayment: </span>
              {repaymentOptions}
            </p>

            <p>
              <span className="font-bold">Loan Duration: </span>
              {loanDuration} days
            </p>
            <p>
              <span className="font-bold">Accruing Interest Rate: </span>
              {accruingInterestRate} %
            </p>
            <p>
              <span className="font-bold">Grace period: </span>
              {gracePeriod} days
            </p>
            <p>
              <span className="font-bold">Status: </span>
              <span className={getStatusColor(status)}>{status}</span>
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
  const { GetLoanRequest } = useLoanRequest();
  const [pageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: loanRequests,
    error,
    isLoading,
  } = GetLoanRequest(view, pageNumber, pageSize);

  const totalItems = loanRequests?.result.totalItems || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (error) {
    return <div>Error loading loan requests.</div>;
  }

  return (
    <>
      <h1 className="font-bold text-xl">Your Loan Requests</h1>
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

      {view === 'received' && !loanRequests?.result.items.length && (
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={'/no-results-found.png'}
            alt="No loan requests received"
            width={350}
            height={300}
          />
          <p className="text-xl font-semibold text-gray-700">
            You haven't received any loan requests yet
          </p>
          <p className="text-lg text-gray-500">It's coming 😊.</p>
        </div>
      )}

      {view === 'sent' && !loanRequests?.result.items.length && (
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={'/no-results-found.png'}
            alt="No loan requests sent"
            width={350}
            height={300}
          />
          <p className="text-xl font-semibold text-gray-700">
            You haven't sent any loan requests yet
          </p>
        </div>
      )}

      {view === 'sent' && isLoading && (
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={'/no-results-found.png'}
            alt="No loan requests sent"
            width={350}
            height={300}
          />
          <p className="text-xl font-semibold text-gray-700">
            Loading your loan requests..
          </p>
        </div>
      )}

      <div className="mt-10 space-y-4">
        {loanRequests?.result.items.slice(0, pageSize).map((offer, index) => {
          const displayName =
            view === 'received'
              ? `${offer.user.firstName} ${offer.user.lastName}`
              : `${offer.loanOffer.user.firstName} ${offer.loanOffer.user.lastName}`;

          return (
            <LenderOfferCard
              key={index}
              lenderName={displayName}
              loanAmount={offer.loanOffer.amount}
              repaymentOptions={offer.loanOffer.repaymentFrequency}
              interestRate={offer.loanOffer.interestRate}
              showButtons={view === 'received'}
              loanDuration={offer.loanOffer.loanDurationDays}
              gracePeriod={offer.loanOffer.gracePeriodDays}
              accruingInterestRate={offer.loanOffer.accruingInterestRate}
              status={offer.status}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            className="h-8 bg-blue-600 hover:bg-blue-600"
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {pageNumber} of {totalPages}
          </span>
          <Button
            disabled={pageNumber === totalPages}
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            }
            className="h-8 bg-blue-600 hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default LendersBorrowersOffer;
