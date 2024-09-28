"use client";
import { useState } from 'react';
import { register } from '@/lib/auth'; // Import the register function
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState(''); // Address state
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await register(email, password, address); // Pass address to register
            router.push('/dashboard'); // Redirect to dashboard or a welcome page
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="flex w-full flex-col justify-center align-middle sm:my-2">
                <Card className="mx-auto max-w-sm flex flex-col justify-center align-middle">
                    <CardHeader>
                        <CardTitle className="text-2xl">Mendaftar</CardTitle>
                        <CardDescription>
                            Untuk bisa masuk kedalam sistem SD Kudangan 2
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label> {/* New Address Field */}
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Mendaftarkan...' : 'Daftar'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Sudah Punya Akun?{" "}
                            <Link href="/auth/login" className="underline">
                                Login here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

export default RegisterPage;
