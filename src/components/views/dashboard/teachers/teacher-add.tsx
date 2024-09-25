'use client'
import { useState } from 'react';
import { createDocument } from '@/lib/firebase/crud-teacher'; // Adjust your import based on the file structure
import { Teachers } from '@/lib/firebase/crud-teacher'; // Teacher interface
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
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebase/init';

// AddTeacherViews component
export function AddTeacherViews() {
    // State management for form inputs
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('teacher'); // Default value set
    const [age, setAge] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null); // For storing the uploaded file
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>(''); // Success message

    const router = useRouter(); // Initialize useRouter for navigation
    const storage = getStorage(); // Initialize Firebase Storage

    // Redirect function
    const backToDashboard = () => {
        router.push('/dashboard/teachers');
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!name  || !address || !email || !role) {
            setError("All fields are required");
            return;
        }

        if (!image) {
            setError("Please select an image");
            return;
        }

        try {
            // Upload image to Firebase Storage and get download URL
            const storageRef = ref(storage, `teachers/${image.name}`);
            const uploadTask = await uploadBytesResumable(storageRef, image);
            const imageUrl = await getDownloadURL(uploadTask.ref); // Get image URL

            // Create teacher data with the image URL
            const data: Teachers = {
                name,
                address,
                email,
                image: imageUrl, // Pass the image URL to Firestore
                role
            };

            // Add teacher document to Firestore
            const docId = await createDocument<Teachers>('teachers', data);
            console.log('Document created with ID:', docId);

            // Display success message and navigate back after 2 seconds
            if (docId) {
                setSuccessMessage('Guru berhasil ditamahkan! Kembali ke Halaman Awal...');
                setTimeout(() => {
                    router.push('/dashboard/teachers');
                }, 2000); // 2 seconds delay
            }
        } catch (error) {
            setError('Error occurred while adding the user.');
            console.error("Error:", error);
        }
    };

    // Handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); // Store selected image file
        }
    };

    return (
        <Card className="w-[350px] sm:w-5/6">
            <CardHeader>
                <CardTitle>Tambahkan Guru</CardTitle>
                <CardDescription>Tambahkan data guru dengan melengkapi data berikut.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Masukkan Nama"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="role">Jabatan</Label>
                            <select
                                className='bg-background border rounded-sm shadow-sm py-2 text-foreground'
                                value={role}
                                onChange={(e) => setRole(e.target.value)} // Role change handler
                                id="role"
                                required
                            >
                                <option value="principal">Kepala Sekolah</option>
                                <option value="vice-principal">Wakil Kepala Sekolah</option>
                                <option value="homeroom-teacher">Wali Kelas</option>
                                <option value="teacher">Guru</option>
                                <option value="admin">Admin</option>
                                <option value="technician">Teknisi</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Masukkan Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                type="text"
                                id="address"
                                placeholder="Masukkan Alamat"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Upload Image:</label>
                            <input type="file" onChange={handleImageChange} accept="image/*" required />
                        </div>
                    </div>

                    <CardFooter className="flex my-4 gap-2">
                        <Button variant="outline" onClick={backToDashboard} type='button'>Batal</Button>
                        <Button type='submit'>Simpan</Button>
                    </CardFooter>

                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p>{successMessage}</p>} {/* Display success message */}
                </form>
            </CardContent>
        </Card>
    );
}
