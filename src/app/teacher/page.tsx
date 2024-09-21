import Image from "next/image";
import avatar from "@/images/photo-1.jpg"
const TeacherPage= () => {
    return (
        <div>Guru Guru
            <div className="">
                <Image className="object-scale-down w-100 h-100"
                src={avatar}
                alt="logo"
             
                />
            </div>
            
        </div>
    )
}

export default TeacherPage;