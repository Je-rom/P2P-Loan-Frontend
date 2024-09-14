import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'BorrowPointe',
  description:
    "Peer-to-Peer (P2P) Microloan Platform that bridges the gap between borrower's and lenders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Toaster
          toastOptions={{
            className:
              'w-96 h-16 text-xs bg-blue-900 text-white rounded-xl text-center flex justify-center items-center',
          }}
          position="top-center"
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
