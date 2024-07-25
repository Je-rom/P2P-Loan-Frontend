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
    status: 'Completed',
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: 'Declined',
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: 'Deposited',
  },
  {
    name: 'Loan Request 1',
    date: 'Sat Apr, 2022',
    totalAmount: '$250.00',
    status: 'Declined',
  },
];

const LenderTable = () => {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
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
              <TableCell className="text-right">
                {invoice.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LenderTable;
