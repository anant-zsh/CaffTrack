import React from 'react'
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from '../utils';
import { useAuth } from '../context/AuthContext';


function StatCard(props) {
    const { lg, title, children } = props;

    return (
        <div className={'bg-gray-100 p-3 rounded-lg m-2' + (lg ? ' col-span-2' : '')}>
            <h4 className='font-semibold text-lg'>{title}</h4>
            {children}
        </div>
    )
}


const Stats = () => {
    const {globalData} = useAuth()

    const stats = calculateCoffeeStats(globalData)

    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)

    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ? 'low' : caffeineLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high'

    return (
        <>
            <div className='mx-10 mt-10 mb-3 flex items-center gap-2 text-4xl font-semibold'>
                <i className="fa-solid fa-chart-simple" />
                <h2>Stats</h2>
            </div>
            <div className='mx-10 grid grid-cols-2'>
                <StatCard lg title="Active Caffeine Level">
                    <div>
                        <p className='font-mono'><span>{caffeineLevel}</span> mg</p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background }}>{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffeine">
                    <p><span>{stats.daily_caffeine}</span> mg</p>
                </StatCard>
                <StatCard title="Average # of Coffees">
                    <p><span>{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost (₹)">
                    <p>₹ <span>{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost (₹)">
                    <p>₹ <span>{stats.total_cost}</span></p>
                </StatCard>
            </div>

            <div className="mx-10 mt-5">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Coffee Name</th>
                            <th className="px-4 py-2 border">No. of Purchases</th>
                            <th className="px-4 py-2 border">Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => (
                            <tr key={coffeeIndex} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{coffee.coffeeName}</td>
                                <td className="px-4 py-2 border">{coffee.count}</td>
                                <td className="px-4 py-2 border">{coffee.percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Stats
