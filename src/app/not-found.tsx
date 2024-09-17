'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Error404Page = () => {
    const router = useRouter();
    const homeRouting = () => {
        router.push('/')
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col justify-center align-middle items-center"> 
            <Card className="w-full max-w-sm h-full ">
                <CardHeader>
                    <CardTitle className="text-2xl">Halaman tidak ditemukan</CardTitle>
                    <CardDescription>
                        Periksa kembali, atau hubungi administrator sekolah.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" onClick={homeRouting}>Kembali ke Halaman Awal </Button>
                </CardFooter>
            </Card>
        </div>

    )
}


export default Error404Page;