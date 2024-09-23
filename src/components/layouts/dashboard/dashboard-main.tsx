"use client"

import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react"



import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


// pages/read.tsx
import { useEffect, useState } from 'react';
import { getDocuments } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';
import  DashboardAside  from "@/components/layouts/dashboard/dashboard-aside"
import { DashboardHeader } from "./dashboard-header"

interface UserWithId extends User {
    id: string; // Add id to the User interface
}

export function DashboardMain() {
    

    const [users, setUsers] = useState<UserWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true); // Start loading
                const data = await getDocuments<UserWithId>('users');
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error); // Log any fetching errors
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        }
        fetchData();
    }, []);


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <DashboardAside />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <DashboardHeader />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Jumlah Siswa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {users.length} Orang Siswa
                            </CardDescription>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}

