'use client';
import DashboardNavbar from '@/components/shared/dashboard-navbar';
import React from 'react';

const OthersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="sticky top-0 z-30 w-full">
        <DashboardNavbar />
      </div>
      <main className="lg:pl-5">
        <div
          className=" lg:px-10 lg:py-10"
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default OthersLayout;
