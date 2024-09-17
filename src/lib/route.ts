'use client'
import { useRouter } from 'next/navigation'

function Routing({

}) {
    const router = useRouter();
    const HomeRoute = () => {
        router.push('/');
    };
    const LoginRoute = () => {
        router.push('/login');
    };

    const SignUpRoute = () => {
        router.push('/signuplogin');
    };
}

const HomeRoute = () =>{
    const router = useRouter();
    router.push('/');
}

export default Routing;