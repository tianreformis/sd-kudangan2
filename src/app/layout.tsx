"use client"

import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from 'next/navigation'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', ] })
const disableNavbar=[
  '/dashboard',
  '/dashboard/students',
  '/dashboard/students/add',
  '/not-found',
  '/404',
  '/login'
]


const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {


  return (
    <html lang="en">
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