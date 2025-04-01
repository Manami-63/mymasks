import {CiImageOff} from "react-icons/ci";
import {FiHeart} from "react-icons/fi";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {usePage} from "@inertiajs/react";
import Spinner from "@/Components/Spinner.jsx";
import {useReward} from "react-rewards";
import {Tooltip} from 'react-tooltip'

const ItemDetails = ({itemId}) => {

    const appUrl = import.meta.env.VITE_APP_URL
    const [imageUrl, setImageUrl] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const {reward} = useReward('rewardId', 'confetti', {'elementCount': 10, startVelocity: 15})
    const user = usePage().props.auth.user;
    const [userLike, setUserLike] = useState(null)


    useEffect(() => {
        fetchItem()
    }, [itemId])

    useEffect(() => {
        if (item) {
            if (item.image) {
                setImageUrl(`${appUrl}/storage/images/${item.image}`);
            }
            setLoading(false)
        }
    }, [item]);

    useEffect(() => {
        if (userLike !== null) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [userLike]);


    const addToCart = async () => {
        const apiUrl = `/api/cart-items`
        try {
            const res = await axios.post(apiUrl, {'itemId': itemId, 'quantity': quantity})
            if (res.data.responseCode === 200) {
                cartAdded()
            }
        } catch (error) {
            console.log('Error saving cart item data', error)
        }
    }

    const cartAdded = () => {
        reward()
        fetchItem()
    }

    const fetchItem = async () => {

        const apiUrlToGetItem = `/api/items/${itemId}`;
        try {
            const res = await axios.get(apiUrlToGetItem)
            setItem(res.data.item)
        } catch (error) {
            console.log('Error fetching item data', error)
        }

        if (user) {
            const apiUrlToGetUserLike = `/api/user-likes?itemId=${itemId}`;
            try {
                const res = await axios.get(apiUrlToGetUserLike)
                setUserLike(res.data.userLike)
            } catch (error) {
                console.log('Error getting like data', error)
            }
        }
    }

    const onHeartClick = async () => {
        const apiUrl = `/api/user-likes`;
        if (isLiked) {
            try {
                const res = await axios.delete(apiUrl + '/' + userLike.id)
                if (res.data.responseCode === 200) {
                    setUserLike(null)
                }
            } catch (error) {
                console.log('Error deleting like data', error)
            }
        } else {
            try {
                const res = await axios.post(apiUrl, {'itemId': itemId})
                setUserLike(res.data.userLike)
            } catch (error) {
                console.log('Error saving like data', error)
            }
        }
    }


    return (
        <>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                <div className="my-16 grid grid-cols-1 sm:grid-cols-2 gap-16">
                    <div>
                        {item && item.image !== null ? (
                            <div className="w-full aspect-square">
                                <div className="bg-left-top bg-contain bg-no-repeat h-full"
                                     style={{backgroundImage: `url(${imageUrl})`}}>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full aspect-square bg-mm-cream grid place-items-center">
                                <CiImageOff className="text-8xl"/>
                            </div>
                        )}
                    </div>
                    <div>
                        {item.item_categories?.length &&
                            <div className='flex gap-2 flex-wrap'>
                                {item.item_categories.map((itemCategory) => (
                                    <div key={itemCategory.id}
                                         className="font-bold capitalize text-sm">
                                        #{itemCategory.category.name}
                                    </div>
                                ))}
                            </div>}
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-2xl truncate">
                                {item.name}
                            </div>

                            {user && (
                                isLiked ? (
                                    <FiHeart onClick={() => onHeartClick()}
                                             className="text-red-500 fill-red-500 bg-red cursor-pointer w-8 h-8"/>
                                ) : (
                                    <FiHeart onClick={() => onHeartClick()}
                                             className="likedIconStyle text-mm-dark-brown opacity-30 cursor-pointer w-8 h-8"/>
                                )
                            )}

                        </div>
                        {item.brand && item.brand.name ? (
                            <div className="text-lg">
                                {item.brand.name}
                            </div>
                        ) : (<></>)}
                        <div className="text-xs">
                            {item.product_number}
                        </div>
                        <div className="pt-8">
                            {item.details}
                        </div>
                        <div className="pt-8">
                            <div className="font-bold">
                                ${item.price} / {item.sheet_per_packet} {item.sheet_per_packet > 1 ? ('sheets') : ('sheet')}
                            </div>
                            <div className="text-sm">
                                ${(item.price / item.sheet_per_packet).toFixed(2)} per sheet
                            </div>
                            <div className="text-sm">
                                {item.stock - item.itemsInCart} available
                            </div>
                        </div>
                        <div className="pt-16">
                            <div
                                className="w-full sm:w-1/2 border-b-2 border-mm-dark-brown flex items-center justify-between">
                                <div className="text-sm">
                                    Quantity:
                                </div>
                                <input
                                    type='number'
                                    max={item.stock - item.itemsInCart}
                                    min={0}
                                    id='quantity'
                                    name='quantity'
                                    className='bg-mm-light-pink border-0 focus:outline-none focus:ring-0 focus:border-mm-pink'
                                    required
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    disabled={!user}
                                />
                            </div>
                            <div className="pt-2">
                                {(item.stock - item.itemsInCart) <= 0 && (
                                    <SecondaryButton className="" disabled={item.stock <= 0}>
                                        Sold out
                                    </SecondaryButton>
                                )}

                                {!user ? (
                                    <>
                                        <a className="my-anchor-element">
                                            <PrimaryButton
                                                className='cursor-not-allowed'
                                                disabled>
                                                Add to cart
                                            </PrimaryButton>
                                        </a>
                                        <Tooltip anchorSelect=".my-anchor-element" place="top"
                                                 style={{ backgroundColor: "#F9D1D1", color: "#5C3D22", fontSize: "80%", borderRadius: '5px' }}>
                                            Log in or Sign up please!
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <PrimaryButton
                                            className={((quantity <= 0 || quantity > (item.stock - item.itemsInCart)) && 'cursor-not-allowed')}
                                            onClick={() => {
                                                addToCart()
                                            }}
                                        >
                                            Add to cart
                                        </PrimaryButton>
                                        <span id="rewardId"/>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ItemDetails
