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



import Link from "next/link"
import {
    File,
    Home,
    LineChart,
    ListFilter,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    ShoppingCart,
    Users2,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
import { deleteDocument, getDocuments, getCollectionWithPagination } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';
const PAGE_SIZE = 5; // Number of users per page

interface UserWithId extends User {
    id: string; // Add id to the User interface
}

export function DashboardStudents() {
    const [docId, setDocId] = useState<string>('');

    const router = useRouter()
    const addDataRoute = () => {
        router.push('/dashboard/students/add');
    }
    const [users, setUsers] = useState<UserWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [firstVisible, setFirstVisible] = useState<any>(null);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
    const [isPrevPageAvailable, setIsPrevPageAvailable] = useState<boolean>(false);


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


    const handleDelete = async (id: string) => {
        try {
            await deleteDocument('users', id); // Delete user by ID
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id)); // Update the local state to remove the deleted user
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };
    const handleEdit = (id: string) => {
        router.push(`/dashboard/edit?id=${id}`); // Navigate to the edit page with the user's ID
    };



    if (loading) {
        return <div>Loading users...</div>; // Loading indicator
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
                                        Tambah Siswa
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
                                            <TableRow>
                                                <TableHead>Id</TableHead>
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
                                            {users.length === 0 ? (
                                                <TableRow>Siswa Tidak Ada/ Tidak Ditemukan</TableRow>
                                            ) : (
                                                users.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell className="text-wrap  md:table-cell">
                                                            {user.id}
                                                        </TableCell>
                                                        <TableCell className="text-wrap overflow-auto md:table-cell">
                                                            {user.name}
                                                        </TableCell>
                                                        <TableCell className="overflow-auto md:table-cell">
                                                            {user.address}
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            {user.age}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button className='mx-2'
                                                                variant="outline"
                                                                onClick={() => router.push(`/dashboard/edit/${user.id}`)}>Edit</Button>
                                                            <Button
                                                                variant="destructive">
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger>Hapus</AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Apakah Anda ingin Menghapus?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                Data <span className="underline font-bold">
                                                                                    {user.name}
                                                                                </span>
                                                                                akan terhapus dari server dan tidak dapat dipulihkan
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => handleDelete(user.id)}
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
                                        Showing <strong>1-10</strong> of <strong>{users.length}</strong>{" "}
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

