"use client"
import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/dashboard'); // Redirect to dashboard on success
        } catch (err) {
            setError('Login Gagal');
        }
    };
    return (
        <form onSubmit={handleLogin}>


            <div className="flex w-full flex-col justify-center align-middle sm:my-2">
                <Card className="mx-auto max-w-sm flex flex-col justify-center align-middle">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Masukkan email dibawah untuk dapat login ke sistem
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/auth/forgotpassword" className="ml-auto inline-block text-sm underline">
                                        Lupa Sandi?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && <p>{error}</p>}
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Login Dengan Google
                            </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Tidak Punya Akun?{" "}
                            <Link href="/auth/register" className="underline">
                                Mendaftar
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </form>


    )
}

export default LoginPage;