import Navbar from "@/components/navbar";
import Image from "next/image";
import ImageCover from "@/images/photo-1.jpg"
import { CarouselDemo } from "@/components/carousel";
const Home = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            

            <div className="mt-2 sm:mt-0 h-56 flex flex-col sm:flex-row justify-start items-center">
                <div className="text-2xl sm:mt-12 sm:text-4xl text-wrap">
                    SD Kudangan 2 adalah, Sekolah yang membimbing siswa dengan aklak dan moral yang benar berdasarkan <span className="underline font-bold bg-green-200">Profil Pelajar Pancasila.</span>
                </div>
                <div className="my-5 mx-5">
                    <Image className="rounded-sm"
                        src={ImageCover}
                        width={1500}
                        height={200}

                        alt="logo"
                    />
                </div>

            </div>
            
        </div>



    )
}

export default Home;
