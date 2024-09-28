"use client";
import { useState } from 'react';
import { resetPassword } from '@/lib/auth'; // Import the resetPassword function
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

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);
        try {
            await resetPassword(email);
            setMessage('A password reset link has been sent to your email.');
        } catch (err) {
            setError('Failed to send password reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleResetPassword}>
            <div className="flex w-full flex-col justify-center align-middle sm:my-2">
                <Card className="mx-auto max-w-sm flex flex-col justify-center align-middle">
                    <CardHeader>
                        <CardTitle className="text-2xl">Forgot Password</CardTitle>
                        <CardDescription>
                            Enter your email address to receive a password reset link.
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
                            {error && <p className="text-red-500">{error}</p>}
                            {message && <p className="text-green-500">{message}</p>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Remember your password?{" "}
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

export default ForgotPasswordPage;
