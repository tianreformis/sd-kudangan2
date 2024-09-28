// lib/auth.ts
import { auth } from "@/lib/firebase/init";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/lib/firebase/init';

// Function to handle password reset


export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error("Failed to login");
    }
};

export const logout = async () => {
    await signOut(auth);
};

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Register function

export const register = async (email: string, password: string) => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user information in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
        // Add any additional fields you want to store
    });

    return user; // Return the user object if needed
};

export const resetPassword = async (email: string) => {
    const auth = getAuth();
    return await sendPasswordResetEmail(auth, email);
};
