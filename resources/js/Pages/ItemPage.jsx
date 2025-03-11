import PageLayout from "@/Layouts/PageLayout.jsx";
import {Head} from "@inertiajs/react";
import ItemDetails from "@/Components/ItemDetails.jsx";

const ItemPage = ({itemId, itemName}) => {

    return (
        <PageLayout>

            <Head title={itemName}/>

            <ItemDetails itemId={itemId} />
        </PageLayout>
    )
}

export default ItemPage

