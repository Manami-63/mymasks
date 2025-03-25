import {useEffect, useState} from "react";
import axios from "axios";
import {CiImageOff} from "react-icons/ci";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Spinner from "@/Components/Spinner.jsx";
import {useReward} from 'react-rewards';

const Cart = () => {

    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [sending, setSending] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const appUrl = import.meta.env.VITE_APP_URL
    const {reward} = useReward('rewardId', 'confetti')

    useEffect(() => {
        const getCartItems = async () => {
            const apiUrl = `/api/cart-items`;
            try {
                const res = await axios.get(apiUrl)

                const originalCartItems = res.data.cartItems

                const groupedItems = Object.values(
                    originalCartItems.reduce((acc, cartItem) => {
                        if (!acc[cartItem.item_id]) {
                            acc[cartItem.item_id] = {...cartItem}; // Copy the object
                        } else {
                            acc[cartItem.item_id].quantity += cartItem.quantity; // Sum up quantity
                        }
                        return acc;
                    }, {})
                );
                setCartItems(groupedItems)

            } catch (error) {
                console.log('Error fetching cart data', error)
            }
        }
        getCartItems()
    }, [])

    useEffect(() => {
        if (cartItems.length > 0) {
            const priceAndQuantity = cartItems.map((cartItem) => (cartItem.item.price * cartItem.quantity))
            const total = priceAndQuantity.reduce((acc, curr) => acc + curr)

            setTotalPrice(total)
        }
    }, [cartItems])

    const startOrdering = () => {
        setSending(true)
        sendOrder()
    }

    const sendOrder = async () => {
        const apiUrl = `/api/orders`

        try {
            const res = await axios.post(apiUrl)
            if (res.data.responseCode === 200) {
                let createdOrder = res.data.order

                cartItems.map((cartItem, i, num) => {

                    sendOrderItems(createdOrder.id, cartItem)

                    if (i + 1 === num.length) {
                        updateOrderStatus(createdOrder.id)
                    }
                })
            }
        } catch (error) {
            console.log('Error saving cart item data', error)
        }
    }

    const sendOrderItems = async (orderId, cartItem) => {
        const apiUrl = `/api/order-items`

        if (cartItem.quantity > 0) {
            try {
                const res = await axios.post(apiUrl, {
                    'order_id': orderId,
                    'item_id': cartItem.item.id,
                    'quantity': cartItem.quantity,
                    'price': cartItem.item.price
                })
            } catch (error) {
                console.log('Error fetching order items data', error)
            }
        }
    }

    const updateOrderStatus = async (orderId) => {
        const apiUrl = `/api/orders/${orderId}`

        try {
            const res = await axios.put(apiUrl, {'status': 'delivered'})
            if (res.data.responseCode === 200) {
                setSending(false)
                setShowMessage(true)
                setTimeout(
                    reward,
                    2000
                )

            }
        } catch (error) {
            console.log('Error fetching order data', error)
        }
    }


    return (
        <div className="px-12 py-24">
            {showMessage ? (
                <div className="text-center ">
                    <div className="text-6xl font-bold text-mm-pink">
                        Thanks!!
                    </div>
                    <div className="font-bold">
                        Your order has been placed! Please check your email.
                    </div>
                    <span id="rewardId"/>
                </div>
            ) : (
                <div>
                    {(cartItems && cartItems.length > 0) ? (
                        <div>
                            {cartItems.map((cartItem) => (
                                <div className="p-2 border-b border-mm-brown grid grid-cols-4 gap-12 text-sm"
                                     key={cartItem.id}>
                                    {cartItem.item.image ? (
                                        <div className="w-2/3 mx-auto aspect-square">
                                            <div className="bg-center bg-cover bg-no-repeat h-full"
                                                 style={{backgroundImage: `url(${appUrl + '/storage/images/' + cartItem.item.image})`}}>
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
                                            {cartItem.item.name}
                                            <span id="rewardId"/>
                                        </div>
                                        <div>
                                            {cartItem.item.brand.name}
                                        </div>
                                        <div className="font-bold mt-4">
                                            ${cartItem.item.price} per pack
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm">
                                            Quantity:
                                        </div>
                                        <input
                                            type='number'
                                            max={cartItem.item.stock}
                                            min={0}
                                            id='quantity'
                                            name='quantity'
                                            className='bg-mm-cream border-t-0 border-r-0 border-l-0 focus:border-mm-pink'
                                            required
                                            value={cartItem.quantity}
                                            onChange={(e) => {
                                                const newQuantity = Number(e.target.value);
                                                setCartItems((prevCartItems) =>
                                                    prevCartItems.map((item) =>
                                                        item.id === cartItem.id ? {
                                                            ...item,
                                                            quantity: newQuantity
                                                        } : item
                                                    )
                                                );
                                            }}
                                        />
                                        <div className="font-bold">
                                            Total: ${cartItem.quantity * cartItem.item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 flex justify-end">
                                <PrimaryButton
                                    className="relative w-full max-w-[250px] flex items-center justify-center"
                                    disabled={sending}
                                    onClick={() => startOrdering()}
                                >
                                    {sending ? (
                                        <Spinner loading={sending} size={15}
                                                 override={{display: 'block', margin: '0 auto', position: 'absolute'}}/>
                                    ) : (
                                        <span className="invisible absolute">Total: $9999 - Place order</span>
                                    )}
                                    <span className={sending ? "invisible" : "visible"}>
                                    Total: ${totalPrice} - Place order
                                </span>
                                </PrimaryButton>
                            </div>
                        </div>
                    ) : (
                        <>
                            No items in your cart
                        </>
                    )}
                </div>
            )}
        </div>
    )

}

export default Cart
