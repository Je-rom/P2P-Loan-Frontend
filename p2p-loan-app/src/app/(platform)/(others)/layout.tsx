'use client';
import DashboardNavbar from '@/components/shared/dashboard-navbar';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

const OthersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="sticky top-0 z-30 w-full">
        <DashboardNavbar />
      </div>
      <main className="lg:pl-7">
        <div
          className="px-8 py-10 lg:px-20 lg:py-16"
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default OthersLayout;


// 
// 