'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useWallet from '@/hooks/useWallet';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import LenderTable from '@/components/lender-components/lender-table';
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
    width={25}
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
    <Card className="w-full md:w-[220px] h-[122px] shadow-xl bg-orange-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <ImageComponent src="balance.svg" alt="Total balance" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <h1 className="text-xs">Total Balance</h1>
            <p className="font-bold text-sm">
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
                  className="text-lg md:text-xl ml-2"
                >
                  {isBalanceVisible ? (
                    <FaEye className="w-3" />
                  ) : (
                    <FaEyeSlash className="w-3" />
                  )}
                </button>
              )}
            </p>
          </div>
          <Button
            className="bg-orange-200 hover:bg-orange-200 text-orange-900 rounded-full w-[65px] h-[28px] text-xs mt-3"
            onClick={onSeeMoreClick}
          >
            See More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ActiveLoanCard: React.FC<{
  onSeeMoreClick: () => void;
}> = ({ onSeeMoreClick }) => (
  <Card className="w-full md:w-[220px] h-[122px] shadow-xl bg-purple-50">
    <CardHeader>
      <div className="flex justify-between items-center">
        <ImageComponent src="active-loans.svg" alt="Active Loan" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between">
        <div>
          <h1 className="text-xs">Active Loan</h1>
          <p className="font-bold text-sm">66</p>
        </div>
        <Button
          className="bg-purple-200 hover:bg-purple-200 text-purple-900 rounded-full w-[65px] h-[28px] text-xs mt-3"
          onClick={onSeeMoreClick}
        >
          See More
        </Button>
      </div>
    </CardContent>
  </Card>
);

const LenderPage = () => {
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
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="font-bold text-sm">Hi {fullName}</h1>
          <p className="text-xs">Welcome to BorrowPointe</p>
        </div>
        <Button
          onClick={() => router.push('/create-offer')}
          className="bg-blue-500 hover:bg-blue-500 w-[100px] h-[30px] text-xs"
        >
          <Plus color="#ffffff" />
          New Offer
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        <BalanceCard
          walletId={walletId}
          isBalanceVisible={isBalanceVisible}
          toggleBalanceVisibility={toggleBalanceVisibility}
          onSeeMoreClick={() => router.push('/lender/wallet')}
        />
        <ActiveLoanCard onSeeMoreClick={() => router.push('/lender/loan')} />
      </div>
      <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-6 flex flex-col md:flex-row justify-between items-start">
        <h1 className="font-bold text-xl sm:text-base">Transactions</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start mt-4 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">
          <div className="relative flex-grow w-full max-w-[200px]">
            <Input
              className="w-full rounded-xl text-xs"
              placeholder="Search history"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3" />
          </div>
          <div className="relative flex-grow w-full max-w-[250px]">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0">
        <LenderTable />
      </div>
    </>
  );
};

export default LenderPage;
