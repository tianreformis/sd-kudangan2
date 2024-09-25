'use client'
// app/edit/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDocuments, updateDocument } from '@/lib/firebase/crud-students'; // Adjust import paths as necessary
import { User } from '@/lib/firebase/crud-students';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from 'next/document';
import EditStudentView from '@/components/views/dashboard/students/student-edit';
import EditTeacherView from '@/components/views/dashboard/teachers/teacher-edit';

interface EditPageProps {
  params: {
    id: string; // Dynamic ID from the URL
  };
}

const EditPage = ({ params }: EditPageProps) => {
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
    <div>


      <div>
       
          <EditTeacherView params={{
            id: "",
          }} />
        


        {/* {user && (
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
        )} */}
      </div>
    </div>
  );
};

export default EditPage;
