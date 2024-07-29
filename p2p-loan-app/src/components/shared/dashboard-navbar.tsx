'use client';
import React from 'react';
import { Bell } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { getFirstLetter } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';

const DashboardNavbar = () => {
  const storedEmail = localStorage.getItem('email');
  const user = {
    isLoading: false,
    data: { email: storedEmail || 'Micheal Jackson' },
  };
  const router = useRouter();

  return (
    <nav className="md:flex items-center px-8 py-7 border-b-2 shadow-lg bg-white w-full">
      <div className=''>
        <h1 className='font-bold text-2xl'>BorrowPoint</h1>
      </div>
      <div className="flex justify-end items-center w-full">
        <div className="flex items-center gap-4">
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
              <div>
                <p className="text-lg font-semibold">
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
