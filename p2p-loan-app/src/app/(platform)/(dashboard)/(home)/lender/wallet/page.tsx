'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BorrowerWalletTable from '@/components/borrower-components/borrower-wallet-table';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { TopUpDialog } from './topUpDialog';
import { WithdrawDialog } from './withdrawDialog';

const Wallet = () => {
  const router = useRouter();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const { getWalletQuery, useWalletBalanceQuery } = useWallet();
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

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

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useWalletBalanceQuery(walletId || '');

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  if (getWalletQuery.isLoading || isBalanceLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/Opener Loading.gif" alt="load" width={300} height={30} />
        <h1 className="font-bold text-xl">
          We are getting your wallet details...
        </h1>
      </div>
    );
  }

  if (getWalletQuery.isError || isBalanceError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/Failed Mail.gif" alt="load" width={300} height={30} />;
        <h1 className="font-bold text-xl">
          Sorry we couldn't get your wallet details...
        </h1>
      </div>
    );
  }

  return (
    <>
      {copySuccess && (
        <div className="text-green-400 text-center font-bold text-2xl">
          {copySuccess}
        </div>
      )}
      <div className="px-2 md:px-2">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Your Wallet
        </h1>
        <div className="flex justify-start mt-5">
          <Card
            className="w-full max-w-[600px] h-[220px] rounded-3xl relative"
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
                    width={45}
                    height={60}
                    className=""
                  />
                  <span className="text-base md:text-lg lg:text-xl">
                    Your Account
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-start px-4 md:px-6">
              <div className="flex items-center">
                <h1 className="mr-1 font-semibold text-sm md:text-base">
                  Account Number: {accountNumber}
                </h1>
                <div
                  className="flex ml-2 items-center pr-3 cursor-pointer"
                  onClick={() => copyToClipboard(accountNumber)}
                >
                  <Copy className="w-5" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <h1 className="mr-6 font-semibold text-sm md:text-base">
                  Available Balance
                </h1>
                <button
                  onClick={toggleBalanceVisibility}
                  className="text-lg md:text-xl"
                >
                  {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="font-bold text-xl md:text-2xl mt-2">
                {isBalanceVisible
                  ? `₦ ${balanceData?.result.availableBalance.toFixed(2)}`
                  : '******'}
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-5 flex gap-4">
          <Button
            className="bg-blue-400 hover:bg-blue-400"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <Image
              src={'/withdraw.svg'}
              alt="withdraw"
              width={16}
              height={16}
              className="mr-2"
            />
            <span>Withdraw</span>
          </Button>
          <WithdrawDialog
            open={isWithdrawOpen}
            onOpenChange={() => setIsWithdrawOpen(false)}
          />

          <Button
            className="bg-blue-400 hover:bg-blue-400"
            onClick={() => setIsTopUpOpen(true)}
          >
            <Image
              src={'/plus.svg'}
              alt="top up"
              width={16}
              height={16}
              className="mr-2"
            />
            <span>Top Up</span>
          </Button>
          <TopUpDialog
            open={isTopUpOpen}
            onOpenChange={() => setIsTopUpOpen(false)}
          />
        </div>
        <div>
          <BorrowerWalletTable />
        </div>
      </div>
    </>
  );
};

export default Wallet;
