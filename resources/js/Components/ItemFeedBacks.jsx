import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment.js";
import {LiaStarSolid} from "react-icons/lia";

const ItemFeedBacks = ({item}) => {

    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getFeedbacks = async () => {
            const apiUrl = item && `/api/order-item-feedbacks?itemId=${item.id}`

            try {
                const res = await axios.get(apiUrl)
                setFeedbacks(res.data.feedbacks)

            } catch (error) {
                console.log('Error fetching feedback data', error)
            }
        }
        getFeedbacks().then(() =>
            setLoading(false)
        )
    }, [])


    return (
        <div>
            <div className="text-xl font-bold mb-4">
                Reviews
            </div>
            {feedbacks.length ? (
                <div>
                    {feedbacks.map((feedback) => (
                        <div key={feedback.id} className="py-2 border-b border-mm-dark-brown flex gap-8">
                            <div>
                                <div className="flex">
                                    <LiaStarSolid className='cursor-pointer text-mm-brown '/>
                                    <LiaStarSolid className={'cursor-pointer text-mm-brown  ' + ((feedback.rating < 2) && 'opacity-30')}/>
                                    <LiaStarSolid className={'cursor-pointer text-mm-brown  ' + ((feedback.rating < 3) && 'opacity-30')}/>
                                    <LiaStarSolid className={'cursor-pointer text-mm-brown ' + ((feedback.rating < 4) && 'opacity-30')}/>
                                    <LiaStarSolid className={'cursor-pointer text-mm-brown  ' + ((feedback.rating < 5) && 'opacity-30')}/>
                                </div>
                                <div className="font-bold">
                                    {feedback.name}
                                </div>
                                <div className="text-sm">
                                    {moment(feedback.created_at).format('MMMM Do YYYY, h:mm a')}
                                </div>
                            </div>
                            <div className="">
                                {feedback.feedback}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    No reviews yet
                </div>
            )}
        </div>
    )
}

export default ItemFeedBacks
