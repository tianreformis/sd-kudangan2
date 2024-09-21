"use client"

// pages/read.tsx
import { useEffect, useState } from 'react';
import { getDocuments } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';
import { Dashboard } from '@/components/dashboard';

// eslint-disable-next-line @next/next/no-async-client-component
export default  function ReadPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getDocuments<User>('users');
            setUsers(data);
        }
        fetchData();
    }, []);

    return  (
        <div>
            <Dashboard />
        </div>
    );
}
