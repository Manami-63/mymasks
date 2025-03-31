import {IoIosClose} from "react-icons/io";
import Modal from "react-modal";
import React from "react";

const ModalBase = ({open, setOpenModal, modalContent}) => {
    return (
        <div>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpenModal(false)}
                closeTimeoutMS={500}
                className="absolute w-1/2 z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mm-light-pink p-4 rounded shadow-md shadow-mm-pink"
                overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[90]"
            >
                <button className="w-full flex justify-end" onClick={() => setOpenModal(false)}>
                    <IoIosClose className="text-4xl" />
                </button>

                {modalContent}

            </Modal>
        </div>
    )
}

export default ModalBase
