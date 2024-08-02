'use client';
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { getFirstLetter } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import MobileSidebar from './mobile-sidebar';

const DashboardNavbar = () => {
  const [storedEmail, setStoredEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setStoredEmail(email);
  }, []);

  const user = {
    isLoading: false,
    data: { email: storedEmail || 'null' },
  };
  const router = useRouter();

  return (
    <nav className="md:flex flex items-center px-8 py-7 shadow-lg bg-white w-full">
      <MobileSidebar />
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
