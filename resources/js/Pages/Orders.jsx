import PageLayout from "@/Layouts/PageLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";
import moment from "moment";
import {CiImageOff} from "react-icons/ci";
import {MdOutlineRateReview} from "react-icons/md";
import {IoIosCheckmarkCircle} from "react-icons/io";

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const appUrl = import.meta.env.VITE_APP_URL

    useEffect(() => {
        const getOrders = async () => {
            const apiUrl = `/api/orders`

            try {
                const res = await axios.get(apiUrl)
                setOrders(res.data.orders)

            } catch (error) {
                console.log('Error fetching cart data', error)
            }
        }
        getOrders().then(() =>
            setLoading(false)
        )
    }, [])

    const totalPrice = (items) => {
        if (items.length > 1) {
            return items.reduce(function (a, b) {
                return a + (b.price * b.quantity)
            }, 0)
        } else {
            return items[0].price * items[0].quantity
        }
    }

    return (

        <div>

            <Head title="Orders"/>

            <div>
                {loading ? (
                    <div>
                        <Spinner loading={loading}/>
                    </div>
                ) : (
                    <div>
                        {(orders && orders.length > 0) ? (
                            <div>
                                {orders.map((order) => (
                                    <div className="py-4 border-b-2 border-mm-brown grid grid-cols-4 gap-4"
                                         key={order.id}>
                                        <div className="">
                                            <div>
                                                {moment(order.created_at).format('MMMM Do YYYY, h:mm a')}
                                            </div>
                                            <div className="text-sm">
                                                Order #{order.id}
                                            </div>
                                            <div className="mt-8">
                                                {order.order_items.length} items
                                            </div>
                                            <div className="font-bold">
                                                Total: ${totalPrice(order.order_items)}
                                            </div>
                                            {order.status === 'done' && (
                                                <IoIosCheckmarkCircle className="text-2xl text-green-300"/>
                                            )}

                                        </div>
                                        <div className="col-span-3">
                                            {order.order_items.map((orderItem) => (
                                                <div
                                                    className="p-2 border-b border-mm-brown grid grid-cols-4 gap-12 text-sm"
                                                    key={orderItem.id}>
                                                    {orderItem.item.image ? (
                                                        <div className="w-2/3 mx-auto aspect-square">
                                                            <div className="bg-center bg-cover bg-no-repeat h-full"
                                                                 style={{backgroundImage: `url(${appUrl + '/storage/images/' + orderItem.item.image})`}}>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="w-2/3 mx-auto aspect-square bg-mm-cream grid place-items-center">
                                                            <CiImageOff className="text-8xl"/>
                                                        </div>
                                                    )}
                                                    <div className="col-span-2">
                                                        <div className="text-base font-bold">
                                                            {orderItem.item.name}
                                                        </div>
                                                        <div>
                                                            {orderItem.item.brand.name}
                                                        </div>
                                                        <div className="font-bold mt-4">
                                                            ${orderItem.item.price} per pack
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-end text-right">
                                                        <div className="text-sm">
                                                            Quantity: {orderItem.quantity}
                                                        </div>
                                                        <div className="font-bold">
                                                            Total: ${orderItem.quantity * orderItem.item.price}
                                                        </div>
                                                        <div className="flex justify-end">
                                                            {orderItem.order_item_feedback !== null ? (
                                                                <IoIosCheckmarkCircle
                                                                    className="text-2xl text-green-300"/>
                                                            ) : (
                                                                <MdOutlineRateReview className="text-2xl text-red-300"/>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.status === 'delivered' && (
                                                <div className="text-xs text-red-300 font-bold text-right pt-2">
                                                    Order Delivered, please write feedbacks!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                No orders yet
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

Orders.layout = (page) => {
    return <PageLayout children={page}/>
}


export default Orders
