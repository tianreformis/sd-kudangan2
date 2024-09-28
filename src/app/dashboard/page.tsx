"use client"

// pages/read.tsx
import { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Assuming you're using Firebase
import { DashboardCommonView } from '@/components/views/dashboard/dashboard';
import { Mail, LogOut } from "lucide-react"; // Import icons as needed
import { useRouter } from 'next/navigation'; // For navigation
import Link from 'next/link';

export default function DashboardCommonPage() {   
    const [user, setUser] = useState<{ email: string | null } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({ email: currentUser.email });
            } else {
                setUser(null);
                router.push('/login'); // Redirect to login if not authenticated
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        router.push("/login"); // Redirect to login after logout
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4 border-b">
                <h1 className="text-xl font-bold">Dashboard</h1>
                {user && (
                    <div className="flex items-center">
                        <Mail className="mr-2 h-5 w-5" />
                        <Link href="/dashboard/edit" className='hover:underline'>
                        <span>{user.email}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="ml-4 flex items-center text-red-600"
                        >
                            <LogOut className="h-5 w-5 mr-1" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
            <DashboardCommonView />
        </div>
    );
}
