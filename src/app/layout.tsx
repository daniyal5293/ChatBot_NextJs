// my_chatbot/src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'My Chatbot',
  description: 'AI-powered chatbot built with Next.js and Firebase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body className="bg-gray-900 text-white min-h-screen">
    
          <Header />
          <main>{children}</main>
       
      </body>
    </html>
  );
}
