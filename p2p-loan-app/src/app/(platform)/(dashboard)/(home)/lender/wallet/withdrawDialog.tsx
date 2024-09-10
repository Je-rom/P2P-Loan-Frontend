'use client';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useState } from 'react';
import useWallet from '@/hooks/useWallet';
import { toast } from 'sonner';
import useBanks from '@/hooks/useBank';
import BankService from '@/services/bankService';

export function WithdrawDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [copySuccess, setCopySuccess] = useState('');
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(
    null,
  );
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | null>(null);
  const { getWalletQuery, useWalletBalanceQuery } = useWallet();

  const { GetBanks } = useBanks();

  const {
    data: banksData,
    isLoading: isBanksLoading,
    isError: isBanksError,
  } = GetBanks();

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

  useEffect(() => {
    if (selectedBank && accountNumber?.length === 10) {
      verifyAccountDetails();
    }
  }, [selectedBank, accountNumber]);

  const verifyAccountDetails = async () => {
    if (!accountNumber || !selectedBank) {
      toast.error('Please select a bank and enter your account number.');
      return;
    }

    setIsVerifying(true);
    setVerificationMessage(null);
    setAccountName(null);
    try {
      const selectedBank1 = parseInt(selectedBank, 10);
      const accountNumber1 = parseInt(accountNumber, 10);
      const response = await BankService.getAccountDetails(
        accountNumber1,
        selectedBank1,
      );
      const { accountName } = response.data.result.responseBody;
      setAccountName(accountName);
      setVerificationMessage(null);
    } catch (error) {
      setVerificationMessage('Account name enquiry unsuccessful');
      setAccountName(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setAccountNumber(null);
      setSelectedBank(null);
      setAccountName(null);
      setVerificationMessage(null);
      setIsVerifying(false);
      setAmount(null);
    }
    onOpenChange && onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[500px] h-auto rounded-2xl px-4 py-6 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Withdraw funds from your wallet
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Effortlessly withdraw funds from your wallet to your preferred
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">
              Choose a bank
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Select
                onValueChange={(value) => {
                  const selectedBank = banksData?.result.responseBody.find(
                    (bank) => bank.code === value,
                  );
                  setSelectedBank(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isBanksLoading ? 'Loading...' : 'Select a bank'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isBanksLoading && (
                      <SelectItem disabled value="loading">
                        Loading banks...
                      </SelectItem>
                    )}
                    {isBanksError && (
                      <SelectItem disabled value="error">
                        Failed to load banks
                      </SelectItem>
                    )}
                    {banksData?.result.responseBody.map((bank) => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 mt-2">
            <Label className="text-start text-sm sm:text-base">
              Account Number
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input
                className="border-black pr-10 w-full text-sm sm:text-base"
                placeholder="Enter account number"
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength={10}
                value={accountNumber || ''}
              />
              {isVerifying && <p className="text-sm mt-1">Verifying...</p>}
              {accountName && (
                <span className="text-green-600 text-sm mt-2">
                  {accountName}
                </span>
              )}
              {verificationMessage && (
                <p className="text-red-600 text-sm mt-2">
                  {verificationMessage}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 mt-2">
            <Label className="text-start text-sm sm:text-base">Amount</Label>
            <Input
              className="sm:col-span-3 w-full border-black text-sm sm:text-base"
              value={amount || ''}
              onChange={(e) => setAmount(e.target.value)}
            />
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
