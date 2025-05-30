import {Head, Link, usePage} from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout.jsx";
import Items from "@/Components/Items.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const ItemsPage = ({orderBy, sortBy}) => {

    const user = usePage().props.auth.user;
    const [categories, setCategories] = useState([])
    const [showingItemsOptions, setShowingItemsOptions] = useState(['all', 'new', 'popular'])
    const [selectedShowingItemsOption, setSelectedShowingItemsOption] = useState('all')
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const apiUrl = '/api/categories'
            try {
                const res = await axios.get(apiUrl)
                setCategories(res.data.categories)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        if (user) {
            setShowingItemsOptions(['all', 'new', 'popular', 'liked', 'purchased'])
        }
        if (orderBy) {
            setSelectedShowingItemsOption(orderBy)
        }
        if (sortBy) {
            toggleCategory(sortBy)
        }

        getCategories()
    }, []);

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)  // Remove if already exists
                : [...prev, category]                // Add if not exists
        );
    };

    return (
        <PageLayout>

            <Head title="Dashboard"/>

            <div className="my-8">
                <div className='flex gap-4 flex-wrap'>
                    {categories.length > 0 && categories.map((category) => (
                        <button key={category.id} onClick={() => toggleCategory(category)}
                             className={"px-4 font-bold capitalize text-sm rounded-lg" + (selectedCategories.includes(category) ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className=' mt-4 flex gap-4 flex-wrap'>
                    {showingItemsOptions.map((option) => (
                        <Link href={route('items', {orderBy: option})} key={option}
                              className={"px-4 font-bold capitalize text-sm rounded-lg" + (selectedShowingItemsOption === option ? ' bg-mm-dark-brown text-mm-cream' : ' bg-mm-pink ')}>
                            {option} items
                        </Link>
                    ))}
                </div>

                <Items order={orderBy} sort={sortBy}/>
            </div>
        </PageLayout>
    )
}

export default ItemsPage
