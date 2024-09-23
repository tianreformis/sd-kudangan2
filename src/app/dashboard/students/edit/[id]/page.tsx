'use client'
// app/edit/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDocuments, updateDocument } from '@/lib/firebase/crud'; // Adjust import paths as necessary
import { User } from '@/lib/firebase/crud';

interface EditPageProps {
  params: {
    id: string; // Dynamic ID from the URL
  };
}

const EditPage = ({ params }: EditPageProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = params; // Get the ID from the params provided by Next.js

  useEffect(() => {
    const fetchUser = async () => {
collectionName: string, id: string, id: string, id: stringnst fetchedUser = await getDocuments<User>('users', id); // Fetch user by ID
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, [id]); // Fetch data when `id` changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (user) {
      try {
        await updateDocument('users', user.id, user); // Update user in Firestore
        router.push('/read'); // Redirect to the read page after successful update
      } catch (error) {
        console.error('Error updating user:', error);
        setError('Failed to update user data');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={user.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Birthday:</label>
          <input type="date" name="birthday" value={user.birthday} onChange={handleChange} required />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditPage;
