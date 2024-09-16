const Navbar = () => {
    return (
        <div className="flex flex-col  sm:flex-row py-2 px-2 bg-white-300 justify-start md:justify-between items-center">
                <a className="text-2xl text-blue-700 hover:text-blue-600 font-bold" href="/">
                    SD Kudangan 2
                </a>
                <ul className="flex flex-row cursor-pointer">
                    <li>
                        <a className="text-black hover:text-blue-600 font-bold mx-1 pointer">
                            Tentang
                        </a>
                    </li>
                    <li>
                        <a className="text-black hover:text-blue-600 font-bold mx-1 pointer">
                            Tentang
                        </a>
                    </li>
                    <li>
                        <a className="text-white hover:text-blue-600 font-bold bg-green-300 px-5 py-2 rounded-lg mx-1" href="/login">Login</a>
                    </li>
                </ul>
            </div>
    )
}

export default Navbar;