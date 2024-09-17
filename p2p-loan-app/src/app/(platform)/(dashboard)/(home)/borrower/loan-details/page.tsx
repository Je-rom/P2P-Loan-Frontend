'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BorrowerRepaymentTable from '@/components/borrower-components/borrower-repayment-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
        <div className="flex flex-wrap gap-4 justify-between sm:justify-start mb-4">
          <div className="flex-1 min-w-[300px] max-w-[650px]">
            <h1 className="text-xs">Loan Details</h1>
            <Card className="w-full shadow-lg bg-blue-100 mt-2 text-xs">
              <CardContent>
                <div className="mt-4">
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 min-w-[300px] max-w-[650px]">
            <h1 className="text-xs">Manage Your Repayments</h1>
            <Card className="w-full shadow-lg bg-red-100 mt-2 text-xs h-[200px]">
              <CardContent>
                <div className="mt-4">
                  <h1>
                    Make early repayments, review missed payments, and see
                    what's coming up next.
                  </h1>
                  <h2 className="font-bold text-xs">Upcoming Repayments</h2>
                  <ul className="list-disc pl-5 text-xs text-gray-700">
                    <li>Payment of $700 due on Oct 1, 2024</li>
                    <li>Payment of $750 due on Nov 1, 2024</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h2 className="font-bold text-xs">Defaulted Repayments</h2>
                  <ul className="list-disc pl-5 text-xs text-red-600">
                    <li>Payment of $600 missed on Aug 1, 2024</li>
                    <li>Payment of $650 missed on Sep 1, 2024</li>
                  </ul>
                </div>

                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded mt-3 w-16 h-5 text-xs">
                        Repay
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-xs">
                      <DialogHeader>
                        <DialogTitle className="text-xs">
                          Repay Loan
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                          Enter the amount you would like to repay for the loan.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="amount"
                            className="text-right text-xs"
                          >
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            placeholder="Enter amount"
                            className="col-span-3 h-10"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className=" w-28 h-8 text-xs " type="submit">
                          Submit Repayment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-base">Repayment history</h1>
          <BorrowerRepaymentTable />
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
