'use client';
import React, { useState } from 'react';
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

const invoices: string | any[] = [
  {
    id: 1,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Completed', color: 'text-green-500' },
  },
  {
    id: 2,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
  {
    id: 3,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Deposited', color: 'text-green-500' },
  },
  {
    id: 4,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
  {
    id: 5,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
  {
    id: 6,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
  {
    id: 7,
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
];

const BorrowerWalletTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const currentItems = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="mt-5 bg-gray-100 bg-opacity-100">
        <Table className="text-xs">
          <TableHeader className="bg-white text-center">
            <TableRow className="">
              <TableHead className="">Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.name}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell className={`${invoice.status.color} text-right`}>
                  {invoice.status.text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination className="mt-5 flex justify-end items-end text-xs">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="text-xs"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  isActive={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="text-xs"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default BorrowerWalletTable;
