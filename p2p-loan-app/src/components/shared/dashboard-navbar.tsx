'use client';
import React, { useEffect, useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
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
import useProfile from '@/hooks/useProfile';

const DashboardNavbar = () => {
  const { GetCurrentUser } = useProfile();
  const { data: userProfile, isLoading, error } = GetCurrentUser();

  const router = useRouter();

  if (isLoading) {
    return (
      <nav className="md:flex flex items-center px-8 py-6 shadow-lg bg-white w-full">
        <MobileSidebar />
        <div className="flex justify-end items-center w-full">
          <div className="flex items-center gap-2">
            {/* <Bell className="cursor-pointer hidden lg:flex" size={18} /> */}
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
          </div>
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="md:flex flex items-center px-8 py-6 shadow-lg bg-white w-full">
        <MobileSidebar />
        <div className="flex justify-end items-center w-full text-xs">
          <div>Error loading profile</div>
        </div>
      </nav>
    );
  }

  if (!userProfile) {
    return (
      <nav className="md:flex flex items-center px-8 py-6 shadow-lg bg-white w-full">
        <MobileSidebar />
        <div className="flex justify-end items-center w-full text-xs">
          <div>No profile data available</div>
        </div>
      </nav>
    );
  }

  const { firstName, lastName, email, userType } = userProfile;

  return (
    <nav className="md:flex flex items-center px-8 py-6 shadow-lg bg-white w-full">
      <MobileSidebar />
      <div className="flex justify-end items-center w-full">
        <div className="flex items-center gap-2">
          {/* <Bell className="cursor-pointer hidden lg:flex" size={18} /> */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer w-[24px] h-[23px]">
                <AvatarFallback className="bg-blue-500 text-white text-xs">
                  {email?.charAt(0).toUpperCase() || 'U'}
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
          <div className="ml-4">
            <p className="text-xs font-semibold">{email}</p>
            <p className="text-xs capitalize">{userType}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
