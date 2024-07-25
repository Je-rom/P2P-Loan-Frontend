import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
// import useAuth from '@/hooks/useAuth';

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
//   const { logout } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[500px] h-[400px] flex flex-col items-center">
        {/* <div className="bg-purple-900 p-0 w-full h-20"></div> */}
        <div className="mt-16 justify-center items-center">
          <h1 className="tracking-wide text-center justify-center font-bold text-2xl">
            Are you sure you want to logout ?
          </h1>
          <DialogFooter>
            <div className="mt-14 space-x-10 mr-20">
              <Button
                // onClick={logout}
                className="bg-gray-200 px-10 py-7 hover:bg-purple-900 hover:text-white text-purple-900"
              >
                Yes
              </Button>
              <Button
                onClick={closeDialog}
                className="bg-gray-200 px-10 py-7 hover:bg-purple-900 hover:text-white text-purple-900"
              >
                No
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
