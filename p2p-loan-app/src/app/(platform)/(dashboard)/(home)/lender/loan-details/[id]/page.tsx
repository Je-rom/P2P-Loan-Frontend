'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, MoveLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import useLoan from '@/hooks/useLoan';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LoanDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { useGetALoanQuery, useGetLoanRepaymentsQuery } = useLoan();
  const [loanId, setLoanId] = useState<string | null>(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize] = useState(10);

  const { data: loanData, isLoading, isError } = useGetALoanQuery(loanId || '');

  const {
    data: repaymentData,
    isLoading: repaymentLoan,
    isError: repaymentError,
    error,
  } = useGetLoanRepaymentsQuery(loanId || '', totalItems, pageSize, pageNumber);

  useEffect(() => {
    if (id) {
      setLoanId(id as string);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!loanData) {
    return <div>No loan data available</div>;
  }

  const loanRepayments = repaymentData?.result.items || [];

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
            <h1 className="text-sm">Loan Details</h1>
            <Card className="w-full h-[220px] shadow-lg bg-blue-100 mt-2 text-xs rounded-lg">
              <CardContent>
                <div className="mt-2 space-y-2">
                  <p>
                    <span>Loan Amount: </span>₦
                    <strong>{loanData.result.principalAmount}</strong>
                  </p>
                  <p>
                    <span>Amount to pay: </span>₦
                    <strong>{loanData.result.amountLeft}</strong>
                  </p>
                  <p>
                    <span>Interest Rate: </span>
                    <strong>{loanData.result.currentInterestRate}%</strong>
                  </p>
                  <p>
                    <span>Frequency of Repayment: </span>
                    <strong className="capitalize">
                      {loanData.result.repaymentFrequency}
                    </strong>
                  </p>
                  <p>
                    <span>Loan Duration: </span>
                    <strong>{loanData.result.loanDurationDays} days</strong>
                  </p>
                  <p>
                    <span>Accruing Interest rate:</span>
                    <strong>{loanData.result.accruingInterestRate}%</strong>
                  </p>
                  <p>
                    <span>Due Date:</span>
                    <strong>
                      {dayjs(loanData.result.dueDate).format('MMMM D, YYYY')}
                    </strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-base">Repayment history</h1>
        <div className="overflow-auto max-h-[400px] mt-5 scrollbar-hide">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanRepayments?.map((loanRepayment, index) => (
                <TableRow key={index}>
                  <TableCell>{loanRepayment.loan.dueDate}</TableCell>
                  <TableCell>₦{loanRepayment.amount}</TableCell>
                  <TableCell>{loanRepayment.interestRate}</TableCell>
                  <TableCell>{loanRepayment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
