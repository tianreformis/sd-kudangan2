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
const PAGE_SIZE = 5; // Number of users per page


interface UserWithId extends Teachers {
    id: string; // Add id to the User interface
    name: string;
    role: string;
    address: string;
    email: string;

}

export function DashboardTeachers() {
    const [docId, setDocId] = useState<string>('');

    const router = useRouter()

    const addDataRoute = () => {
        router.push('/dashboard/teachers/add');
    }
    const [teachers, setTeachers] = useState<UserWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [firstVisible, setFirstVisible] = useState<any>(null);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
    const [isPrevPageAvailable, setIsPrevPageAvailable] = useState<boolean>(false);


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true); // Start loading
                const data = await getDocuments<UserWithId>('teachers');
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching users:', error); // Log any fetching errors
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        }
        fetchData();
    }, []);


    const handleDelete = async (id: string) => {
        try {
            await deleteDocument('teachers', id); // Delete user by ID
            setTeachers((prevUsers) => prevUsers.filter(teachers => teachers.id !== id)); // Update the local state to remove the deleted user
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };
    const handleEdit = (userId: string) => {
        router.push(`/dashboard/teachers/edit?id=${userId}`);
    };




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
                        <CardTitle>Guru</CardTitle>
                        <CardDescription>
                            Data Guru berdasarkan yang sudah dimasukkan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Alamat</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Jabatan
                                    </TableHead>
                                    <TableHead>
                                        <span className="">Aksi</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {teachers.length === 0 ? (
                                    <TableRow>Guru Tidak Ada/ Tidak Ditemukan</TableRow>
                                ) : (
                                    teachers.map((teacher) => (
                                        <TableRow key={teacher.id}>
                                            <TableCell className="text-wrap  md:table-cell">
                                                {teacher.email}
                                            </TableCell>
                                            <TableCell className="text-wrap overflow-auto md:table-cell">
                                                {teacher.name}
                                            </TableCell>
                                            <TableCell className="overflow-auto md:table-cell">
                                                {teacher.address}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {
                                                    teacher.role==="vice-principal" ? "Wakil Kepala Sekolah" :
                                                        teacher.role==="principal" ? "Kepala Sekolah" :
                                                        teacher.role==="homeroom-teacher" ? "Wali Kelas" :
                                                        teacher.role==="admin" ? "Administrasi" :
                                                        teacher.role==="technician" ? "Teknisi" :
                                                        teacher.role==="super-admin" ? "Super Admin" :
                                                            "Tidak Ditentukan"
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Button className='mx-2'
                                                    variant="outline"
                                                    onClick={() => handleEdit(teacher.id)}>Edit</Button>
                                                <Button
                                                    variant="destructive">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>Hapus</AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Apakah Anda ingin Menghapus?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Data <span className="underline font-bold">
                                                                        {teacher.name}
                                                                    </span>
                                                                    akan terhapus dari server dan tidak dapat dipulihkan
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(teacher.id)}
                                                                >Continue
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </Button>




                                            </TableCell>
                                        </TableRow>
                                    )))
                                }

                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>{teachers.length}</strong>{" "}
                            products
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

