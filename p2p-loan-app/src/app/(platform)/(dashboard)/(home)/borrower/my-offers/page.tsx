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
import { useSearchParams } from 'next/navigation';

const MyOffers = () => {

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Loan Offer Details</CardTitle>
            <CardDescription>
              Here are the details of your loan offer:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* <p>
              <strong>Wallet ID:</strong> {walletId}
            </p>
            <p>
              <strong>Amount:</strong> {amount}
            </p>
            <p>
              <strong>Payment Frequency:</strong> {paymentFrequency}
            </p>
            <p>
              <strong>Grace Period (Days):</strong> {gracePeriodDays}
            </p>
            <p>
              <strong>Loan Duration (Days):</strong> {loanDurationDays}
            </p>
            <p>
              <strong>Interest Rate (%):</strong> {interestRate}
            </p>
            <p>
              <strong>Accruing Interest Rate:</strong> {accruingInterestRate}
            </p>
            <p>
              <strong>Additional Information:</strong> {additionalInformation}
            </p> */}
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default MyOffers;
//  <div className="flex justify-center items-center">
//    <Image
//      src={'/loan-offer-animation.gif'}
//      alt="loan"
//      width={300}
//      height={10}
//    />
//  </div>;
