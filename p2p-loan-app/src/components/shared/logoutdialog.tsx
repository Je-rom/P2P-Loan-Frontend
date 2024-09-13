import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export function LogoutDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: () => void;
}) {
  const closeDialog = () => {
    if (onOpenChange) {
      onOpenChange();
    }
  };
  const router = useRouter();
  const { logOut } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[90vw] sm:w-[350px] h-[220px] flex flex-col items-center">
        <div className="mt-10 justify-center items-center">
          <h1 className="tracking-wide text-center justify-center text-base">
            Are you sure you want to logout?
          </h1>
          <div className="mt-14 flex justify-center items-center gap-8">
            <Button
              onClick={logOut}
              className="bg-gray-200 px-6 py5 hover:bg-blue-400 hover:text-white text-blue-900"
            >
              Yes
            </Button>
            <Button
              onClick={closeDialog}
              className="bg-gray-200 px-6 py-5 hover:bg-blue-400 hover:text-white text-blue-900"
            >
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
