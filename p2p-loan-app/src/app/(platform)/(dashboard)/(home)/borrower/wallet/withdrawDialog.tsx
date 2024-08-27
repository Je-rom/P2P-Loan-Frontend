import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
import WalletService, { WalletBalance } from '@/services/walletService';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function WithdrawDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: () => void;
}) {
  const [copySuccess, setCopySuccess] = useState('');
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const { getWalletQuery, getWalletBalanceQuery } = useWallet();

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
  } = getWalletBalanceQuery(walletId || '');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[500px] h-auto rounded-2xl px-4 py-6 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Withdraw funds from your wallet
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Effortlessly withdraw funds from your wallet to your preferred
            account. Choose the withdrawal method, enter the amount, and confirm
            to complete the transaction instantly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">
              Destination Account
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input className="border-black pr-10 w-full text-sm sm:text-base" />
            </div>
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">
              Account Number
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input className="border-black pr-10 w-full text-sm sm:text-base" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">Amount</Label>
            <Input className="sm:col-span-3 w-full border-black text-sm sm:text-base" />
          </div>
          <h1 className="text-end">
            Available Balance: ₦
            {balanceData?.result.availableBalance.toFixed(2)}
          </h1>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="items-center flex justify-center w-full bg-blue-600 hover:bg-blue-800 text-sm sm:text-base"
          >
            Withdraw
          </Button>
        </DialogFooter>
        {copySuccess && (
          <div className="text-green-600 text-center mt-2">{copySuccess}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
