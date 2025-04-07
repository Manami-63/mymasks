import PageLayout from "@/Layouts/PageLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";
import Spinner from "@/Components/Spinner.jsx";
import moment from "moment";
import {CiImageOff} from "react-icons/ci";
import {MdOutlineRateReview} from "react-icons/md";
import {IoIosCheckmarkCircle} from "react-icons/io";
import React from 'react';
import Modal from 'react-modal';
import ModalBase from "@/Components/ModalBase.jsx";
import {LiaStarSolid} from "react-icons/lia";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import axios from "axios";
import Swal from 'sweetalert2'

const Orders = () => {

    const appUrl = import.meta.env.VITE_APP_URL
    const [feedbackName, setFeedbackName] = useState('')
    const [feedbackRating, setFeedbackRating] = useState(1)
    const [feedbackText, setFeedbackText] = useState('')
    const [loading, setLoading] = useState(true)
    const [modalOrder, setModalOrder] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [orders, setOrders] = useState([])
    const [sending, setSending] = useState(false)


    useEffect(() => {

        Modal.setAppElement('#myapp')
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
    }, [openModal])


    const createFeedback = async () => {
        setSending(true)

        const apiUrl = `/api/order-item-feedbacks`

        try {

            const sendingData = {
                'orderItemId': modalOrder.id,
                'name': feedbackName,
                'feedback': feedbackText,
                'rating': feedbackRating
            }

            const res = await axios.post(apiUrl, sendingData)
            if (res.data.responseCode === 200) {

                Swal.fire({
                    title: 'Thanks!!!',
                    text: 'Thanks for submitting your feedback!',
                    icon: 'success',
                    confirmButtonText: 'Back >'
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetReview()
                        setSending(false)
                        setOpenModal(false)
                    }
                });
            }
        } catch (error) {
            console.log('Error saving cart item data', error)
        }
    }

    const resetReview = () => {
        setModalOrder([])
        setFeedbackRating(1)
        setFeedbackName('')
        setFeedbackText('')
    }

    const totalPrice = (items) => {
        if (items.length > 1) {
            return items.reduce(function (a, b) {
                return a + (b.price * b.quantity)
            }, 0)
        } else {
            return items[0].price * items[0].quantity
        }
    }


    const modalContent = () => {
        return (
            <div className="sm:px-12">
                {modalOrder && (
                    <div>
                        <div>
                            <div
                                className="p-2 border-b border-mm-brown grid grid-cols-4 gap-2 sm:gap-12 text-xs sm:text-sm"
                                key={modalOrder.id}>
                                {modalOrder.item.image ? (
                                    <div className="mx-auto aspect-square">
                                        <div className="bg-center bg-cover bg-no-repeat h-full"
                                             style={{backgroundImage: `url(${appUrl + '/storage/images/' + modalOrder.item.image})`}}>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="mx-auto aspect-square bg-mm-cream grid place-items-center">
                                        <CiImageOff className="text-4xl sm:text-8xl"/>
                                    </div>
                                )}
                                <div className="col-span-3">
                                    <div className="text-base font-bold">
                                        {modalOrder.item.name}
                                    </div>
                                    <div>
                                        {modalOrder.item.brand.name}
                                    </div>
                                    <div>
                                        Purchased: {moment(modalOrder.created_at).format('MMMM Do YYYY, h:mm a')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-4 flex justify-evenly">
                            <LiaStarSolid onClick={() => {
                                setFeedbackRating(1)
                            }}
                                          className='cursor-pointer text-mm-brown text-4xl'/>
                            <LiaStarSolid onClick={() => {
                                setFeedbackRating(2)
                            }}
                                          className={'cursor-pointer text-mm-brown text-4xl ' + ((feedbackRating < 2) && 'opacity-30')}/>
                            <LiaStarSolid onClick={() => {
                                setFeedbackRating(3)
                            }}
                                          className={'cursor-pointer text-mm-brown text-4xl ' + ((feedbackRating < 3) && 'opacity-30')}/>
                            <LiaStarSolid onClick={() => {
                                setFeedbackRating(4)
                            }}
                                          className={'cursor-pointer text-mm-brown text-4xl ' + ((feedbackRating < 4) && 'opacity-30')}/>
                            <LiaStarSolid onClick={() => {
                                setFeedbackRating(5)
                            }}
                                          className={'cursor-pointer text-mm-brown text-4xl ' + ((feedbackRating < 5) && 'opacity-30')}/>
                        </div>
                        <div className="py-4">
                            <InputLabel htmlFor="name" value="Name"/>

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={feedbackName}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setFeedbackName(e.target.value)}
                            />
                        </div>
                        <div className="py-4">
                            <InputLabel htmlFor="feedback" value="Feedback"/>

                            <textarea
                                id="feedback"
                                name="feedback"
                                value={feedbackText}
                                className="mt-1 block w-full rounded-lg bg-mm-cream"
                                onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>
                        <div className="py-4 flex justify-end">
                            <PrimaryButton
                                className="relative w-full sm:max-w-[250px] flex items-center justify-center"
                                disabled={sending}
                                onClick={() => createFeedback()}
                            >
                                {sending ? (
                                    <Spinner loading={sending} size={15}
                                             override={{display: 'block', margin: '0 auto', position: 'absolute'}}/>
                                ) : (
                                    <div>
                                        Submit
                                    </div>
                                )}
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </div>
        )
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
                                    <div className="py-4 border-b-2 border-mm-brown grid sm:grid-cols-4 gap-4"
                                         key={order.id}>
                                        <div className="">
                                            <div>
                                                {moment(order.created_at).format('MMMM Do YYYY, h:mm a')}
                                            </div>
                                            <div className="text-sm">
                                                Order #{order.id}
                                            </div>
                                            <div className="mt-2 sm:mt-8">
                                                {order.order_items.length} items
                                            </div>
                                            <div className="font-bold">
                                                Total: ${totalPrice(order.order_items)}
                                            </div>
                                            {order.status === 'done' && (
                                                <IoIosCheckmarkCircle className="text-2xl text-green-300"/>
                                            )}

                                        </div>
                                        <div className="md:col-span-3">
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
                                                                <div>
                                                                    <MdOutlineRateReview
                                                                        onClick={() => [setOpenModal(true), setModalOrder(orderItem), setFeedbackRating(1), setFeedbackName(''), setFeedbackText('')]}
                                                                        className="text-2xl text-red-300 cursor-pointer"/>

                                                                    {openModal &&
                                                                        <ModalBase open={openModal}
                                                                                   setOpenModal={setOpenModal}
                                                                                   modalContent={modalContent()}/>
                                                                    }
                                                                </div>
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
