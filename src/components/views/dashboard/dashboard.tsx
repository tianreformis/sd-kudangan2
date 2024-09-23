"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


// pages/read.tsx
import { useEffect, useState } from 'react';
import { getDocuments } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';

interface UserWithId extends User {
    id: string; // Add id to the User interface
}

export function DashboardCommonView() {


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

    )
}

