'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useLoanOffer from '@/hooks/useLoanOffer';
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MyOffers = () => {
  const { GetMyLoanOffer } = useLoanOffer();
  const { data, error, isLoading } = GetMyLoanOffer();

  const [currentPage, setCurrentPage] = useState(2);

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
        <p>Failed to load loan offers</p>
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

  const totalItems = data.result.totalItems;
  const currentPagef = data.result.pageNumber;
  const itemsPerPage = data.result.pageSize;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-10 font-bold text-xl">
        <h1 className="font-bold text-xl">Your Loan Offers</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-y-auto overflow-hidden">
          <TableHeader className="bg-white border">
            <TableRow className="bg-blue-100">
              <TableHead className="font-bold text-black-900">
                Loan Name
              </TableHead>
              <TableHead className="font-bold text-black-900">
                Loan Amount
              </TableHead>
              <TableHead className="font-bold text-black-900">
                Interest Rate
              </TableHead>
              <TableHead className="font-bold text-black-900">
                Loan Duration
              </TableHead>
              <TableHead className="font-bold text-black-900">
                Repayment Frequency
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-lg border">
            {data.result.items.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.gracePeriodDays}</TableCell>
                <TableCell>{offer.amount}</TableCell>
                <TableCell>{offer.interestRate}%</TableCell>
                <TableCell>{offer.loanDurationDays} days</TableCell>
                <TableCell>{offer.repaymentFrequency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
      <div className="mt-20 text-end">
        <p>Total Offers: {data?.result.totalItems}</p>
      </div>
    </>
  );
};

export default MyOffers;

{
  /* <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.max(1, currentPagef - 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPagef === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 5 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPagef + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */
}

{
  /* <div className="flex flex-col items-start gap-6 p-6 bg-gray-100">
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
      </div> */
}
