// lib/auth.ts
import { auth } from "@/lib/firebase/init";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/lib/firebase/init';

import { createContext, useContext, useEffect, useState,ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';




interface AuthContextType {
    user: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
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

export const register = async (email:string, password:string, address:string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user information in Firestore
    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        address: address, // Store address
        // Add additional user info here
    });
};

export const resetPassword = async (email: string) => {
    const auth = getAuth();
    return await sendPasswordResetEmail(auth, email);
};
