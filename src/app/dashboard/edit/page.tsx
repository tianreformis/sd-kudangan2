// pages/dashboard/edit-profile.tsx
"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/init'; // Adjust the path based on your project structure
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditProfilePage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // Replace 'userId' with the actual user ID from your authentication context
            const userId = "userId"; // Get this from your authentication context
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setEmail(userData.email);
                setName(userData.name || '');
                setAddress(userData.address || '');
            } else {
                setError("User not found");
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        // Replace 'userId' with the actual user ID from your authentication context
        const userId = "userId"; // Get this from your authentication context

        try {
            setLoading(true);
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                email,
                name,
                address,
                updatedAt: new Date(), // Optional field for tracking updates
            }, { merge: true }); // Merge the data to avoid overwriting
            router.push('/dashboard'); // Redirect to dashboard after update
        } catch (err) {
            setError('Profile update failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdateProfile}>
            <div className="flex w-full flex-col justify-center align-middle sm:my-2">
                <Card className="mx-auto max-w-sm flex flex-col justify-center align-middle">
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    readOnly // Make it read-only if you don't want users to change it
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

export default EditProfilePage;
