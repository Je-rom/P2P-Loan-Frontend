'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CircleDollarSign } from 'lucide-react';
import BorrowerWalletTable from '@/components/borrower-components/borrower-wallet-table';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import WalletService, { WalletBalance } from '@/services/walletService';
import { useQuery } from '@tanstack/react-query';
import { TopUpDialog } from './topUpDialog';

const Wallet = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const { getWalletQuery } = useWallet();

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
  } = useQuery<WalletBalance, AxiosError<{ message: string }>>({
    queryKey: ['walletBalance', walletId],
    queryFn: async (): Promise<WalletBalance> => {
      if (!walletId) {
        throw new Error('Wallet ID not found');
      }
      const response = await WalletService.getWalletBalance(walletId);
      return response.data;
    },
    enabled: !!walletId,
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Failed to fetch wallet balance:', error.message);
      toast.error(`Error: ${error.response?.data.message || error.message}`);
    },
    onSuccess: (data: WalletBalance) => {
      const { message, result } = data;
      console.log('Wallet balance fetched successfully:', result);
      toast.success(message);
    },
  });

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  if (getWalletQuery.isLoading || isBalanceLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/Opener Loading.gif" alt="load" width={300} height={30} />;
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
                <h2 className="mr-2 text-sm md:text-base"></h2>
                <button className="text-lg md:text-xl">
                  <FaCopy />
                </button>
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
          <Button className="bg-blue-400 hover:bg-blue-400">
            <Image
              src={'/withdraw.svg'}
              alt="top up"
              width={16}
              height={16}
              className="mr-2"
            />
            <span>Withdraw</span>
          </Button>
          <Button
            className="bg-blue-400 hover:bg-blue-400"
            onClick={() => setIsOpen(true)}
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
          <TopUpDialog open={isOpen} onOpenChange={() => setIsOpen(false)} />
        </div>
        <div>
          <BorrowerWalletTable />
        </div>
      </div>
    </>
  );
};

export default Wallet;
