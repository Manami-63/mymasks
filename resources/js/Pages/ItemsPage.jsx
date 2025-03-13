import {Head, Link, router, usePage} from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout.jsx";
import Items from "@/Components/Items.jsx";
import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import Spinner from "@/Components/Spinner.jsx";

const ItemsPage = ({orderBy, category, categories}) => {

    const user = usePage().props.auth.user;
    const [showingItemsOptions, setShowingItemsOptions] = useState(['all', 'new', 'popular'])
    const [selectedShowingItemsOption, setSelectedShowingItemsOption] = useState(orderBy || 'all');
    const [selectedCategories, setSelectedCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            setShowingItemsOptions(['all', 'new', 'popular', 'liked', 'purchased']);
        }

        if (category) {
            if (category.length > 1) {
                const categoryArray = category.split(',').map(Number);
                setSelectedCategories(categoryArray);
            } else {
                setSelectedCategories([Number(category)]);
            }
        }

        setLoading(false)
    }, [user]);

    const toggleCategory = (categoryId) => {
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((c) => c !== categoryId)
            : [...selectedCategories, categoryId];

        router.get(updatedCategories.length ?
            route("items", {orderBy: selectedShowingItemsOption, category: updatedCategories.toString()}) :
            route("items", {orderBy: selectedShowingItemsOption}), {}, {
            replace: true,
            preserveScroll: true,
        });
    };

    return (
        <PageLayout>

            <Head title="My Masks"/>

            <div className="my-8">
                <div className='flex gap-4 flex-wrap'>
                    {categories.length > 0 && categories.map((category) => (
                        <button key={category.id} onClick={() => toggleCategory(category.id)}
                                className={"px-4 font-bold capitalize text-sm rounded-lg" + (selectedCategories && selectedCategories.includes(category.id) ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className='mt-4 flex gap-4 flex-wrap'>
                    {showingItemsOptions.map((option) => (
                        <Link href={selectedCategories.length ? route('items', {
                            orderBy: option,
                            category: selectedCategories.toString()
                        }) : route('items', {orderBy: option})}
                              key={option}
                              className={"px-4 font-bold capitalize text-sm rounded-lg" + (selectedShowingItemsOption === option ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
                            {option} items
                        </Link>
                    ))}
                </div>

                <div className='mt-4'>
                    <Link href={route('items', {orderBy: 'all'})}
                          className="border-2 border-mm-dark-brown bg-mm-light-pink px-4 font-bold capitalize text-sm rounded-xl">
                        Reset filter
                    </Link>
                </div>

                {loading ? (
                    <Spinner loading={loading}/>
                ) : (
                    <Items order={selectedShowingItemsOption} sort={selectedCategories.toString()}/>

                    // {selectedCategories.length ? (
                    //         <Items order={selectedShowingItemsOption} sort={selectedCategories.toString()}/>
                    //     ) : (
                    //         <Items order={selectedShowingItemsOption}/>
                    //     )}
                )}

            </div>
        </PageLayout>
    )
}

export default ItemsPage

// import { Head, Link, usePage } from "@inertiajs/react";
// import PageLayout from "@/Layouts/PageLayout.jsx";
// import Items from "@/Components/Items.jsx";
// import { useEffect, useState } from "react";
// import { Inertia } from "@inertiajs/inertia";
//
// const ItemsPage = ({ orderBy, categories }) => {
//     const user = usePage().props.auth.user;
//     const [showingItemsOptions, setShowingItemsOptions] = useState(['all', 'new', 'popular']);
//     const [selectedShowingItemsOption, setSelectedShowingItemsOption] = useState(orderBy || 'all');
//     const [selectedCategories, setSelectedCategories] = useState([]);
//
//     useEffect(() => {
//         if (user) {
//             setShowingItemsOptions(['all', 'new', 'popular', 'liked', 'purchased']);
//         }
//     }, [user]);
//
//     const toggleCategory = (categoryId) => {
//         setSelectedCategories((prev) =>
//             prev.includes(categoryId)
//                 ? prev.filter((c) => c !== categoryId)  // Remove if already exists
//                 : [...prev, categoryId]                // Add if not exists
//         );
//     };
//
//     const resetFilter = () => {
//         setSelectedCategories([]);
//         setSelectedShowingItemsOption('all');
//         updateOrderBy('all');
//     };
//
//     const updateOrderBy = (newOrder) => {
//         if (newOrder === selectedShowingItemsOption) return; // Prevent unnecessary navigation
//         setSelectedShowingItemsOption(newOrder);
//         Inertia.visit(route('items', { orderBy: newOrder }), {
//             replace: true,
//             preserveScroll: true,
//         });
//     };
//
//     return (
//         <PageLayout>
//             <Head title="My Masks" />
//
//             <div className="my-8">
//                 <div className='flex gap-4 flex-wrap'>
//                     {categories.map((category) => (
//                         <button key={category.id} onClick={() => toggleCategory(category.id)}
//                                 className={"px-4 font-bold capitalize text-sm rounded-lg" +
//                                     (selectedCategories.includes(category.id) ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
//                             {category.name}
//                         </button>
//                     ))}
//                 </div>
//
//                 <div className='mt-4 flex gap-4 flex-wrap'>
//                     {showingItemsOptions.map((option) => (
//                         <button key={option} onClick={() => updateOrderBy(option)}
//                                 className={"px-4 font-bold capitalize text-sm rounded-lg" +
//                                     (selectedShowingItemsOption === option ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
//                             {option} items
//                         </button>
//                     ))}
//                 </div>
//
//                 <div className='mt-4'>
//                     <button onClick={() => resetFilter()}
//                             className="border-2 border-mm-dark-brown bg-mm-light-pink px-4 font-bold capitalize text-sm rounded-xl">
//                         Reset filter
//                     </button>
//                 </div>
//
//                 {/*<Items order={selectedShowingItemsOption} sort={selectedCategories} />*/}
//             </div>
//         </PageLayout>
//     );
// };
//
// export default ItemsPage;
