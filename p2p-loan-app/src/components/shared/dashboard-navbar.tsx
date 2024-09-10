'use client';
import React, { useEffect, useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import MobileSidebar from './mobile-sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const DashboardNavbar = () => {
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const email = localStorage.getItem('email');
      setStoredEmail(email);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const user = {
    isLoading,
    data: { email: storedEmail || 'null' },
  };

  const router = useRouter();

  return (
    <>
      <nav className="md:flex flex items-center px-8 py-6 shadow-lg bg-white w-full">
        <MobileSidebar />
        <div className="flex justify-end items-center w-full">
          <div className="flex items-center gap-2">
            <Bell className="cursor-pointer hidden lg:flex" size={18} />
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer w-[24px] h-[23px]">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      {storedEmail?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push('/account-settings')}
                    >
                      Profile
                      <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>
                      <LogOut className={cn('h-5 w-10 text-xl')} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!user.isLoading && (
              <div>
                <p className="text-xs font-semibold">{user.data.email}</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
