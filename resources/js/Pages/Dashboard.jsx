import {Head} from '@inertiajs/react';
import ListItems from "@/Components/ListItems.jsx";
import PageLayout from "@/Layouts/PageLayout.jsx";

const Dashboard = () => {
    return (
        <div>

            <Head title="Dashboard"/>

            <div className="my-8">
                <div className="py-8">
                    <ListItems isTop="true" title="new items" order="new" viewMoreItemsLink="new"/>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="popular items" order="popular" viewMoreItemsLink="popular"/>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="liked items" order="liked" viewMoreItemsLink="liked"/>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="order again" order="purchased" viewMoreItemsLink="purchased"/>
                </div>

                <div className="pt-16">
                    <ListItems isTop="true" title="waiting for your feedback" order="feedback" viewMoreItemsLink="feedback"/>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => {
    return <PageLayout children={page}/>
}

export default Dashboard

