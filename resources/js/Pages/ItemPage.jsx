import PageLayout from "@/Layouts/PageLayout.jsx";
import {Head} from "@inertiajs/react";
import ItemDetails from "@/Components/ItemDetails.jsx";

const ItemPage = ({itemId, itemName}) => {

    return (
        <>
            <Head title={itemName}/>

            <ItemDetails itemId={itemId} />
        </>
    )
}

ItemPage.layout = (page) => {
    return <PageLayout children={page} />
}

export default ItemPage

