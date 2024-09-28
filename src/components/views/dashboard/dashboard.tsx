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
import { getDocuments } from '@/lib/firebase/crud-students';
import { User } from '@/lib/firebase/crud-students';
import { Teachers } from '@/lib/firebase/crud-teacher';

interface UserWithId extends User {
    id: string; // Add id to the User interface
}
interface TeachersWithId extends Teachers {
    id: string; // Add id to the User interface
}

export function DashboardCommonView() {


    const [users, setUsers] = useState<UserWithId[]>([]);
    const [teachers, setTeachers] = useState<TeachersWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state


    useEffect(() => {
        async function fetchStudentsData() {
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
        fetchStudentsData();
        async function fetchTeachersData() {
            try {
                setLoading(true); // Start loading
                const data = await getDocuments<TeachersWithId>('teachers');
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching users:', error); // Log any fetching errors
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        }
        fetchTeachersData();
    }, []);


    return (
        <div>
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
            <Card>
                <CardHeader>
                    <CardTitle>Jumlah Guru</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {teachers.length} Orang Guru
                    </CardDescription>
                </CardContent>
            </Card>
        </div>


    )
}

