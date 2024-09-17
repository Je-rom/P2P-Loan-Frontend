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
interface ChangePinDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const ChangePinDialog: React.FC<ChangePinDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const { changePinMutation } = useAuth();
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPin !== confirmPin) {
      toast.error('New PIN and Confirm PIN do not match.');
      return;
    }

    setIsLoading(true);

    changePinMutation.mutate(
      { oldPin, newPin, confirmNewPin: confirmPin },
      {
        onSuccess: () => {
          toast.success('PIN changed successfully.');
          setIsDialogOpen(false);
          setIsLoading(false);
        },
        onError: () => {
          toast.error('Failed to change PIN.');
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change PIN</DialogTitle>
          <DialogDescription className="text-xs">
            To keep your account secure, please update your PIN. Regularly
            changing your PIN helps protect your account from unauthorized
            access. Your security is our top priority.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPin" className="text-left text-xs">
              Old PIN
            </Label>
            <Input
              id="oldPin"
              type="password"
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
              placeholder="Enter your old PIN"
              className="w-full col-span-3 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPin" className="text-left text-xs">
              New PIN
            </Label>
            <Input
              id="newPin"
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Enter your new PIN"
              className="w-full col-span-3 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPin" className="text-left text-xs">
              Confirm PIN
            </Label>
            <Input
              id="confirmPin"
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Confirm your new PIN"
              className="w-full col-span-3 text-xs"
            />
          </div>
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-300"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              'Change PIN'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePinDialog;
