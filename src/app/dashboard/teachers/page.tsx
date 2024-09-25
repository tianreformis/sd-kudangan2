"use client"

// pages/read.tsx
import { DashboardTeachers } from '@/components/views/dashboard/teachers/teacher-dashboard';

// eslint-disable-next-line @next/next/no-async-client-component
export default  function DashboardTeachersPage() {  

    return  (
        <div>
            <DashboardTeachers />
        </div>
    );
}
