import React from 'react'
import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from '../utils'

const History = () => {
    return (
        <>
            <div className='mx-10 mt-10 mb-3 flex items-center gap-2 text-4xl font-semibold'>
                <i className="fa-solid fa-timeline"></i>
                <h2>History</h2>
            </div>
            <p className='mx-10'><i>hover for more information!</i></p>

            <div className='grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 mx-10 mt-2'>
                {Object.keys(coffeeConsumptionHistory).sort((a, b) => b - a).map((utcTime, coffeeIndex) => {

                    const coffee = coffeeConsumptionHistory[utcTime]
                    const timeSinceConsume = timeSinceConsumption(utcTime)
                    const originalAmount = getCaffeineAmount(coffee.name)
                    const remainingAmount = calculateCurrentCaffeineLevel({
                        [utcTime]: coffee
                    })

                    const summary = `${coffee.name} | ${timeSinceConsume} | ₹${coffee.cost * 85} | ${remainingAmount}mg / ${originalAmount}mg`


                    return(
                        <div title={summary} className='text-center py-2 text-3xl' key={coffeeIndex}>
                            <i className="fa-solid fa-mug-hot"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default History
