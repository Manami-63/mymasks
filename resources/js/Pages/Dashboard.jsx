import {Head, Link} from '@inertiajs/react';
import ListItems from "@/Components/ListItems.jsx";
import PageLayout from "@/Layouts/PageLayout.jsx";
import {FaArrowRight} from "react-icons/fa";

const Dashboard = () => {
    return (
        <div>

            <Head title="Dashboard"/>

            <div className="my-8">
                <div className="py-8">
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

                {/*<div className="py-16">*/}
                {/*    <ListItems isTop="true" title="order again" order="purchased"/>*/}
                {/*</div>*/}

                <div className="py-16">
                    <ListItems isTop="true" title="liked items" order="liked"/>
                    <Link href={route('items', {orderBy: 'liked'})} className="mt-2 flex justify-end items-center">
                        <div className="font-bold">
                            view more liked items
                        </div>
                        <FaArrowRight className="ml-2"/>
                    </Link>
                </div>

                {/*ToDo Add comment please list*/}
            </div>
        </div>
    );
}

Dashboard.layout = (page) => {
    return <PageLayout children={page} />
}

export default Dashboard

