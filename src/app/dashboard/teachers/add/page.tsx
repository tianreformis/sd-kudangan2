"use client"

// pages/create.tsx
import { AddStudentsViews } from '@/components/views/dashboard/students/student-add';
import { AddTeacherViews } from '@/components/views/dashboard/teachers/teacher-add';
export default function CreatePage() {
  return (
    <div className='w-full flex items-center justify-center align-middle '>     
      <AddTeacherViews />
    </div>
  );
}
