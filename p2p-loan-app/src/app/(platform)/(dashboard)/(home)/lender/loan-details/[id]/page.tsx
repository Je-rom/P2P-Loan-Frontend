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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const LoanDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { useGetALoanQuery, RepayLoanMutation, useGetLoanRepaymentsQuery } =
    useLoan();
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const [loanId, setLoanId] = useState<string | null>(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [pageSize] = useState(10);
  const repayLoan = RepayLoanMutation();

  const { data: loanData, isLoading, isError } = useGetALoanQuery(loanId || '');

  const {
    data: repaymentData,
    isLoading: repaymentLoan,
    isError: repaymentError,
    error,
  } = useGetLoanRepaymentsQuery(loanId || '', totalItems, pageNumber, pageSize);
  console.log('Repayment Data:', repaymentData);
  useEffect(() => {
    if (id) {
      setLoanId(id as string);
    }
  }, [id]);

  const isPinValid = pin.length === 4 && /^\d+$/.test(pin);
  const isAmountValid = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
  const isLoading2 = repayLoan.isPending;

  const onSubmit = async () => {
    if (loanId && isPinValid && isAmountValid) {
      repayLoan.mutate({
        loanId,
        PIN: pin,
        amount: parseFloat(amount),
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!loanData) {
    return <div>No loan data available</div>;
  }

  const loanRepayments = repaymentData?.result?.items || [];
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setpageNumber(newPage);
    }
  };

  console.log(repaymentData);

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
                  <p>
                    <span>Status:</span>{' '}
                    <span
                      className={`inline-block px-2 text-xs font-semibold rounded-full ${
                        loanData.result.status === 'Active'
                          ? 'bg-green-600 text-white'
                          : loanData.result.status === 'Completed'
                            ? 'bg-transparent text-black'
                            : 'bg-red-600 text-white'
                      }`}
                    >
                      {loanData.result.status}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-base">Repayment history</h1>
          <div className="overflow-auto max-h-[400px] mt-5 scrollbar-hide">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  {/* <TableHead>Amount Left</TableHead> */}
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanRepayments?.map((loanRepayment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {dayjs(loanRepayment.loan.dueDate).format('MMMM D, YYYY')}
                    </TableCell>
                    <TableCell>₦{loanRepayment.amount}</TableCell>
                    {/* <TableCell>₦{loanRepayment.loan.amountLeft}</TableCell> */}
                    <TableCell>{loanRepayment.interestRate}%</TableCell>
                    <TableCell>{loanRepayment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {pageNumber > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className="text-xs"
                    onClick={() => handlePageChange(pageNumber - 1)}
                  />
                </PaginationItem>
              )}
              {(() => {
                let startPage = Math.max(1, pageNumber - 1);
                let endPage = Math.min(totalPages, pageNumber + 1);

                if (pageNumber === 1) {
                  endPage = Math.min(3, totalPages);
                } else if (pageNumber === totalPages) {
                  startPage = Math.max(totalPages - 2, 1);
                }
                const pages = [];
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        className="text-xs"
                        isActive={i === pageNumber}
                        onClick={() => handlePageChange(i)}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>,
                  );
                }
                return pages;
              })()}
              {pageNumber < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageNumber + 1 < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    className="text-xs"
                    isActive={pageNumber === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              {pageNumber < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    className="text-xs"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
