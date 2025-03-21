import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner.jsx";
import Item from "@/Components/Item.jsx";
import Paginator from "@/Components/Paginator.jsx";

const Items = ({order, sort}) => {

    const [items, setItems] = useState([])
    const [currentItems, setCurrentItems] = useState([])
    const [loading, setLoading] = useState(true)
    let itemsPerPage = 12

    useEffect(() => {
        const fetchItems = async () => {
            let itemOrder = ''

            if (order !== null) {
                itemOrder = '?orderBy=' + order
            }

            const apiUrl = '/api/items' + itemOrder
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

    const updateCurrentItems = (receivedItems) => {
        setCurrentItems(receivedItems)
    }

    return (
        <div>
            <div className="pt-16">
                {loading ? (
                    <Spinner loading={loading}/>
                ) : (
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                            {currentItems && currentItems.map((item) => (
                                <Item key={item.id} item={item}/>
                            ))}
                        </div>
                        <div>
                            <Paginator items={items} itemsPerPage={itemsPerPage} passCurrentItems={updateCurrentItems}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Items
