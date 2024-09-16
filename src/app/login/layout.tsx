import type { Metadata } from 'next'
import { Inter,Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'],weight:['100','500'] })

export const metadata: Metadata = {
  title: 'Login',
  
}

const LoginLayout = ({
  children,
}: {
  children: React.ReactNode
}) =>{
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        </body>
    </html>
  )
}

export default LoginLayout;