'use client';

import Sidebar from '@/components/ui/molecules/sidebar';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <Sidebar activeRoute={pathname} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
};

export default Layout;
