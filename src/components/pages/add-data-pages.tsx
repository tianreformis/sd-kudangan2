'use client'
import { useState } from 'react';
import { createDocument } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';

export function AddStudentsPages() {
    //adding function
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const router = useRouter(); // Initialize useRouter to navigate programmatically
    const [successMessage, setSuccessMessage] = useState<string>(''); // Success message state

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: User = {
            name, age, address,
            id: ''
        };


        const docId = await createDocument<User>('users', data);
        console.log('Document created with ID:', docId);
        if (docId) {
            // Set success message
            setSuccessMessage('User successfully added! Redirecting to home...');

            // Redirect to the home page after 2 seconds
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000); // 2 seconds delay
        } else {
            setSuccessMessage('Error occurred while adding the user.');
        }
    };
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Tambahkan Siswa </CardTitle>
                <CardDescription>Tambahkan data siswa dengan melengkapi data berikut.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input type="text"
                                id="name"
                                placeholder="Masukkan Nama"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Alamat</Label>
                            <Input type="text"
                                id="address"
                                placeholder="Masukkan Alamat"
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="age">Umur</Label>
                            <Input type="number"
                                id="address"
                                placeholder="Masukkan Umur"
                                value={age} onChange={(e) => setAge(Number(e.target.value))} />
                        </div>


                    </div>
                    <CardFooter className="flex justify-between my-2">
                        <Button variant="outline">Cancel</Button>
                        <Button type='submit'>Deploy</Button>
                    </CardFooter>
                    {successMessage && <p>{successMessage}</p>} {/* Display success message */}
      
                </form>
            </CardContent>


        </Card>
    )
}
