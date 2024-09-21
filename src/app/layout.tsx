import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', ] })

export const metadata: Metadata = {  
    title: 'SD Kudangan 2 | Homepage' 
  
}

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
          <Navbar />
          <main className='mx-5 my-5'>
            {children}
          </main>
        </ThemeProvider>

      </body>
    </html>
  )
}

export default RootLayout;