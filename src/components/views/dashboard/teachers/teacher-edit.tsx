'use client'
// app/edit/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Teachers } from '@/lib/firebase/crud-teacher';
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

import ClipLoader from "react-spinners/ClipLoader";

interface EditPageProps {
  params: {
    id: string; // Dynamic ID from the URL
  };
}

const EditTeacherView = ({ params }: EditPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("id");

  const [teacher, setTeachers] = useState<Teachers | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    address: "",
    email: "",

  });

  // Fetch the user data from Firestore
  useEffect(() => {
    if (!teacherId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        console.log("Fetching user from Firestore with ID:", teacherId);
        const teacherDoc = await getDoc(doc(db, "teachers", teacherId));
        console.log("User document fetched:", teacherDoc);
        if (teacherDoc.exists()) {
          const teacherData = teacherDoc.data() as Teachers;
          setTeachers(teacherData);
          setFormValues({
            name: teacherData.name,
            role: teacherData.role,
            address: teacherData.address,
            email: teacherData.email,

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
  }, [teacherId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement |HTMLSelectElement >) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for updating the user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId) return;

    try {
      const userRef = doc(db, "teachers", teacherId);
      await updateDoc(userRef, {
        name: formValues.name,
        role: formValues.role,
        address: formValues.address,
        email: formValues.email,
      });
      // alert("User updated successfully!");     
      router.push("/dashboard/teachers"); // Navigate back to the user list page

    } catch (error) {
      console.error("Error updating Teachers:", error);

      alert("Failed to update user.");
    }
  };
  const backToDashboard = () => {
    router.push('/dashboard/teachers');
  }


  let [color, setColor] = useState("#ffffff");
  if (loading) return
  <ClipLoader
    color={color}
    loading={loading}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
    ;

  return (
    <div className='flex flex-row justify-center align-middle'>
      {teacher &&
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
                    <Label htmlFor="name">Role</Label> 

                    <select
                      id="role"
                      name='role'
                      value={formValues.role}
                      onChange={handleInputChange}
                      required
                      className="input"
                    >
                       <option value="principal" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Kepala Sekolah</span>
                                </option>
                                <option value="vice-principal" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Wakil Kepala Sekolah</span>
                                </option>
                                
                                <option value="homeroom-teacher" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Wali Kelas</span>
                                </option>
                                <option value="teacher" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Guru</span>
                                </option>

                                <option value="admin" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Admin</span>
                                </option>
                                
                                <option value="techinicial" className='text-foreground px-2 mx-2'>
                                    <span className='px-2 mx-3'>Teknisi</span>
                                </option>
                    </select>
                  </div>
                 


                </div>
                <CardFooter className="flex my-4 gap-2">
                  <Button variant="outline" onClick={backToDashboard} type='button'>Batal</Button>
                  <Button type='submit'>

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

export default EditTeacherView;
