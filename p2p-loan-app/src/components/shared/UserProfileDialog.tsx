import useProfile from '@/hooks/useProfile';
import React from 'react';
import { Dialog, DialogHeader, DialogContent } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function UserProfileDialog({
  userId,
  open,
  setOpen,
}: {
  userId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { GetUserProfile } = useProfile();
  const { data, isLoading, isError } = GetUserProfile(userId);
  return (
    <div className="z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogHeader>User Info</DialogHeader> */}
        <DialogContent className="z-[9999999999]">
          <div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching user profile</div>}
            {data && (
              <div>
                <div className="text-xs">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {data?.firstName[0]}
                      {data?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h1>
                  Name: {data.firstName} {data.lastName}
                </h1>
                <p>Email: {data.email}</p>
                <p>User type: {data.userType}</p>
                <p>Credit score: 5/5</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserProfileDialog;
