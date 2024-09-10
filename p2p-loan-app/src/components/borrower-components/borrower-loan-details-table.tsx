'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EllipsisVertical, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const invoices = [
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: true,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: false,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: true,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: false,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: true,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: false,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: true,
    date: '12 -12-1999',
  },
  {
    name: 'john doe',
    amount: 250,
    repaymentFrequency: 'Monthly',
    gracePeriodDays: 30,
    loanDurationDays: 365,
    accruingInterestRate: 5.5,
    interestRate: 3.0,
    active: false,
    date: '12 -12-1999',
  },
];

const BorrowerLoanDetailsTable = () => {
  const router = useRouter();
  return (
    <>
      <Table className="min-w-full bg-white shadow-md rounded-lg mt-4 text-xs">
        <TableHeader className="bg-gray-200 text-gray-700">
          <TableRow className="w-[100px] ">
            <TableHead className="py-2 px-2 text-left">Lender Name</TableHead>
            <TableHead className="py-2 px-2 text-left">
              Loan Amount
            </TableHead>
            <TableHead className="py-4 px-6 text-left">Interest Rate</TableHead>
            <TableHead className="py-4 px-6 text-left">
              Repayment Frequency
            </TableHead>
            <TableHead className="py-4 px-6 text-left">
              Grace Period (Days)
            </TableHead>
            <TableHead className="py-4 px-6 text-left">
              Loan Duration (Days)
            </TableHead>
            <TableHead className="py-4 px-6 text-left">
              Accruing Interest Rate
            </TableHead>
            <TableHead className="text-right py-4 px-6">Active</TableHead>
            <TableHead className="text-right w-[50px] py-4 px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.amount}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <TableCell className="py-4 px-6 font-medium text-gray-900">
                {invoice.name}
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-900">
                ${invoice.amount}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {invoice.interestRate}%
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {invoice.repaymentFrequency}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {invoice.gracePeriodDays}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {invoice.loanDurationDays}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {invoice.accruingInterestRate}%
              </TableCell>

              <TableCell className="text-right py-4 px-6">
                <span
                  className={`inline-block px-2  text-xs font-semibold rounded-full ${
                    invoice.active
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {invoice.active ? 'Yes' : 'No'}
                </span>
              </TableCell>
              <TableCell className="text-right py-4 px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push('/borrower/loan-details')}
                    >
                      View details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BorrowerLoanDetailsTable;
