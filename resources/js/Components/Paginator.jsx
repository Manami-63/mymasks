import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";

const Paginator = ({items, itemsPerPage, passCurrentItems}) => {

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    }

    useEffect(() => {
        const updateItemsList = () => {
            passCurrentItems(currentItems)
        }
        updateItemsList()
    }, [itemOffset, items])

    return (
        <div className="mt-4 flex justify-between items-center">
            <div className="italic text-sm">
                Showing from {itemOffset + 1} to {endOffset >= items.length ? items.length : endOffset} items (Total {items.length} items)
            </div>
            <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex gap-4"
                activeClassName='active font-bold text-mm-brown'
                disabledClassName='disabled opacity-30'
            />
        </div>
    )
}

export default Paginator
