import React, { Children } from 'react'
import ReactDOM from 'react-dom'

const Modal = (props) => {
    const { children, handleCloseModal } = props

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <button
                onClick={handleCloseModal}
                className="absolute inset-0 w-full h-full"
            ></button>


            <div className="relative w-full max-w-md mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default Modal
