'use client';
import React, { useEffect, useState } from 'react';
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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const MyOffers = () => {
  const { GetMyLoanOffer } = useLoanOffer();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const router = useRouter();
  const { data, error, isLoading } = GetMyLoanOffer(
    totalItems,
    pageNumber,
    pageSize,
  );

  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };
  useEffect(() => {
    if (data?.result.totalItems) {
      setTotalItems(data.result.totalItems);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-xs">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <h1>Please wait, we are getting your loan offers</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center text-red-500 text-xs">
        <p className="text-sm">Failed to load loan offers</p>
      </div>
    );
  }

  if (!data?.result.items.length) {
    return (
      <div className="flex flex-col items-center text-center space-y-4">
        <Image
          src={'/no-results-found.png'}
          alt="No loan offers found"
          width={200}
          height={300}
        />
        <p className="text-sm font-semibold text-gray-700">
          No loan offers found
        </p>
        <p className="text-sm text-gray-500">Lets get you started</p>
        <Button
          onClick={() => router.push('/create-offer')}
          className="bg-blue-500 hover:bg-blue-500 w-[140px] h-[31px] text-xs"
        >
          Create A New Offer
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <h1 className="font-bold text-sm">Your Loan Offers</h1>
          <Button
            onClick={() => router.push('/create-offer')}
            className="bg-blue-500 hover:bg-blue-500 w-[120px] h-[30px] text-xs"
          >
            Create New Offer
          </Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto mt-5">
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-y-auto overflow-hidden text-xs">
          <TableHeader className="bg-white border">
            <TableRow className="bg-blue-100">
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
              <TableHead className="font-bold text-black-900">
                Grace Period
              </TableHead>
              <TableHead className="font-bold text-black-900">
                Acurring Interest Rate
              </TableHead>
              <TableHead className="font-bold text-black-900">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border text-xs">
            {data.result.items.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>₦{offer.amount}</TableCell>
                <TableCell>{offer.interestRate}%</TableCell>
                <TableCell>{offer.loanDurationDays} days</TableCell>
                <TableCell className="capitalize">
                  {offer.repaymentFrequency}
                </TableCell>
                <TableCell>{offer.gracePeriodDays} days</TableCell>
                <TableCell>{offer.accruingInterestRate}</TableCell>
                <TableCell className="">
                  <span
                    className={`inline-block px-2 text-xs font-semibold rounded-full ${
                      offer.active
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {offer.active ? 'Yes' : 'No'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-20 text-xs text-end">
        <p>Total Offers: {data?.result.totalItems}</p>
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
    </>
  );
};

export default MyOffers;
