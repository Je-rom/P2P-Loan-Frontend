'use client';
import DashboardNavbar from '@/components/shared/dashboard-navbar';
import Sidebar from '@/components/shared/sidebar';
import { MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import ChatModal from '../(others)/chatModal';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); //

  const handleOpenChat = () => {
    setIsChatModalOpen(true); // Open ChatModal when button is clicked
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false); // Close ChatModal
  };
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
      <ChatModal isOpen={isChatModalOpen} onClose={handleCloseChat} />
    <div
      className="fixed bottom-6 right-6 p-4 bg-sky-400 rounded-full shadow-lg cursor-pointer hover:bg-sky-500"
      onClick={handleOpenChat}
    >
      <MessageCircle className="text-white w-8 h-8" />
    </div>
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
