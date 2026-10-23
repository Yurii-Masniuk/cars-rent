'use client';

import css from './layout.module.css';
import SideBar from '@/components/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <div className={css.adminLayout}>
      <SideBar />
      <div className={css.mainWrapper}>
        <main className={css.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );

};
