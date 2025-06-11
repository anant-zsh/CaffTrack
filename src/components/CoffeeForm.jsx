import React, { useState } from 'react'
import { coffeeOptions } from '../utils'
import Modal from './Modal'
import Authentication from './Authentication'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../../firebase"

const CoffeeForm = (props) => {
    const { isAuthenticated } = props

    const [showModal, setShowModal] = useState(false)

    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    const { globalData, setGlobalData, globalUser } = useAuth()

    async function handleSubmitForm() {
        if (!isAuthenticated) {
            setShowModal(true)
            return
        }

        // define a guard clause that only submits the form if it is completed
        if (!selectedCoffee) {
            return
        }

        try {
            // then we are going to create a new data object
            const newGlobalData = {
                ...(globalData || {})
            }

            const nowTime = Date.now()
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)
            const timestamp = nowTime - timeToSubtract

            const newData = {
                name: selectedCoffee,
                cost: coffeeCost
            }
            newGlobalData[timestamp] = newData
            console.log(timestamp, selectedCoffee, coffeeCost)

            // update the global state
            setGlobalData(newGlobalData)

            // persist the data in firebase firestore
            const userRef = doc(db, 'users', globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, { merge: true })

            setSelectedCoffee(null)
            setHour(0)
            setMin(0)
            setCoffeeCost(0)
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => {
                    setShowModal(false)
                }}>
                    <Authentication handleCloseModal={() => {
                        setShowModal(false)
                    }} />
                </Modal>
            )}
            <div className='flex items-center gap-3 px-10 mt-15'>
                <i className="fa-solid fa-file-pen text-4xl" />
                <h2 className='text-4xl font-semibold'>Start tracking today</h2>
            </div>
            <h4 className='px-10 mt-5 text-2xl text-black'>Select coffee type:</h4>
            <div className='p-0 px-7 pt-3 grid grid-cols-2 grid-row-1 lg:grid-cols-6 md:grid-cols-3'>
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (<button onClick={() => {
                        setSelectedCoffee(option.name)
                        setShowCoffeeTypes(false)
                    }} className={'cursor-pointer border rounded-lg hover:text-black font-sans m-2 h-20 hover:bg-green-100' + (option.name === selectedCoffee ? ' text-black bg-green-100' : ' ')} key={optionIndex}>
                        <h4>{option.name}</h4>
                        <p>{option.caffeine} mg</p>
                    </button>)
                })}
                <button onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null)
                }} className={'cursor-pointer border rounded-lg font-sans m-2 h-20  hover:text-black hover:bg-green-100' + (showCoffeeTypes ? ' text-black bg-green-100' : ' ')}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>

                {showCoffeeTypes && (
                    <select onChange={(e) => {
                        setSelectedCoffee(e.target.value)
                    }} className='cursor-pointer mt-3 mx-2 h-7 border hover:text-black hover:bg-gray-100' name="coffee-list" id="coffee-list">
                        <option value="{option.name}">Select Coffee</option>
                        {coffeeOptions.map((option, optionIndex) => {
                            return (
                                <option value={option.name} key={optionIndex}>
                                    {option.name} ({option.caffeine}mg)
                                </option>
                            )
                        })}
                    </select>
                )}

            </div>
            <h4 className='px-10 mt-7 text-2xl text-black'>Add the cost (₹):</h4><br />

            <input value={coffeeCost} onChange={(e) => {
                setCoffeeCost(e.target.value)
            }} className='w-50 cursor-pointer px-1 mx-2 w-50 h-7 border border mx-10 hover:text-black hover:bg-gray-100' type="number" placeholder='160' />

            <h4 className='px-10 mt-7 text-2xl text-black'>Time since comsumption:</h4>

            <div className='grid grid-cols-2 mx-10 mt-2'>
                <div className='pr-3'>
                    <h6>Hours:</h6>

                    <select onChange={(e) => {
                        setHour(e.target.value)
                    }} className='w-full h-7 border hover:text-black hover:bg-gray-100 cursor-pointer' name="hours" id="hours-select">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>{hour}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='pr-3'>
                    <h6>Mins:</h6>

                    <select onChange={(e) => {
                        setMin(e.target.value)
                    }} className='w-full h-7 border hover:text-black hover:bg-gray-100 cursor-pointer' name="hours" id="hours-select">
                        {[0, 5, 10, 20, 30, 40, 50].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>
                                    {min}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <button onClick={handleSubmitForm} className='mt-7 mx-10 border-2 px-5 h-8 text-green-500 hover:bg-green-500 hover:text-black hover:border-black cursor-pointer active:bg-green-400'>Add Entry</button>
        </>
    )
}

export default CoffeeForm
