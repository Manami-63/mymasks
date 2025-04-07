import {LiaStarSolid} from "react-icons/lia";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";
import Item from "@/Components/Item.jsx";
import axios from "axios";
import {FaArrowRight} from "react-icons/fa";
import {Link} from "@inertiajs/react";
const ListItems = ({isTop = false, title = null, order = null, viewMoreItemsLink = null}) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getItems = async () => {
            const itemLimit = isTop ? 'limit=4' : ''
            let itemOrder = ''

            if (order !== null) {
                itemOrder = 'orderBy=' + order
            }

            let symbol1 = isTop || order ? '?' : ''

            let symbol2 = isTop && order ? '&' : ''

            const apiUrl = '/api/items' + symbol1 + itemLimit + symbol2 + itemOrder
            try {
                const res = await axios.get(apiUrl)
                setItems(res.data.items)
            } catch (error) {
                console.log('Error fetching data', error)
            } finally {
                setLoading(false)
            }
        }
        getItems()
    }, [])


    return (
        <div>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                <div>
                    {(items.length) > 0 && (
                        <div>
                            <div>
                                {title &&
                                    <div className="flex">
                                        <div className="flex justify-items-start">
                                            <LiaStarSolid className='text-mm-pink text-base mb-4'/>
                                            <LiaStarSolid className='text-mm-pink text-lg mb-4'/>
                                            <LiaStarSolid className='text-mm-pink text-xl mb-4'/>
                                            <div className="uppercase text-lg sm:text-xl font-bold px-2">
                                                {title}
                                            </div>
                                            <LiaStarSolid className='text-mm-pink text-xl mb-4'/>
                                            <LiaStarSolid className='text-mm-pink text-lg mb-4'/>
                                            <LiaStarSolid className='text-mm-pink text-base mb-4'/>
                                        </div>
                                    </div>
                                }

                                <div className="mt-4">
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12'>
                                        {items.map((item) => (
                                            <Item key={item.id} item={item}/>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {viewMoreItemsLink !== null && (
                                <Link href={route('items', {orderBy: viewMoreItemsLink})}
                                      className="mt-2 flex justify-end items-center">
                                    <div className="font-bold">
                                        view more items
                                    </div>
                                    <FaArrowRight className="ml-2"/>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ListItems
