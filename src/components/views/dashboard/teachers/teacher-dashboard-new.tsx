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


interface TeachersWithId extends Teachers {
    id: string; // Add id to the User interface
    name: string;
    role: string;
    address: string;
    email: string;
    imageUrl?: string;

}

export function DashboardTeachersNew ()  {
    const [docId, setDocId] = useState<string>('');
    const router = useRouter()
    const [teachers, setTeachers] = useState<TeachersWithId[]>([]);   
    

    
    const [users, setUsers] = useState<TeachersWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [firstVisible, setFirstVisible] = useState<any>(null);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
    const [isPrevPageAvailable, setIsPrevPageAvailable] = useState<boolean>(false);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getDocuments<TeachersWithId>('teachers');
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
        try {
            await deleteDocument('teachers', id); // Delete user by ID
            setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher.id !== id)); 
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id)); 
            
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };
    const handleEdit = (userId: string) => {
        router.push(`/dashboard/teachers/edit?id=${userId}`);
    };

    const addDataRoute = () => {
        router.push('/dashboard/teachers/add');
    }




    if (loading) {
        return <div>Memuat Data Guru...</div>; // Loading indicator
    }

    return (

        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Active
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Archived
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1" onClick={addDataRoute}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Tambah Guru
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Siswa</CardTitle>
                        <CardDescription>
                            Data Siswa berdasarkan yang sudah dimasukkan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="">
                                <TableHead>Photo</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Alamat</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Umur
                                    </TableHead>
                                    <TableHead>
                                        <span className="">Aksi</span>
                                    </TableHead>
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
                                                width={40}
                                                height={40}
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
                                    <TableCell className="flex flex-row gap-2 justify-center">
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
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Menampilkan <strong>1-10</strong> of <strong>{teachers.length}</strong>{" "}
                            Guru
                        </div>
                    </CardFooter>
                </Card>

            </TabsContent>
        </Tabs>

    )
}



function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

