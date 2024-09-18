import Image from "next/image";
import avatar from "@/images/photo-1.jpg"
const TeacherPage= () => {
    return (
        <div>Guru Guru
            <div className="h-95 w-95">
                <Image className=""
                               
                src={avatar}
                alt="logo"
             
                />
            </div>
            
        </div>
    )
}

export default TeacherPage;                  