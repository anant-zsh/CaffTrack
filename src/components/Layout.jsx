import React, { useState } from 'react'
import Modal from './Modal'
import Authentication from './Authentication'

const Layout = (props) => {
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const header = (
        <header className='sticky top-0 flex justify-between items-center px-10 bg-black'>
            <div>
                <h1 className='text-2xl font-bold text-white'>CaffTrack</h1>
                <p className='text-white'>For Coffee Insatiates</p>
            </div>
            <button onClick={() => {
                setShowModal(true)
            }} className='flex justify-between items-center gap-3 text-green-500 border rounded-4xl px-3 py-2 hover:bg-green-600 hover:text-black active:bg-green-400 cursor-pointer'>
                <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )
    const footer = (
        <footer className='bg-black mt-10'>
            <p className='text-center text-white mx-10 py-2'>
                <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                    CaffTrack </span>
                was made by <a className='bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent' target="_blank" href="https://www.anantpanwar.com">
                    Anant Panwar </a>
                Check out the project on
                <a className='bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent' target="_black" href="https://github.com/anant-zsh/CaffTrack"> GitHub
                </a>
                !
            </p>
        </footer>
    )


    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => {
                    setShowModal(false)
                    console.log('clicked bg')
                    }}>
                    <Authentication />
                </Modal>
            )}
            {header}
            <main>{children}</main>
            {footer}
        </>
    )
}

export default Layout
