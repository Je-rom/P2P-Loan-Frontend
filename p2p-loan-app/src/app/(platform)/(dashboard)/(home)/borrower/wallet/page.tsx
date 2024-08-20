'use client';
import React, { useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';
import { CircleDollarSign } from 'lucide-react';
import BorrowerWalletTable from '@/components/borrower-components/borrower-wallet-table';

const Wallet = () => {
  const router = useRouter();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const walletId = '7151617725';

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const copyWalletId = () => {
    navigator.clipboard.writeText(walletId);
  };

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
                  Account No:
                </h1>
                <h2 className="mr-2 text-sm md:text-base">{walletId}</h2>
                <button onClick={copyWalletId} className="text-lg md:text-xl">
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
                {isBalanceVisible ? '₦ 0.00' : '******'}
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-5 flex gap-4">
          <Button className="bg-blue-400 hover:bg-blue-400">
            <CircleDollarSign color="#ffffff" className="mr-1" />
            Deposit
          </Button>
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
          <Button className="bg-blue-400 hover:bg-blue-400" onClick={() => {}}>
            <Image
              src={'/plus.svg'}
              alt="top up"
              width={16}
              height={16}
              className="mr-2"
            />
            <span>Top Up</span>
          </Button>
        </div>
        <div>
          <BorrowerWalletTable />
        </div>
      </div>
    </>
  );
};

export default Wallet;
