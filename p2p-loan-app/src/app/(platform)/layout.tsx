'use client';
import DashboardNavbar from '@/components/shared/dashboard-navbar';
import Sidebar from '@/components/shared/sidebar';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import Bottombar from '@/components/shared/bottomBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="h-full relative">
      <div className="hidden rounded-r-lg h-full w-[200px] lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[80] shrink-0">
        <Sidebar />
      </div>
      <main className="lg:pl-72">
        {isDesktop ? (
          <div
            className="px-8 py-10 lg:px-20 lg:py-16"
            style={{ minHeight: 'calc(100vh - 4rem)' }}
          >
            {children}
          </div>
        ) : (
          <div className="" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            {children}
          </div>
        )}
      </main>
      <Bottombar />
    </div>
  );
};

export default DashboardLayout;