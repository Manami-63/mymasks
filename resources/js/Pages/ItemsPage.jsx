// noinspection JSUnresolvedReference,JSUnusedLocalSymbols

import {Head, Link, router, usePage} from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout.jsx";
import Items from "@/Components/Items.jsx";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";

const ItemsPage = ({orderBy, category, categories}) => {

    const [loading, setLoading] = useState(true)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedShowingItemsOption, setSelectedShowingItemsOption] = useState(orderBy || 'all');
    const [showingItemsOptions, setShowingItemsOptions] = useState(['all', 'new', 'popular'])
    const user = usePage().props.auth.user;


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
        <>

            <Head title="My Masks"/>

            <div className="mt-12 sm:mt-20">
                <div className='flex gap-2 sm:gap-4 flex-wrap'>
                    {categories.length > 0 && categories.map((category) => (
                        <button key={category.id} onClick={() => toggleCategory(category.id)}
                                className={"px-2 sm:px-4 font-bold capitalize text-sm rounded-lg" + (selectedCategories && selectedCategories.includes(category.id) ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className='mt-4 flex gap-2 sm:gap-4 flex-wrap'>
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
                )}

            </div>
        </>
    )
}

ItemsPage.layout = (page) => {
    return <PageLayout children={page} />
}

export default ItemsPage
