"use client"

import DashboardAside from '@/components/layouts/dashboard/dashboard-aside'
import { DashboardHeader } from '@/components/layouts/dashboard/dashboard-header'
import { Poppins } from 'next/font/google'


const poppins = Poppins({ subsets: ['latin'], weight: ['400',] })
const disableNavbar = [
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default RootLayout;