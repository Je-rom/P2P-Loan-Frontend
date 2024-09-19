import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface CreatePinDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const CreatePinDialog: React.FC<CreatePinDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const { createPinMutation } = useAuth();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const isPinValid = pin.length === 4 && /^\d+$/.test(pin);
  const isConfirmPinValid = confirmPin.length === 4 && /^\d+$/.test(confirmPin);
  const isFormValid = isPinValid && isConfirmPinValid && pin === confirmPin;
  const isLoading = createPinMutation.isPending;

  const handleSubmit = async () => {
    if (pin !== confirmPin) {
      toast.error('PIN and Confirm PIN do not match.');
      return;
    }

    createPinMutation.mutate(
      { pin, confirmPin },
      {
        onSuccess: () => {
          toast.success('PIN created successfully.');
          setIsDialogOpen(false);
        },
        onError: () => {
          toast.error('Failed to create PIN.');
        },
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create PIN</DialogTitle>
          <DialogDescription className="text-xs">
            To ensure the highest level of security for your account, please set
            up a PIN. This PIN will be used to authorize transactions, manage
            loan requests, and access other sensitive activities. Creating a PIN
            helps protect your account from unauthorized access and ensures that
            only you can perform critical actions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pin" className="text-right text-xs">
              PIN
            </Label>
            <Input
              id="pin"
              type="password"
              className="col-span-3 text-xs"
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-pin" className="text-right text-xs">
              Confirm PIN
            </Label>
            <Input
              id="confirm-pin"
              type="password"
              className="col-span-3 text-xs"
              pattern="\d*"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setConfirmPin(value);
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Save Pin'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePinDialog;
