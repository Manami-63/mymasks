import {Head, Link} from '@inertiajs/react';
import ListItems from "@/Components/ListItems.jsx";
import PageLayout from "@/Layouts/PageLayout.jsx";
import {FaArrowRight} from "react-icons/fa";

export default function Welcome() {
    return (
        <PageLayout>

            <Head title="Welcome"/>

            <div className="my-8">

                <div className="pt-16 text-center font-bold text-lg text-mm-brown">
                    Join us! <Link href={route('login')} className="hover:text-mm-dark-brown">Log in</Link> or <Link
                    href={route('register')} className="hover:text-mm-dark-brown">sign up</Link> to enjoy full access!
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="new items" order="date"/>
                    <Link href={route('items', {orderBy: 'new'})} className="mt-2 flex justify-end items-center">
                        <div className="font-bold">
                            view more new items
                        </div>
                        <FaArrowRight className="ml-2"/>
                    </Link>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="popular items" order="popularity"/>
                    <Link href={route('items', {orderBy: 'popular'})} className="mt-2 flex justify-end items-center">
                        <div className="font-bold">
                            view more popular items
                        </div>
                        <FaArrowRight className="ml-2"/>
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
