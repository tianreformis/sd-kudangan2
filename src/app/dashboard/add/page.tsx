"use client"

// pages/create.tsx
import { useState } from 'react';
import { createDocument } from '@/lib/firebase/crud';
import { User } from '@/lib/firebase/crud';
import { AddStudentsPages } from '@/components/pages/add-data-pages';

export default function CreatePage() {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: User = {
      name, age, address,
      id: ''
    };
    const docId = await createDocument<User>('users', data);
    console.log('Document created with ID:', docId);
  };

  return (
    <div className='w-full flex items-center justify-center align-middle '>
     
      <AddStudentsPages />
    </div>
  );
}
