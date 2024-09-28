"use client"
import Link from "next/link"
import {
    Home,
    UserCircle2Icon,
    Users2,

} from "lucide-react"
import { usePathname } from "next/navigation"


export default function DashboardAside() {
    const pathname = usePathname();
    return (
        <aside className="fixed inset-y-0 left-0  hidden w-140 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
               
                <Link
                    href="/dashboard"
                    className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold ${pathname === "/dashboard" ? "text-blue-500" : "text-primary-foreground"} md:h-8 md:w-8 md:text-base`}
                >
                    <Home className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Dashboard</span>
                </Link>
                <Link
                    href="/dashboard/students"
                    className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold ${pathname === "/dashboard/students" ? "text-blue-500" : "text-primary-foreground"} md:h-8 md:w-8 md:text-base`}
                >
                    <Users2 className="h-4 w-4 transition-all group-hover:scale-110 bg" />
                    <span className="sr-only">Students</span>
                </Link>
                <Link
                    href="/dashboard/teachers"
                    className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold ${pathname === "/dashboard/teachers" ? "text-blue-500" : "text-primary-foreground"} md:h-8 md:w-8 md:text-base`}
                >
                    <UserCircle2Icon className="h-4 w-4 transition-all group-hover:scale-110 bg" />
                    <span className="sr-only">Teachers</span>
                </Link>

            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">

            </nav>
        </aside>


    )
}

