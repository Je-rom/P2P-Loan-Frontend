'use client';
import { useEffect, useState } from 'react';
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
import { toast } from 'sonner';
import useWallet from '@/hooks/useWallet';
import useBanks from '@/hooks/useBank';
import BankService from '@/services/bankService';
import { Loader2 } from 'lucide-react';

export function WithdrawDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [walletId, setWalletId] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(
    null,
  );
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [pin, setPin] = useState('');
  const [withdrawalFee, setWithdrawalFee] = useState<number | null>(null);

  const {
    getWalletQuery,
    useWalletBalanceQuery,
    useWithdrawFeeQuery,
    Withdraw,
  } = useWallet();
  const withdraw = Withdraw();
  const { GetBanks, GetAccountDetails } = useBanks();

  // Fetch withdrawal fee when both account number and amount are entered
  const { data: withdrawalFeeData, error: withdrawalFeeError } =
    useWithdrawFeeQuery(amount || 0);

  useEffect(() => {
    if (withdrawalFeeData) {
      setWithdrawalFee(withdrawalFeeData.result.fee);
    } else if (withdrawalFeeError) {
      toast.error('Failed to fetch withdrawal fee');
    }
  }, [withdrawalFeeData, withdrawalFeeError]);

  const isPinValid = pin.length === 4 && /^\d+$/.test(pin);

  const {
    data: banksData,
    isLoading: isBanksLoading,
    isError: isBanksError,
  } = GetBanks();
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useWalletBalanceQuery(walletId || '');

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
    if (selectedBank && accountNumber?.toString().length === 10) {
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
      const response = await BankService.getAccountDetails(
        accountNumber,
        selectedBank,
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
      setWithdrawalFee(null);
    }
    onOpenChange && onOpenChange(isOpen);
  };

  const isLoading = withdraw.isPending;
  const handleSubmit = () => {
    if (!amount) {
      toast.error('Please enter the amount.');
      return;
    }

    if (!walletId) {
      toast.error('Wallet ID is missing.');
      return;
    }

    if (!selectedBank) {
      toast.error('Please select a bank.');
      return;
    }

    if (!accountNumber || accountNumber.length !== 10) {
      toast.error('Please enter a valid account number.');
      return;
    }

    if (!isPinValid) {
      toast.error('Please enter a valid 4-digit PIN.');
      return;
    }

    withdraw.mutateAsync({
      amount,
      walletId,
      destinationBankCode: selectedBank,
      destinationAccountNumber: accountNumber,
      currency: 'NGN',
      PIN: pin,
    });
    // setAmount(null);
    // setWalletId(null);
    // setSelectedBank(null);
    // setAccountNumber(null);
    // setPin('');
    // setAccountName(null);
    // setVerificationMessage(null);
    // setWithdrawalFee(null);
    // handleDialogClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[400px] h-auto rounded-2xl px-2 py-4 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-sm">
            Withdraw funds from your wallet
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-xs">
            Effortlessly withdraw funds from your wallet to your preferred
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-xs sm:text-xs">
              Choose a bank
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Select onValueChange={(value) => setSelectedBank(value)}>
                <SelectTrigger className="w-full text-xs">
                  <SelectValue
                    placeholder={
                      isBanksLoading ? 'Loading...' : 'Select a bank'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isBanksLoading && (
                      <SelectItem className="text-xs" disabled value="loading">
                        Loading banks...
                      </SelectItem>
                    )}
                    {isBanksError && (
                      <SelectItem className="text-xs" disabled value="error">
                        Failed to load banks
                      </SelectItem>
                    )}
                    {banksData?.result.responseBody.map((bank) => (
                      <SelectItem
                        key={bank.code}
                        value={bank.code}
                        className="text-xs"
                      >
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 mt-2">
            <Label className="text-start text-xs sm:text-xs">
              Account Number
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input
                className="border-black pr-10 w-full text-xs sm:text-xs"
                placeholder="Enter account number"
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength={10}
                value={accountNumber || ''}
              />
              {isVerifying && <p className="text-xs mt-1">Verifying...</p>}
              {accountName && (
                <span className="text-green-600 text-xs mt-2">
                  {accountName}
                </span>
              )}
              {verificationMessage && (
                <p className="text-red-600 text-xs mt-2">
                  {verificationMessage}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 mt-2">
            <Label className="text-start text-xs sm:text-xs">Amount</Label>
            <Input
              className="sm:col-span-3 w-full border-black text-sm sm:text-base"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {withdrawalFee !== null && (
            <div className="text-xs text-black">
              Withdrawal Fee: ₦{withdrawalFee}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 mt-2">
            <Label className="text-start text-xs sm:text-xs">
              Enter your pin
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input
                id="pin"
                type="text"
                className="text-xs border-black"
                pattern="\d*"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setPin(value);
                  }
                }}
              />
            </div>
          </div>

          <h1 className="text-end text-xs text-green-700 font-bold">
            Available Balance: ₦{balanceData?.result.availableBalance}
          </h1>
        </div>

        <DialogFooter>
          <Button
            disabled={!isPinValid || isLoading}
            onClick={handleSubmit}
            type="submit"
            className="items-center flex justify-center w-full bg-blue-600 hover:bg-blue-800 text-sm sm:text-sm"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Withdraw'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
