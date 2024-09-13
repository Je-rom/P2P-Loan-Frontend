'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import LoanRequest from '../../../public/loan-request.svg';
import myOffer from '../../../public/loans.svg';
import loanOffer from '../../../public/lender-offer.svg';
import LayoutDashboard from '../../../public/dashboard.svg';
import Settings from '../../../public/setting-2.svg';
import Wallet from '../../../public/wallet.png';
import Loan from '../../../public/loan.png';
import Image from 'next/image';
import { LogoutDialog } from './logoutdialog';
import NavbarLogo from './navbar-logo';

interface Route {
  title: string;
  icon: any;
  href?: string;
  items?: { title: string; href: string }[];
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const selectedOption =
    typeof window !== 'undefined' ? localStorage.getItem('user_type') : null;

  const getHref = (path: string) => {
    return selectedOption ? `/${selectedOption}/${path}` : `/${path}`;
  };

  const commonRoutes: Route[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: selectedOption ? `/${selectedOption}` : '/default',
    },
    {
      title: 'Loan Request',
      icon: LoanRequest,
      href: getHref('loan-request'),
    },
    {
      title: 'Loans',
      icon: Loan,
      href: getHref('loan'),
    },
    {
      title: 'My Offers',
      icon: myOffer,
      href: getHref('my-offers'),
    },
    {
      title: 'My Wallet',
      icon: Wallet,
      href: getHref('wallet'),
    },
  ];

  const accountSettingsRoute: Route = {
    title: 'Account Settings',
    icon: Settings,
    href: '/account-settings',
  };

  const routes: Route[] =
    selectedOption === 'borrower'
      ? [
          ...commonRoutes,
          {
            title: 'Lenders Offers',
            icon: loanOffer,
            href: getHref('lender-offers'),
          },
          accountSettingsRoute,
        ]
      : selectedOption === 'lender'
        ? [
            ...commonRoutes,
            {
              title: 'Borrowers Offers',
              icon: loanOffer,
              href: getHref('borrower-offers'),
            },
            accountSettingsRoute,
          ]
        : [...commonRoutes, accountSettingsRoute];

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();

    const path = window.location.pathname;
    setActiveLink(path || null);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-3 flex-1 bg-blue-400">
        <div className="flex items-center justify-between mb-4">
          <div className="ml-5 mt-3">
            <NavbarLogo />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="md:mt-9">
            {loading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-[190px] py-4 rounded-xl mt-2"
                  />
                ))}
              </div>
            ) : (
              routes.map((route, index) => {
                return (
                  <Link key={index} href={route.href || '#'} passHref>
                    <Button
                      className={cn(
                        'w-[180px] py-4 rounded-xl mt-2',
                        activeLink === route.href
                          ? 'bg-white hover:bg-white'
                          : 'bg-blue-200 hover:bg-white',
                      )}
                      onClick={() => setActiveLink(route.href || null)}
                    >
                      <div className="flex items-center w-full">
                        <Image
                          src={route.icon}
                          width={15}
                          height={20}
                          alt="icon"
                          className="mr-2"
                        />
                        <span className="text-gray-800 text-sm group-hover:text-blue-400">
                          {route.title}
                        </span>
                      </div>
                    </Button>
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="mt-10">
          <Button
            className="text-sm flex p-5 w-full justify-start font-medium cursor-pointer rounded-lg text-white bg-blue-400 hover:bg-blue-400 items-center"
            onClick={() => setIsOpen(true)}
          >
            <LogOut className={cn('h-6 w-4 mr-3 text-xl')} />
            <h1 className="text-sm">Sign Out</h1>
          </Button>
          <LogoutDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
