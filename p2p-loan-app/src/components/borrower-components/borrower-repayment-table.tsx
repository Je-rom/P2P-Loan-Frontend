'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableDetail {
  name: string;
  date: string;
  totalAmount: string;
  balance: string;
}

const tableDetails: TableDetail[] = [
  {
    name: 'August Repayment',
    date: '10/08/2024',
    totalAmount: '₦265,000.00',
    balance: '₦65,000.00',
  },
  {
    name: 'September Repayment',
    date: '10/09/2024',
    totalAmount: '₦275,000.00',
    balance: '₦75,000.00',
  },
  {
    name: 'October Repayment',
    date: '10/10/2024',
    totalAmount: '₦285,000.00',
    balance: '₦85,000.00',
  },
  {
    name: 'November Repayment',
    date: '10/11/2024',
    totalAmount: '₦295,000.00',
    balance: '₦95,000.00',
  },
  {
    name: 'December Repayment',
    date: '10/12/2024',
    totalAmount: '₦305,000.00',
    balance: '₦105,000.00',
  },
  {
    name: 'December Repayment',
    date: '10/12/2024',
    totalAmount: '₦305,000.00',
    balance: '₦105,000.00',
  },
];

const BorrowerRepaymentTable = () => {
  return (
    <>
      <div className="overflow-auto max-h-[400px] mt-5 scrollbar-hide">
        <Table className="w-full text-xs">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[450px]">Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-xs'>
            {tableDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.name}</TableCell>
                <TableCell>{detail.date}</TableCell>
                <TableCell>{detail.totalAmount}</TableCell>
                <TableCell className="text-right">{detail.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BorrowerRepaymentTable;
