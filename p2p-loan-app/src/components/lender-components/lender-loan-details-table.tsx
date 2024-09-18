'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MoreHorizontal } from 'lucide-react';
import useLoan from '@/hooks/useLoan';
import dayjs from 'dayjs';

const LenderLoanDetailsTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize] = useState(5);

  const { useMyLoans } = useLoan();
  const { data, isLoading, isError, error } = useMyLoans(
    currentPage,
    pageSize,
    totalItems,
  );

  // Update the total items when data changes
  useEffect(() => {
    if (data?.result.totalItems) {
      setTotalItems(data.result.totalItems);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const loans = data?.result.items || [];

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Table className="min-w-full bg-white shadow-md rounded-lg mt-4 text-xs">
        <TableHeader className="bg-gray-200 text-gray-700">
          <TableRow className="w-[100px]">
            <TableHead className="py-2 px-2 text-left">Borrower Name</TableHead>
            <TableHead className="py-4 px-6 text-left">Interest Rate</TableHead>
            <TableHead className="py-4 px-6 text-left">
              Principal Amount
            </TableHead>
            <TableHead className="py-4 px-6 text-left">Amount to pay</TableHead>
            <TableHead className="py-4 px-6 text-left">
              Repayment Frequency
            </TableHead>
            <TableHead className="py-4 px-6 text-left">Due Date</TableHead>
            <TableHead className="py-4 px-6 text-left">
              Loan Duration (Days)
            </TableHead>
            <TableHead className="py-4 px-6 text-left">
              Accruing Interest Rate
            </TableHead>
            <TableHead className="py-4 px-6 text-left">
              Current Interest Rate
            </TableHead>
            <TableHead className="text-right py-4 px-6">Active</TableHead>
            <TableHead className="text-right w-[50px] py-4 px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan, index) => (
            <TableRow
              key={index}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <TableCell className="py-4 px-6 font-medium text-gray-900 capitalize">
                {loan.borrower.firstName} {loan.borrower.lastName}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {loan.currentInterestRate}%
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-900">
                ₦{loan.principalAmount}
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-900">
                ₦{loan.amountLeft}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700 capitalize">
                {loan.repaymentFrequency}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {dayjs(loan.dueDate).format('MMMM D, YYYY')}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {loan.loanDurationDays}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {loan.accruingInterestRate}%
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {loan.currentInterestRate}%
              </TableCell>

              <TableCell className="text-right py-4 px-6">
                <span
                  className={`inline-block px-2 text-xs font-semibold rounded-full ${
                    loan.status
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {loan.status ? 'Yes' : 'No'}
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
                    <DropdownMenuLabel className="text-xs">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push('/lender/loan-details')}
                      className="text-xs"
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

      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className="text-xs"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {(() => {
              let startPage = Math.max(1, currentPage - 1);
              let endPage = Math.min(totalPages, currentPage + 1);

              if (currentPage === 1) {
                endPage = Math.min(3, totalPages);
              } else if (currentPage === totalPages) {
                startPage = Math.max(totalPages - 2, 1);
              }
              const pages = [];
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      className="text-xs"
                      isActive={i === currentPage}
                      onClick={() => handlePageChange(i)}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>,
                );
              }
              return pages;
            })()}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage + 1 < totalPages && (
              <PaginationItem>
                <PaginationLink
                  className="text-xs"
                  isActive={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  className="text-xs"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default LenderLoanDetailsTable;
