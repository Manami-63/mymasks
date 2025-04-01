import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import {Link, usePage} from '@inertiajs/react';
import {BiSolidCategory} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import {FaShoppingCart} from "react-icons/fa";
import {useState} from "react";
import {Transition} from "@headlessui/react";
import CategoryNav from "@/Components/CategoryNav.jsx";
import {Badge} from "@material-tailwind/react";
import Cart from "@/Components/Cart.jsx";

export default function PageLayout({children}) {

    const [showCart, setShowCart] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const user = usePage().props.auth.user;
    const userHasCart = usePage().props.auth.user_has_cart


    return (

        <div className="relative flex min-h-screen items-center justify-center flex-col">

            <div className="w-full fixed top-0 shadow-xl shadow-mm-pink py-2 z-50 bg-mm-light-pink-opacity">
                <div className="px-6 sm:max-w-5xl mx-auto relative">
                    <div className=" grid grid-cols-3 items-center">
                        <div className="hidden sm:flex sm:items-center justify-start items-center">
                            <button type="button" className=""
                                    onClick={() => [setShowCategories(prev => !prev), setShowCart(false)]}>
                                    <BiSolidCategory className="text-3xl inline-block"/>
                                </button>
                        </div>
                        <div className="flex justify-center">
                            <Link href={route('top')}>
                                <ApplicationLogo className="h-12 w-auto sm:h-14"></ApplicationLogo>
                            </Link>
                        </div>
                        <div className="hidden sm:ms-6 sm:flex justify-end items-start">

                            {user && (
                                <div>
                                    {userHasCart ? (
                                        <Badge color="red">
                                            <button
                                                onClick={() => [setShowCart(prev => !prev), setShowCategories(false)]}>
                                                <FaShoppingCart
                                                    className={"text-2xl " + (!user && 'cursor-not-allowed')}/>
                                            </button>
                                        </Badge>
                                    ) : (
                                        <button onClick={() => [setShowCart(prev => !prev), setShowCategories(false)]}>
                                            <FaShoppingCart className={"text-2xl " + (!user && 'cursor-not-allowed')}/>
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="ms-4">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button type="button" className=""
                                                    onClick={() => [setShowCategories(false), setShowCart(false)]}>
                                                <FaRegUser className="text-xl inline-block"/>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('orders')}>
                                                Orders
                                            </Dropdown.Link>
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
                                            <button type="button" className="" onClick={() => [setShowCategories(false), setShowCart(false)]}>
                                                <FaRegUser className="text-xl inline-block"/>
                                            </button>
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

                    <Transition
                        show={showCategories}
                        enter="transition ease-out duration-500"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-500"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='absolute z-30 mt-2 rounded-md shadow-lg w-full ltr:origin-top-left rtl:origin-top-right start-0'
                            onClick={() => setShowCategories(false)}>
                            <div className='rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-mm-white-opacity'>
                                <CategoryNav setShowCategories={setShowCategories}/>
                            </div>
                        </div>
                    </Transition>

                    <Transition
                        show={showCart}
                        enter="transition ease-out duration-500"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-500"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='absolute z-30 mt-2 rounded-md shadow-lg w-full ltr:origin-top-left rtl:origin-top-right start-0'>
                            <div className='rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-mm-cream'>
                                <Cart setShowCart={setShowCart}/>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <main className="absolute top-20 w-full max-w-2xl px-6 lg:max-w-5xl" id="myapp" >
                {children}
            </main>
        </div>
    );
}
