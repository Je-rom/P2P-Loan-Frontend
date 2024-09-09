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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create PIN</DialogTitle>
          <DialogDescription>
            Please create a PIN to enhance your account security.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pin" className="text-right">
              PIN
            </Label>
            <Input
              id="pin"
              type="password"
              className="col-span-3"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-pin" className="text-right">
              Confirm PIN
            </Label>
            <Input
              id="confirm-pin"
              type="password"
              className="col-span-3"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save PIN
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePinDialog;
