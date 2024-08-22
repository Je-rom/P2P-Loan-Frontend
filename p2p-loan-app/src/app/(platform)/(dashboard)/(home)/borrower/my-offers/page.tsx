'use client';
import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useLoanOffer from '@/hooks/useLoanOffer';
import { Loader2 } from 'lucide-react';

const MyOffers = () => {
  const { GetMyLoanOffer } = useLoanOffer();
  const { data, error, isLoading } = GetMyLoanOffer();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Please wait, we are getting your loan offers</h1>
        <Loader2 className="animate-spin text-blue-500" size={68} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center text-red-500">
        <p>Failed to load loan offers: {error.message}</p>
      </div>
    );
  }

  if (!data?.result.items.length) {
    return (
      <div className="flex flex-col items-center text-center space-y-4">
        <Image
          src={'/no-results-found.png'}
          alt="No loan offers found"
          width={350}
          height={300}
        />
        <p className="text-xl font-semibold text-gray-700">
          No loan offers found
        </p>
        <p className="text-lg text-gray-500">
          Go to your dashboard to start creating offers and manage your loans.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 font-bold text-xl">
        <h1>Your Loan Offers</h1>
      </div>
      <div className="flex flex-col items-start gap-6 p-6 bg-gray-100">
        {data?.result.items.map((offer) => (
          <Card
            key={offer.id}
            className="w-full bg-blue-50 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="border-gray-200 p-4">
              <CardTitle className="text-xl font-semibold text-gray-700">
                Loan Offer Details
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Detailed information about your loan offer
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm text-gray-600">
                <strong>Amount:</strong> {offer.amount}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Repayment Frequency:</strong> {offer.repaymentFrequency}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Grace Period:</strong> {offer.gracePeriodDays} days
              </div>
              <div className="text-sm text-gray-600">
                <strong>Loan Duration:</strong> {offer.loanDurationDays} days
              </div>
              <div className="text-sm text-gray-600">
                <strong>Interest Rate:</strong> {offer.interestRate}%
              </div>
              <div className="text-sm text-gray-600">
                <strong>Accruing Interest Rate:</strong>{' '}
                {offer.accruingInterestRate}%
              </div>
            </CardContent>
            <CardFooter className="border-gray-200 p-4 text-right"></CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-20">
        <p>Total Offers: {data?.result.totalItems}</p>
      </div>
    </>
  );
};

export default MyOffers;
