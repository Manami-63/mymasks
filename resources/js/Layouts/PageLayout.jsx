import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import {Link, usePage} from '@inertiajs/react';
import {BiSolidCategory} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";


export default function PageLayout({header = null, children}) {
    const user = usePage().props.auth.user;

    return (

        <div className="relative flex min-h-screen items-center justify-center flex-col">

            <div className="w-full fixed top-0 shadow-xl shadow-mm-pink py-2 z-50 bg-mm-light-pink-opacity">
                <div className="px-6 sm:max-w-5xl grid grid-cols-3 items-center mx-auto">
                    <div>
                        <BiSolidCategory className="text-3xl"/>
                    </div>
                    <div className="flex justify-center">
                        <Link href={route('top')}>
                            <ApplicationLogo className="h-12 w-auto sm:h-14"></ApplicationLogo>
                        </Link>
                    </div>
                    <div className="hidden sm:ms-6 sm:flex sm:items-center justify-end items-center">
                        {/*ToDo Add cart symbol and show if cart is not empty*/}
                        <div className="relative ms-3">
                            {user ? (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button type="button" className="">
                                            <FaRegUser className="text-xl"/>
                                        </button>
                                    </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) : (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button type="button" className="">
                                            <FaRegUser className="text-xl"/>
                                        </button>
                                    </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('login')}>
                                            Log in
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('register')}>
                                            Register
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <main className={"absolute top-20 w-full max-w-2xl px-6 lg:max-w-5xl"}>
                {children}
            </main>
        </div>
    );
}
