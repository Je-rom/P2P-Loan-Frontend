'use client';
import DashboardNavbar from '@/components/shared/dashboard-navbar';
import Sidebar from '@/components/shared/sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="sticky top-0 z-10 w-full">
        <DashboardNavbar />
      </div>
      <div className="hidden rounded-r-lg h-full w-[200px] lg:flex lg:w-52 lg:flex-col lg:fixed lg:inset-y-0 z-30 shrink-0">
        <Sidebar />
      </div>
      <main className="lg:pl-44">
        <div
          className="px-6 py-6 lg:px-16 lg:py-10"
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
          {children}
        </div>
        {/* <div className="" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          {children}
        </div> */}
      </main>
    </div>
  );
};

export default DashboardLayout;

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const isDesktop = useMediaQuery('(min-width: 768px)');

//   return (
//     <div className="h-full relative">
//     <div className="sticky top-0 z-30 w-full">
//       <DashboardNavbar />
//     </div>
//     <div className="hidden rounded-r-lg h-full w-[200px] lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-20 shrink-0">
//       <Sidebar />
//     </div>
//     <main className="lg:pl-72">
//       {isDesktop ? (
//         <div
//           className="px-8 py-10 lg:px-20 lg:py-16"
//           style={{ minHeight: 'calc(100vh - 4rem)' }}
//         >
//           {children}
//         </div>
//       ) : (
//         <div className="" style={{ minHeight: 'calc(100vh - 4rem)' }}>
//           {children}
//         </div>
//       )}
//     </main>
//     <Bottombar />
//   </div>
//   );
// };

// export default DashboardLayout;
