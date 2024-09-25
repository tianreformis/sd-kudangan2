"use client"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



import {
    File,
    ListFilter,
    PlusCircle,
} from "lucide-react"



import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useRouter } from 'next/navigation'

// pages/read.tsx
import { useEffect, useState } from 'react';
import { deleteDocument, getDocuments } from '@/lib/firebase/crud-students';
import { Teachers } from "@/lib/firebase/crud-teacher"
import Image from "next/image"
const PAGE_SIZE = 5; // Number of users per page


interface UserWithId extends Teachers {
    id: string; // Add id to the User interface
    name: string;
    role: string;
    address: string;
    email: string;
    imageUrl?: string;

}

export function DashboardTeachers() {
    const [teachers, setTeachers] = useState<UserWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getDocuments<UserWithId>('teachers');
                const formattedData = data.map(teacher => ({
                    ...teacher,
                    imageUrl: teacher.image, // Ensure to fetch the correct image URL
                }));
                setTeachers(formattedData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteDocument('teachers', id);
        setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    };

    const handleEdit = (userId: string) => {
        router.push(`/dashboard/teachers/edit?id=${userId}`);
    };

    if (loading) {
        return <div>Memuat Data Guru...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Guru</CardTitle>
                <CardDescription>Data Guru berdasarkan yang sudah dimasukkan</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>Guru Tidak Ada/ Tidak Ditemukan</TableCell>
                            </TableRow>
                        ) : (
                            teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>
                                        {teacher.imageUrl ? (
                                            <Image src={teacher.imageUrl} alt={teacher.name}
                                                width={64}
                                                height={64}
                                                className="overflow-hidden rounded-full"
                                            />

                                        ) : (
                                            <p>No Image</p>
                                        )}
                                    </TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.address}</TableCell>
                                    <TableCell>{teacher.role}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(teacher.id)}>Edit</Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Hapus</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Data <strong>{teacher.name}</strong> akan terhapus dari server dan tidak dapat dipulihkan.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(teacher.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

