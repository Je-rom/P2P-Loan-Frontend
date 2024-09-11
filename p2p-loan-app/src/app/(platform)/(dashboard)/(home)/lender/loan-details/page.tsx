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
          <MoveLeft className="w-3" />
          <h1 className="ml-1 font-bold text-xs">Back</h1>
        </div>
      </button>
      <div className="mt-10">
        <h1 className="text-xs">Loan Details</h1>
        <div className="flex justify-center sm:justify-start mb-4">
          <Card className="w-full shadow-lg bg-blue-100 mt-2 text-xs">
            <CardContent>
              <div className="mt-4 text-xs">
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
                  <span>
                    Additional Information: CommonJS is a module system used in
                    JavaScript to structure and organize code. It allows
                    developers to break their code into smaller, reusable
                    modules, making it easier to manage and maintain, especially
                    in large projects. A module in CommonJS is simply a
                    JavaScript file.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <h1 className="text-base">Loan Repayments</h1>
          <BorrowerRepaymentTable />
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
