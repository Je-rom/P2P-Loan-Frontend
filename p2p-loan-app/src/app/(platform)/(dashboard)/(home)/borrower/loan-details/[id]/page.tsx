'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, MoveLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
                    <span>Status: </span>{' '}
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

          <div className="flex-1 min-w-[300px] max-w-[650px]">
            <h1 className="text-sm">Manage Your Repayments</h1>
            <Card className="w-full h-[220px] shadow-xl bg-white mt-2 p-1 rounded-xl">
              <CardContent>
                <div className="">
                  <p className="text-gray-600 text-xs">
                    Make early repayments, review missed payments, and track
                    upcoming payments.
                  </p>

                  <div className="mt-3">
                    <h2 className="font-bold text-xs text-blue-600 flex items-center">
                      Upcoming Repayments
                    </h2>
                    <ul className="list-none pl-0 text-xs text-gray-700 space-y-1 mt-1">
                      <li className="flex items-center">
                        <svg
                          className="w-3 h-3 text-green-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m-6 6a9 9 0 110-18 9 9 0 010 18z"
                          />
                        </svg>
                        Payment of $700 due on Oct 1, 2024
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-3 h-3 text-green-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m-6 6a9 9 0 110-18 9 9 0 010 18z"
                          />
                        </svg>
                        Payment of $750 due on Nov 1, 2024
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h2 className="font-bold text-xs text-red-600 flex items-center">
                      Defaulted Repayments
                    </h2>
                    <ul className="list-none pl-0 text-xs text-red-600 space-y-1 mt-1">
                      <li className="flex items-center">
                        <svg
                          className="w-3 h-3 text-red-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636l-6.728 6.728m0 0l-6.728-6.728m6.728 6.728l6.728 6.728"
                          />
                        </svg>
                        Payment of $600 missed on Aug 1, 2024
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-3 h-3 text-red-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636l-6.728 6.728m0 0l-6.728-6.728m6.728 6.728l6.728 6.728"
                          />
                        </svg>
                        Payment of $650 missed on Sep 1, 2024
                      </li>
                    </ul>
                  </div>

                  <div className="text-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-18 h-8 text-xs mt-2">
                          Repay Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] text-xs">
                        <DialogHeader>
                          <DialogTitle className="text-xs">
                            Repay Loan
                          </DialogTitle>
                          <DialogDescription className="text-xs">
                            Enter the amount you would like to repay for the
                            loan.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                          <Label className="text-start text-xs sm:text-xs">
                            Amount
                          </Label>
                          <div className="relative sm:col-span-3 w-full">
                            <Input
                              id="amount"
                              type="number"
                              className="border-black"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                          <Label className="text-start text-xs sm:text-xs">
                            Enter your pin
                          </Label>
                          <div className="relative sm:col-span-3 w-full">
                            <Input
                              id="pin"
                              type="text"
                              className="text-xs border-black"
                              pattern="\d*"
                              maxLength={4}
                              value={pin}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  setPin(value);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            disabled={
                              !isPinValid || !isAmountValid || isLoading2
                            }
                            className="w-28 h-8 text-xs"
                            onClick={onSubmit}
                          >
                            {isLoading2 ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              'Pay'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
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
                  <TableHead>Amount Left</TableHead>
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
                    <TableCell>₦{loanRepayment.loan.amountLeft}</TableCell>
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
