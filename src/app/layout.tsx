"use client"

import Navbar from '@/components/navbar'
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname,useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Head from 'next/head'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', ] })
const disableNavbar=[
  '/dashboard',
  '/dashboard/students',
  '/dashboard/students/add',
  '/dashboard/students/edit${user.id}',
  '/not-found','/notfound',
  '/404',
  '/login'
]  

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [pageTitle, setPageTitle] = useState('My App'); // Local state for dynamic title
  const pathname = usePathname();

  useEffect(() => {
    const getPageTitle = () => {
      switch (pathname) {
        case '/':
          return 'Home Page';
        case '/about':
          return 'About Us';
        case '/contact':
          return 'Contact Us';
        case '/read':
          return 'User List';
        case '/edit':
          return 'Edit User';
        default:
          return 'My App'; // Fallback title
      }
    };

    // Update title based on the current path
    setPageTitle(getPageTitle());
  }, [pathname]); // Re-run effect when pathname changes

  
  return (
    
    <html lang="en">
      <Head>
          <title>{pageTitle} | SD Kudangan 2</title>
      </Head>

      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {!disableNavbar.includes(usePathname()) && <Navbar />}
          
          <main className='mx-5 my-5'>
            <div>
            {children}
            </div>
            
          </main>
        </ThemeProvider>

      </body>
    </html>
  )
}

export default RootLayout;