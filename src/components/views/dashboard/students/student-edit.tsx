'use client'
// app/edit/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@/lib/firebase/crud-students';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



interface EditPageProps {
  params: {
    id: string; // Dynamic ID from the URL
  };
}

const EditStudentView = ({ params }: EditPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    age: 0,
    address: "",
    email: "",

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
            email: userData.email,

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
        email: formValues.email,
      });
      // alert("User updated successfully!");     
      router.push("/dashboard/students"); // Navigate back to the user list page

    } catch (error) {
      console.error("Error updating user:", error);

      alert("Failed to update user.");
    }
  };
  const backToDashboard = () => {
    router.push('/dashboard/students');
  }


  let [color, setColor] = useState("#ffffff");
  if (loading) return
    <div>Loading...!</div>
      ;

  return (
    <div className='flex flex-row justify-center align-middle'>
      {user &&
        (
          <Card className="w-[350px] sm:w-5/6">
            <CardHeader>
              <CardTitle>Edit Siswa </CardTitle>
              <CardDescription>Mengedit bagian data siswa sesuai dengan yang dibutuhkan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input type="text"
                      id="name"
                      name='name'
                      placeholder="Masukkan Nama"
                      value={formValues.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Alamat Lengkap</Label>
                    <Input type="text"
                      id="address"
                      name='address'
                      placeholder="Masukkan Alamat"
                      value={formValues.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input type="email"
                      id="email"
                      name='email'
                      placeholder="Masukkan Email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Umur</Label>
                    <Input type="text"
                      id="age"
                      name='age'
                      placeholder="Masukkan Umur"
                      value={formValues.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                </div>
                <CardFooter className="flex my-4 gap-2">
                  <Button variant="outline" onClick={backToDashboard} type='button'>Batal</Button>
                  <Button type='submit'

                  >

                    Simpan</Button>
                </CardFooter>

              </form>
            </CardContent>
          </Card>
        )
      }

    </div>
  );
};

export default EditStudentView;
