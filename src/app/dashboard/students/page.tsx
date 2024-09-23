"use client"

// pages/read.tsx
import { DashboardStudents } from '@/components/views/dashboard/students/dashboard';
import { useRouter } from 'next/router';

// eslint-disable-next-line @next/next/no-async-client-component
export default  function DashboardStudentsPage() {  

    return  (
        <div>
            <DashboardStudents />
        </div>
    );
}
