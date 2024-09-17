'use client';
import React, { useEffect, useState } from 'react';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
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

const BorrowerTable = () => {
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { getWalletQuery, useWalletBalanceQuery, useWalletTransaction } =
    useWallet();
  const [copySuccess, setCopySuccess] = useState('');

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useWalletBalanceQuery(walletId || '');

  //get wallet transactions
  const {
    data: transactionData,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useWalletTransaction(walletId || '', 1, itemsPerPage, currentPage, 0);

  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWallet = result[0];
        setWalletId(firstWallet.id);
        setAccountNumber(firstWallet.accountNumber);
      }
    }
  }, [getWalletQuery.isSuccess, getWalletQuery.data]);

  useEffect(() => {
    if (getWalletQuery.isError) {
      toast.error('Failed to fetch wallet');
    }
  }, [getWalletQuery.isError]);

  // Pagination calculations
  const totalElements = transactionData?.result.totalElements ?? 0;
  const totalPages = Math.ceil(totalElements / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div>
        <div className="mt-5 bg-gray-100 bg-opacity-100">
          <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-4 flex flex-col md:flex-row justify-between items-start">
            <h1 className="text-base sm:text-base">Your wallet transactions</h1>
          </div>
          <Table className="text-xs">
            <TableHeader className="bg-white text-center">
              <TableRow>
                <TableHead className="">Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date and Time</TableHead>
                <TableHead className="text-right">Transaction Type</TableHead>
                <TableHead className="text-center">Narration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData?.result.content.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No wallet transactions yet
                  </TableCell>
                </TableRow>
              ) : (
                transactionData?.result.content.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.transactionReference}
                    </TableCell>
                    <TableCell>{`₦${transaction.amount.toFixed(2)}`}</TableCell>
                    <TableCell>
                      {new Date(transaction.transactionDate).toLocaleString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        },
                      )}
                    </TableCell>
                    <TableCell
                      className={`${transaction.isCredit ? 'text-green-500' : 'text-red-500'} text-center`}
                    >
                      {transaction.isCredit ? 'Credit' : 'Debit'}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.narration.startsWith(
                        'Withdrawal fee from wallet',
                      )
                        ? 'Withdrawal fee from your wallet'
                        : transaction.narration.startsWith(
                              'Withdrawal from wallet',
                            )
                          ? 'Withdrawal from your wallet'
                          : transaction.narration.startsWith('Loan request')
                            ? 'Loan Request approval'
                            : transaction.narration}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
      </div>
    </>
  );
};

export default BorrowerTable;
