'use client'
import { useRouter } from 'next/navigation'

class Rute{
    router = useRouter();

    HomeRoute = () => {
        this.router.push('/');
    }
}
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


export default Routing;