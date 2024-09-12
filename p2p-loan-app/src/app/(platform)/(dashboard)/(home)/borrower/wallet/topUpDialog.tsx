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
import useWallet from '@/hooks/useWallet';
import { Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export function TopUpDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: () => void;
}) {
  const [copySuccess, setCopySuccess] = useState('');
  const nameRefs = useRef<(HTMLInputElement | null)[]>([]);
  const accountNumberRefs = useRef<(HTMLInputElement | null)[]>([]);
  const bankNameRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [topUpDetails, setTopUpDetails] = useState<any[]>([]);
  const { getWalletQuery } = useWallet();

  useEffect(() => {
    if (getWalletQuery.isSuccess && getWalletQuery.data) {
      const { result } = getWalletQuery.data;
      if (result.length > 0) {
        const firstWallet = result[0];
        setWalletId(firstWallet.id);
        setTopUpDetails(firstWallet.topUpDetails); // Save all top-up details to the state
      }
    }
  }, [getWalletQuery.isSuccess, getWalletQuery.data]);

  useEffect(() => {
    if (getWalletQuery.isError) {
      toast.error('Failed to fetch wallet');
    }
  }, [getWalletQuery.isError]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[400px] h-auto rounded-2xl px-4 py-1 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xs sm:text-xs mt-2">
            Top up your wallet
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-xs">
            Easily add funds to your wallet to continue enjoying seamless
            transactions. Transfer funds into any of the below bank accounts,
            and once processed, your wallet balance will be updated accordingly.
          </DialogDescription>
        </DialogHeader>
        <div className="dialog-container w-full h-[400px] p-4 overflow-hidden">
          <div className="content-container h-full overflow-y-auto">
            {topUpDetails.map((detail, index) => (
              <div
                key={index}
                className="grid gap-4 py-4 rounded-lg border border-black mb-4 p-2"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2">
                  <Label className="text-start text-xs sm:text-xs">
                    Account Name
                  </Label>
                  <div className="relative sm:col-span-3 w-full">
                    <Input
                      ref={(el) => {
                        nameRefs.current[index] = el;
                      }}
                      defaultValue={detail.accountName || ''}
                      className="border-white pr-10 w-full text-xs sm:text-xs"
                      disabled
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr- cursor-pointer"
                      onClick={() =>
                        copyToClipboard(nameRefs.current[index]?.value || '')
                      }
                    >
                      <Copy className="w-3" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2">
                  <Label className="text-start text-xs sm:text-xs">
                    Account Number
                  </Label>
                  <div className="relative sm:col-span-3 w-full">
                    <Input
                      ref={(el) => {
                        accountNumberRefs.current[index] = el;
                      }}
                      defaultValue={detail.accountNumber || ''}
                      className="border-white pr-10 w-full text-xs sm:text-xs"
                      disabled
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-1 cursor-pointer"
                      onClick={() =>
                        copyToClipboard(
                          accountNumberRefs.current[index]?.value || '',
                        )
                      }
                    >
                      <Copy className="w-3" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-1">
                  <Label className="text-start text-xs sm:text-xs">
                    Bank Name
                  </Label>
                  <div className="relative sm:col-span-3 w-full">
                    <Input
                      ref={(el) => {
                        bankNameRefs.current[index] = el;
                      }}
                      defaultValue={detail.bankName || ''}
                      className="border-white pr-10 w-full text-xs sm:text-xs"
                      disabled
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-1 cursor-pointer"
                      onClick={() =>
                        copyToClipboard(
                          bankNameRefs.current[index]?.value || '',
                        )
                      }
                    >
                      <Copy className="w-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {copySuccess && (
          <div className="text-green-600 text-center mt-2">{copySuccess}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// useEffect(() => {
// //     if (getWalletQuery.isSuccess && getWalletQuery.data) {
// //       const { result } = getWalletQuery.data;
// //       if (result.length > 0) {
// //         const firstWallet = result[0];
// //         setWalletId(firstWallet.id);
// //         setTopUpAccountName(firstWallet.topUpDetails[0]?.accountName || '');
// //         setTopupAccountNumber(firstWallet.topUpDetails[0]?.accountNumber || '');
// //         setTopUpBankName(firstWallet.topUpDetails[0]?.bankName || '');
// //       }
// //     }
// //   }, [getWalletQuery.isSuccess, getWalletQuery.data]);
