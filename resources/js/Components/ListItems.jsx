import {LiaStarSolid} from "react-icons/lia";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";
import Item from "@/Components/Item.jsx";
import axios from "axios";

const ListItems = ({isTop = false, title = null, order = null}) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const itemLimit = isTop ? 'limit=3' : ''
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
        fetchItems()
    }, [])

    return (
        <div>
            {title &&
                <div className="flex">
                    <div className="flex justify-items-start">
                        <LiaStarSolid className='text-yellow-400 text-base mb-4'/>
                        <LiaStarSolid className='text-yellow-400 text-lg mb-4'/>
                        <LiaStarSolid className='text-yellow-400 text-xl mb-4'/>
                        <div className="uppercase text-xl font-bold px-2">
                            {title}
                        </div>
                        <LiaStarSolid className='text-yellow-400 text-xl mb-4'/>
                        <LiaStarSolid className='text-yellow-400 text-lg mb-4'/>
                        <LiaStarSolid className='text-yellow-400 text-base mb-4'/>
                    </div>
                </div>
            }

            <div className="mt-4">
                {loading ? (
                    <Spinner loading={loading}/>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                        {items.map((item) => (
                                <Item key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListItems
