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

interface ChangePasswordDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const { changePasswordMutation } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);

    changePasswordMutation.mutate(
      { oldPassword, newPassword, confirmNewPassword: confirmPassword },
      {
        onSuccess: () => {
          toast.success('Password changed successfully.');
          setIsDialogOpen(false);
          setIsLoading(false);
        },
        onError: () => {
          toast.error('Failed to change Password.');
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription className='text-xs'>
            To maintain the highest level of security for your account, please
            update your password. Ensure your account remains protected by using a strong,
            unique password for all your login activities.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="text-left text-xs">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              className="w-full col-span-3 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-left text-xs">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full col-span-3 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-left text-xs">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
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
              'Change Password'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
