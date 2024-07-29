'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Completed', color: 'text-green-500' },
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Deposited', color: 'text-green-500' },
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: { text: 'Declined', color: 'text-red-500' },
  },
];

const BorrowerTable = () => {
  return (
    <div className="mt-5 bg-gray-100 bg-opacity-100">
      <Table>
        <TableHeader className="bg-white text-center">
          <TableRow className="">
            <TableHead className="">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow>
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
  );
};

export default BorrowerTable;
