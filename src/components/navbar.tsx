'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link"
import {  Menu,   Atom } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ToggleDarkTheme from "./theme-switcher"


export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const loginRoute = () => {
    router.push('/auth/login');
  }
  return (

    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href=""
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Atom className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className={`${pathname === '/'
            ? "text-foreground"
            : "text-muted-foreground"}  
            transition-colors hover:text-foreground`
          }
        >
          Home
        </Link>
        <Link
          href="/vision"
          className={`${pathname === '/vision'
            ? "text-foreground"
            : "text-muted-foreground"}  
            transition-colors hover:text-foreground`}
        >
          Visi
        </Link>
        <Link
          href="/photo"
          className={`${pathname === '/photo' 
            ? "text-foreground" 
            : "text-muted-foreground"}  
            transition-colors hover:text-foreground`}
        >
          Photo
        </Link>
        <Link
          href="/teacher"
          className={`${pathname === '/teacher' 
          ? "text-foreground" 
          : "text-muted-foreground"}  
          transition-colors hover:text-foreground`}
        >
          Guru
        </Link>


      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Atom className="h-6 w-6" />
              <span className="sr-only">SD Kudangan 2</span>
            </Link>
            <Link
              href="/"
              className={`${pathname === '/'
                ? "text-foreground"
                : "text-muted-foreground"}  
            transition-colors hover:text-foreground underline`
              }
            >
              Home
            </Link>
            <Link
              href="/vision"
              className={`${pathname === '/vision' 
              ? "text-foreground underline" 
              : "text-muted-foreground"}  
              transition-colors hover:text-foreground`}
            >
              Visi
            </Link>
            <Link
              href="/photo"
              className={`${pathname === '/photo' ? "text-foreground" : "text-muted-foreground"}  transition-colors hover:text-foreground`}
            >
              Photo
            </Link>
            <Link
              href="/teacher"
              className={`${pathname === '/teacher' ? "text-foreground" : "text-muted-foreground"}  transition-colors hover:text-foreground`}
            >
              Guru
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <ToggleDarkTheme />

        </div>
      </div>

      {pathname === '/login'
        ? <></>
        : <Button onClick={loginRoute}>
          Login
        </Button >
      }



    </header>


  )
}

export default Navbar;