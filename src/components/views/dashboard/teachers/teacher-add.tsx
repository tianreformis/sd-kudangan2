'use client'
import { useState } from 'react';
import { createDocument } from '@/lib/firebase/crud-students';
import { User } from '@/lib/firebase/crud-students';

import * as React from "react"

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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import { Teachers } from '@/lib/firebase/crud-teacher';


// Example state variable and setter function

export function AddTeacherViews() {
    //adding function
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const router = useRouter(); // Initialize useRouter to navigate programmatically


    const [successMessage, setSuccessMessage,] = useState<string>(''); // Success message state

    const backToDashboard = () => {
        router.push('/dashboard/teachers');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: Teachers = {
            name,
            address,
            email,
            role
        };


        const docId = await createDocument<Teachers>('teachers', data);
        console.log('Document created with ID:', docId);
        if (docId) {
            // Set success message
            setSuccessMessage('Guru berhasil ditamahkan! Kembali ke Halaman Awal...');

            // Redirect to the home page after 2 seconds
            setTimeout(() => {
                router.push('/dashboard/teachers');
            }, 200); // 2 seconds delay
        } else {
            setSuccessMessage('Error occurred while adding the user.');
        }
    };
    return (
        <Card className="w-[350px] sm:w-5/6">
            <CardHeader>
                <CardTitle>Tambahkan Guru </CardTitle>
                <CardDescription>Tambahkan data guru dengan melengkapi data berikut.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input type="text"
                                id="name"
                                placeholder="Masukkan Nama"
                                value={name} onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        {/* rest of the form fields */}

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="address">Jabatan</Label>
                            <select
                                className='bg-background border rounded-sm shadow-sm py-2 text-foreground'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                id="role" required >
                                <option value="principal" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Kepala Sekolah</span>
                                </option>
                                <option value="vice-principal" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Wakil Kepala Sekolah</span>
                                </option>
                                
                                <option value="homeroom-teacher" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Wali Kelas</span>
                                </option>
                                <option value="teacher" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Guru</span>
                                </option>

                                <option value="admin" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Admin</span>
                                </option>
                                
                                <option value="techinicial" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Teknisi</span>
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email"
                                id="email"
                                placeholder="Masukkan Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Alamat</Label>
                            <Input type="text"
                                id="address"
                                placeholder="Masukkan Alamat"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>


                    </div>
                    <CardFooter className="flex my-4 gap-2">
                        <Button variant="outline" onClick={backToDashboard} type='button'>Batal</Button>
                        <Button type='submit'>

                            Simpan</Button>
                    </CardFooter>
                    {successMessage && <p>{successMessage}</p>} {/* Display success message */}

                </form>
            </CardContent>


        </Card>
    )
}
