import {Head, Link} from '@inertiajs/react';
import ListItems from "@/Components/ListItems.jsx";
import PageLayout from "@/Layouts/PageLayout.jsx";
import {FaArrowRight} from "react-icons/fa";

export default function Welcome() {
    return (
        <>

            <Head title="Welcome"/>

            <div className="my-8">

                <div className="pt-16 text-center font-bold text-lg text-mm-brown">
                    Join us!<br/>
                    <Link href={route('login')} className="hover:text-mm-dark-brown">Log
                    in</Link> or <Link
                    href={route('register')} className="hover:text-mm-dark-brown">sign up</Link> to enjoy full access!
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="new items" order="new" viewMoreItemsLink="new"/>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="popular items" order="popular" viewMoreItemsLink="popular"/>
                </div>
            </div>
        </>
    );
}

Welcome.layout = (page) => {
    return <PageLayout children={page} />
}

