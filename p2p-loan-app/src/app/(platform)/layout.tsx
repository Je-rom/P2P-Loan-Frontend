import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/providers/query-provider';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster />
      {children}
    </QueryProvider>
  );
};

export default PlatformLayout;