import {CiImageOff} from "react-icons/ci";
import {Link} from "@inertiajs/react";
import {useEffect, useState} from "react";

const Item = ({item}) => {

    const appUrl = import.meta.env.VITE_APP_URL
    const [imageUrl, setImageUrl] = useState('')
    const [hasImage, setHasImage] = useState(false)


    useEffect(() => {
        if (item.image !== null) {
            setImageUrl(appUrl + '/storage/images/' + item.image)
            setHasImage(true)
        }
    }, []);


    return (
        <Link href={route('item', item.id)}
              className="bg-mm-pink p-4 shadow-md shadow-mm-brown rounded-lg hover:opacity-70">

            {hasImage ? (
                <div className="w-full aspect-square">
                    <div className="bg-center bg-cover bg-no-repeat h-full"
                         style={{backgroundImage: `url(${imageUrl})`}}>
                    </div>
                </div>
            ) : (
                <div className="w-full aspect-square bg-mm-cream grid place-items-center">
                    <CiImageOff className="text-8xl"/>
                </div>
            )}

            <div className="font-bold text-lg truncate">
                {item.name}
            </div>
            <div className="text-sm truncate">
                {item.brand.name}
            </div>
            <div className="font-bold text-sm text-right">
                ${item.price} / {item.sheet_per_packet} {item.sheet_per_packet > 1 ? ('sheets') : ('sheet')}
            </div>
            <div className="text-xs text-right">
                ${(item.price / item.sheet_per_packet).toFixed(2)} per sheet
            </div>
        </Link>
    )
}

export default Item
