'use client';
import React from 'react';
import { Bell } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { getFirstLetter } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import Notification from '@/components/shared/notificationicon';

const DashboardNavbar = () => {
  const storedEmail = localStorage.getItem('email');
  const user = {
    isLoading: false,
    data: { email: storedEmail || 'No email found' },
  };
  const router = useRouter();

  return (
    <nav className="md:flex items-center px-8 py-7 border-b-2 bg-purple-200">
      <div className="flex justify-end items-center w-full">
        <div className="flex items-center gap-4">
          <Notification />

          {user.isLoading ? (
            <div className="flex items-center gap-x-2">
              <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute bg-neutral-800/10" />
              </div>
              <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute bg-neutral-800/10" />
              </div>
              <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute bg-neutral-800/10" />
              </div>
            </div>
          ) : (
            <>
              <Image src={'/djprofile.webp'} alt="dj" width={50} height={10} />
              <div>
                <p className="text-sm font-semibold">
                  {`${user?.data?.email}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
