
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden relative">
      <Header />
      <main className="flex-1 bg-background pt-16 md:pt-20 relative z-0">{children}</main>
      <Footer />
    </div>
  );
};
