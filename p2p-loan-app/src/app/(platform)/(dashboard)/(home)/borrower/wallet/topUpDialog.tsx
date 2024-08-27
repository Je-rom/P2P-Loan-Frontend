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
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export function TopUpDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: () => void;
}) {
  const [copySuccess, setCopySuccess] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const accountNumberRef = useRef<HTMLInputElement>(null);

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
            Top up your wallet
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Easily add funds to your wallet to continue enjoying seamless
            transactions. Choose your preferred payment method, enter the
            amount, and confirm to top up instantly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">
              Topup Account Name
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input
                ref={nameRef}
                defaultValue="Pedro Duarte"
                className="border-black pr-10 w-full text-sm sm:text-base"
                disabled
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => copyToClipboard(nameRef.current?.value || '')}
              >
                <Copy />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">
              Topup Account Number
            </Label>
            <div className="relative sm:col-span-3 w-full">
              <Input
                ref={accountNumberRef}
                defaultValue="Pedro"
                className="border-black pr-10 w-full text-sm sm:text-base"
                disabled
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() =>
                  copyToClipboard(accountNumberRef.current?.value || '')
                }
              >
                <Copy />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <Label className="text-start text-sm sm:text-base">Amount</Label>
            <Input className="sm:col-span-3 w-full border-black text-sm sm:text-base" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="items-center flex justify-center w-full bg-blue-600 hover:bg-blue-800 text-sm sm:text-base"
          >
            Top Up Now
          </Button>
        </DialogFooter>
        {copySuccess && (
          <div className="text-green-600 text-center mt-2">{copySuccess}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
