import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Teachers } from '@/lib/firebase/crud-teacher';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from '@/lib/firebase/init';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EditTeacherView = ({ params }: { params: { id: string } }) => {
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
    image: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // To handle the image upload

  useEffect(() => {
    if (!teacherId) return;

    const fetchTeacher = async () => {
      setLoading(true);
      const teacherDoc = await getDoc(doc(db, "teachers", teacherId));
      if (teacherDoc.exists()) {
        const teacherData = teacherDoc.data() as Teachers;
        setTeachers(teacherData);
        setFormValues({
          name: teacherData.name,
          role: teacherData.role,
          address: teacherData.address,
          email: teacherData.email,
          image: teacherData.image || ""
        });
      }
      setLoading(false);
    };

    fetchTeacher();
  }, [teacherId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'image' && files) {
      setImageFile(files[0]);
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId) return;

    try {
      let imageUrl = formValues.image;

      if (imageFile) {
        const imageRef = ref(storage, `teachers/${teacherId}/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const teacherRef = doc(db, "teachers", teacherId);
      await updateDoc(teacherRef, {
        name: formValues.name,
        role: formValues.role,
        address: formValues.address,
        email: formValues.email,
        image: imageUrl,
      });

      router.push("/dashboard/teachers");
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-row justify-center align-middle">
      {teacher && (
        <Card className="w-[350px] sm:w-5/6">
          <CardHeader>
            <CardTitle>Edit Teacher</CardTitle>
            <CardDescription>Edit the details of the teacher.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formValues.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formValues.role}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="principal">Principal</option>
                    <option value="vice-principal">Vice Principal</option>
                    <option value="homeroom-teacher">Homeroom Teacher</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                    <option value="technician">Technician</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Upload New Image</Label>
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <CardFooter className="flex my-4 gap-2">
                <Button variant="outline" onClick={() => router.push('/dashboard/teachers')} type="button">Cancel</Button>
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditTeacherView;
