'use client';
import React from 'react';
import Link from 'next/link';
import { LogOut, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import LoanRequest from '../../../public/loan-request.svg';
import Loans from '../../../public/loans.svg';
import myOffer from '../../../public/loans.svg';
import loanOffer from '../../../public/loan-offer.svg';
import LayoutDashboard from '../../../public/dashboard.svg';
import Settings from '../../../public/setting-2.svg';
import Image from 'next/image';
import { LogoutDialog } from './logoutdialog';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption =
    typeof window !== 'undefined' ? localStorage.getItem('user_type') : null;

  const routes = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href:
        selectedOption === 'radio' || selectedOption === 'artiste'
          ? `/${selectedOption}`
          : '/default',
    },
    {
      title: 'Loan Request',
      icon: LoanRequest,
      href: `/transactions/${selectedOption}`,
    },
    {
      title: 'Loans',
      icon: Loans,
      href: `/multimedia/${selectedOption}`,
    },
    {
      title: 'My Offers',
      icon: myOffer,
      href: `/account-settings/${selectedOption}`,
    },
    {
      title: 'Lenders Offers',
      icon: loanOffer,
      href: `/account-settings/${selectedOption}`,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/home/help',
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="px-3 py-10 flex-1 bg-blue-400">
          <div className="flex items-center justify-between mb-6 lg:mb-14 ">
            <div className="ml-5"></div>
          </div>
          <div className="flex flex-col justify-between h-[75dvh] overflow-auto scrollbar-hide">
            <div className="md:mt-8">
              {routes.map((route, index) => (
                <Link key={index} href={route.href}>
                  <Button className="w-[250px] bg-gray-200 hover:bg-white group mt-2 py-8 rounded-xl">
                    <div className="flex items-center w-full">
                      <Image
                        src={route.icon}
                        width={25}
                        height={20}
                        alt="icon"
                        className="mr-4"
                      />
                      <span className="text-gray-800 text-xl group-hover:text-blue-400">
                        {route.title}
                      </span>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <Button
                className="text-sm flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg text-white bg-blue-400 hover:bg-blue-400 items-center"
                onClick={() => setIsOpen(true)}
              >
                <LogOut className={cn('h-5 w-10 mr-3 text-xl')} />
                <h1 className="text-lg">Sign Out</h1>
              </Button>
              <LogoutDialog
                open={isOpen}
                onOpenChange={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
