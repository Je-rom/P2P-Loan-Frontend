'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BorrowerRepaymentTable from '@/components/borrower-components/borrower-repayment-table';

const LoanDetails = () => {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.back()}>
        <div className="flex items-center">
          <MoveLeft />
          <h1 className="ml-4 font-bold">Back</h1>
        </div>
      </button>
      <div className="mt-10">
        <h1 className="text-2xl">Loan Details</h1>
        <div className="flex justify-center sm:justify-start mb-4">
          <Card className="w-full max-w-[650px] shadow-lg bg-gray-100 mx-4 sm:mx-0 mt-2">
            <CardHeader>
              <CardTitle className="flex items-center"></CardTitle>
              <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>
                  <span className="font-bold">Loan Amount: </span>$
                </p>
                <p>
                  <span className="font-bold">Interest Rate: </span>
                </p>
                <p>
                  <span className="font-bold">Frequency of Repayment: </span>
                </p>
                <p>
                  <span className="font-bold">Loan Duration: </span>
                </p>
                <p>
                  <span className="font-bold">Accruing Interest rate:</span>
                </p>
                <p>
                  <span className="font-bold">Grace Period Days:</span>
                </p>
                <p>
                  <span className="font-bold">Additional Information:</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl">Loan Repayments</h1>
          <BorrowerRepaymentTable />
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
