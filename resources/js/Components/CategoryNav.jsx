import {useEffect, useState} from "react";
import axios from "axios";
import {Link, usePage} from "@inertiajs/react";

const CategoryNav = ({setShowCategories}) => {

    const [categories, setCategories] = useState([]);
    const [showingItemsOptions, setShowingItemsOptions] = useState(['all', 'new', 'popular'])
    const user = usePage().props.auth.user;


    useEffect (() => {
        const getCategories = async () => {
            const apiUrl = `/api/categories`;
            try {
                const res = await axios.get(apiUrl)
                setCategories(res.data.categories)
            } catch (error) {
                console.log('Error fetching category data', error)
            }
        }
        getCategories()

        if (user) {
            setShowingItemsOptions(['all', 'new', 'popular', 'liked', 'purchased']);
        }
    }, [])


    return (
        <div className="p-12">
            <div className='grid grid-cols-8 gap-8 text-sm'>
                {categories.length > 0 && categories.map((category) => (
                    <Link href={route('items', { orderBy: 'all', category: category.id})}
                          onClick={() => setShowCategories(false)}
                          key={category.id}
                          className="font-bold capitalize rounded-lg bg-mm-pink text-mm-dark-brown aspect-square relative">
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            {category.name}
                        </div>
                    </Link>

                ))}
            </div>
            <div className='mt-8 grid grid-cols-8 gap-8 text-sm'>
                {showingItemsOptions.map((option) => (
                    <Link href={route('items', {orderBy: option})}
                          onClick={() => setShowCategories(false)}
                          key={option}
                          className="font-bold capitalize rounded-lg bg-mm-pink text-mm-dark-brown aspect-square relative">
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            {option} items
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryNav

