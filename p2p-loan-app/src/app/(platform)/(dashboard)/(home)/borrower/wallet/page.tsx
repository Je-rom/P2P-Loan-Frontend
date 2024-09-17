'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { TopUpDialog } from './topUpDialog';
import { WithdrawDialog } from './withdrawDialog';
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

const Wallet = () => {
  const router = useRouter();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
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

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  if (getWalletQuery.isLoading || isBalanceLoading || isTransactionsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/Opener Loading.gif" alt="load" width={200} height={30} />
        <h1 className="font-bold text-base">
          We are getting your wallet details...
        </h1>
      </div>
    );
  }

  if (getWalletQuery.isError || isBalanceError || isTransactionsError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/Failed Mail.gif" alt="load" width={200} height={30} />
        <h1 className="font-bold text-base">
          Sorry we couldn't get your wallet details...
        </h1>
      </div>
    );
  }

  // Pagination calculations
  const totalElements = transactionData?.result.totalElements ?? 0;
  const totalPages = Math.ceil(totalElements / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <>
      {copySuccess && (
        <div className="text-green-400 text-center font-bold text-2xl">
          {copySuccess}
        </div>
      )}
      <div className="px-2 md:px-2">
        <h1 className="font-bold text-base">Your Wallet</h1>
        <div className="flex justify-start mt-5">
          <Card
            className="w-full max-w-[380px] h-[140px] rounded-3xl relative"
            style={{
              backgroundImage: `url('/cardbg.svg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <CardHeader>
              <div className="flex flex-row md:flex-row justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/monnifyY.png"
                    alt="monnify logo"
                    width={25}
                    height={60}
                    className=""
                  />
                  <span className="text-sm md:text-sm lg:text-sm">
                    Your Account
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-start">
              <div className="flex items-center">
                <h1 className="mr-1 text-xs md:text-xs">
                  Account Number:
                  {accountNumber
                    ? `${accountNumber.slice(0, 8)}...`
                    : 'Not available'}
                </h1>
                <div
                  className="flex ml-2 items-center pr-3 cursor-pointer"
                  onClick={() => copyToClipboard(accountNumber)}
                >
                  <Copy className="w-4" />
                </div>
              </div>
              <div
                className="flex flex-row sm:flex-row sm:items-center sm:justify-between gap-4 p-2 sm:p-3"
                onClick={toggleBalanceVisibility}
              >
                <div className="flex flex-col items-center flex-grow">
                  <h1 className="text-xs sm:text-xs font-medium">
                    Available Balance
                  </h1>

                  <p className="font-bold text-sm sm:text-sm">
                    {isBalanceVisible
                      ? `₦ ${balanceData?.result.availableBalance.toFixed(2)}`
                      : '******'}
                  </p>
                </div>

                <div className="flex flex-col items-center flex-grow">
                  <h1 className="text-xs sm:text-xs font-medium">
                    Ledger Balance
                  </h1>

                  <p className="font-bold text-sm sm:text-sm">
                    {isBalanceVisible
                      ? `₦ ${balanceData?.result.ledgerBalance.toFixed(2)}`
                      : '******'}
                  </p>
                </div>

                <div className="flex items-center justify-center sm:mt-0">
                  {isBalanceVisible ? (
                    <FaEye className="text-sm sm:text-sm" />
                  ) : (
                    <FaEyeSlash className="text-sm sm:text-sm" />
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-5 flex gap-4">
          <Button
            className="bg-blue-400 hover:bg-blue-400 w-[80px] h-[30px]"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <Image
              src={'/withdraw.svg'}
              alt="withdraw"
              width={10}
              height={16}
              className="mr-2"
            />
            <span className="text-xs">Withdraw</span>
          </Button>
          <WithdrawDialog
            open={isWithdrawOpen}
            onOpenChange={() => setIsWithdrawOpen(false)}
          />

          <Button
            className="bg-blue-400 hover:bg-blue-400 w-[80px] h-[30px]"
            onClick={() => setIsTopUpOpen(true)}
          >
            <Image
              src={'/plus.svg'}
              alt="top up"
              width={10}
              height={16}
              className="mr-2"
            />
            <span className="text-xs">Top Up</span>
          </Button>
          <TopUpDialog
            open={isTopUpOpen}
            onOpenChange={() => setIsTopUpOpen(false)}
          />
        </div>
        <div>
          <div className="mt-5 bg-gray-100 bg-opacity-100">
            <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-4 flex flex-col md:flex-row justify-between items-start">
              <h1 className="text-base sm:text-base">
                Your wallet transactions
              </h1>
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
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500"
                    >
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
      </div>
    </>
  );
};

export default Wallet;
