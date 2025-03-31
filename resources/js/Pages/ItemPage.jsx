import PageLayout from "@/Layouts/PageLayout.jsx";
import {Head} from "@inertiajs/react";
import ItemDetails from "@/Components/ItemDetails.jsx";
import ItemFeedBacks from "@/Components/ItemFeedBacks.jsx";

const ItemPage = ({item, itemName}) => {

    return (
        <>
            <Head title={itemName}/>

            <ItemDetails itemId={item.id} />

            <ItemFeedBacks item={item} />
        </>
    )
}

ItemPage.layout = (page) => {
    return <PageLayout children={page} />
}

export default ItemPage

