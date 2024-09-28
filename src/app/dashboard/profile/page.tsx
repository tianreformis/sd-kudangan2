// pages/dashboard/profile.tsx
"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/init';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UserProfile = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const userId = auth.currentUser?.uid;

            if (!userId) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                setError("User not found");
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name || 'Not set'}</p>
            <p>Address: {userData.address || 'Not set'}</p>
            {/* Add form or buttons to edit profile here */}
        </div>
    );
};

export default UserProfile;
