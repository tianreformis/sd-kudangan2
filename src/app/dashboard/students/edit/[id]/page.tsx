"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { db } from "@/lib/firebase/init"; // Assuming you have your Firebase initialized in lib/firebase

// TypeScript interface for user
interface User {
  id: string;
  name: string;
  age: number;
  address: string;
  birthday: string; // added birthday field
}

const EditUserPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    age: 0,
    address: "",
    
  });

  // Fetch the user data from Firestore
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        console.log("Fetching user from Firestore with ID:", userId);
    const userDoc = await getDoc(doc(db, "users", userId));
    console.log("User document fetched:", userDoc);
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          setFormValues({
            name: userData.name,
            age: userData.age,
            address: userData.address,
            
          });
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for updating the user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        name: formValues.name,
        age: formValues.age,
        address: formValues.address,
        
      });
      alert("User updated successfully!");
      router.push("/read"); // Navigate back to the user list page
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Edit User | SD Kudangan 2</title>
      </Head>

      <div>
        <h1>Edit User</h1>
        {user && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formValues.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button type="submit">Update User</button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditUserPage;
