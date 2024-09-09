'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import BorrowerTable from '@/components/borrower-components/borrower-table';
import { useRouter } from 'next/navigation';
import Filter from '@/components/ui/filter';
import BorrowerRepaymentTable from '@/components/borrower-components/borrower-repayment-table';
import useWallet from '@/hooks/useWallet';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import useProfile from '@/hooks/useProfile';
import CreatePinDialog from '@/components/shared/create-pin-dialog';

interface ImageComponentProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={50}
    height={50}
    className="bg-pink-200 rounded-full"
  />
);

const BalanceCard: React.FC<{
  walletId: string | null;
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
  onSeeMoreClick: () => void;
}> = ({
  walletId,
  isBalanceVisible,
  toggleBalanceVisibility,
  onSeeMoreClick,
}) => {
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useWallet().useWalletBalanceQuery(walletId || '');
  return (
    <>
      <Card className="w-full md:w-[350px] shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <ImageComponent src="balance.svg" alt="Total balance" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mt-5">
            <div>
              <h1>Total Balance</h1>
              <p className="font-bold text-lg">
                {isBalanceLoading
                  ? 'Loading...'
                  : isBalanceError
                    ? 'Error fetching balance'
                    : isBalanceVisible
                      ? `₦ ${balanceData?.result.availableBalance.toFixed(2)}`
                      : '******'}
                {walletId && !isBalanceLoading && (
                  <button
                    onClick={toggleBalanceVisibility}
                    className="text-lg md:text-xl ml-1"
                  >
                    {isBalanceVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                )}
              </p>
            </div>
            <Button
              className="bg-green-100 hover:bg-green-100 text-green-700 rounded-full w-[80px] mt-3"
              onClick={onSeeMoreClick}
            >
              See More
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const ActiveLoanCard: React.FC<{
  onSeeMoreClick: () => void;
}> = ({ onSeeMoreClick }) => (
  <Card className="w-full md:w-[315px] shadow-xl">
    <CardHeader>
      <div className="flex justify-between items-center">
        <ImageComponent src="active-loans.svg" alt="Active Loan" />
        <EllipsisVertical color="#000000" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between mt-5">
        <div>
          <h1>Active Loan</h1>
          <p className="font-bold text-xl">99</p>
        </div>
        <Button
          className="bg-green-100 hover:bg-green-100 text-green-700 rounded-full w-[100px] mt-3"
          onClick={onSeeMoreClick}
        >
          See More
        </Button>
      </div>
    </CardContent>
  </Card>
);

const LoanRequestCard: React.FC<{
  onSeeMoreClick: () => void;
}> = ({ onSeeMoreClick }) => (
  <Card className="w-full md:w-[315px] shadow-xl">
    <CardHeader>
      <div className="flex justify-between items-center">
        <Image
          src="loan-req.svg"
          alt="Loan request"
          width={50}
          height={50}
          className="bg-pink-200 rounded-full"
        />
        <EllipsisVertical color="#000000" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between mt-5">
        <div>
          <h1>Loan Request</h1>
          <p className="font-bold text-xl">8</p>
        </div>
        <Button
          className="bg-green-100 hover:bg-green-100 text-green-700 rounded-full w-[100px] mt-3"
          onClick={onSeeMoreClick}
        >
          See More
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BorrowerPage = () => {
  const [fullName, setFullName] = useState('');
  const [walletId, setWalletId] = useState<string | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { getWalletQuery } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { GetCurrentUser } = useProfile();
  const { data: userProfile, isLoading: isProfileLoading } = GetCurrentUser();

  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWallet = result[0];
        setWalletId(firstWallet.id);
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

  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);

  useEffect(() => {
    if (userProfile && !isProfileLoading) {
      console.log('User Profile:', userProfile);
      if (!userProfile.pinCreated) {
        console.log(
          'PIN has not been created for this user. Opening dialog...',
        );
        setIsDialogOpen(true);
      } else {
        console.log('User has already created a PIN.');
      }
    }
  }, [userProfile, isProfileLoading]);

  return (
    <>
      <CreatePinDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="font-bold text-xl">Hi {fullName}</h1>
          <p>Welcome to BorrowPointe</p>
        </div>
        <Button
          onClick={() => router.push('/create-offer')}
          className="bg-blue-500 hover:bg-blue-500 w-[200px] h-[50px] rounded-xl"
        >
          <Plus color="#ffffff" />
          Create New Offer
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-6">
        <BalanceCard
          walletId={walletId}
          isBalanceVisible={isBalanceVisible}
          toggleBalanceVisibility={toggleBalanceVisibility}
          onSeeMoreClick={() => router.push('/borrower/wallet')}
        />
        <ActiveLoanCard onSeeMoreClick={() => router.push('/borrower/loan')} />
        <LoanRequestCard
          onSeeMoreClick={() => router.push('/borrower/loan-request')}
        />
      </div>
      <div className="p-6 mt-14 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Repayments</h1>
          <Filter />
        </div>
        <BorrowerRepaymentTable />
      </div>
      <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-4 flex flex-col md:flex-row justify-between items-start">
        <h1 className="font-bold text-xl sm:text-2xl">Transactions</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start mt-4 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">
          <div className="relative flex-grow w-full max-w-[250px]">
            <Input className="w-full rounded-xl" placeholder="Search history" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative flex-grow w-full max-w-[250px]">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0">
        <BorrowerTable />
      </div>
    </>
  );
};

export default BorrowerPage;
