import React from 'react'

const Hero = () => {
    return (
        <div>
            <h1 className='text-5xl font-bold text-black p-10 pb-1 text-left sm:text-center'>Coffee tracking for coffee <abbr className='no-underline' title="an enthusiast or a devotee">Fiends</abbr>!</h1>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='m-10'>
                    <h3 className='font-bold text-5xl'>Try <span className='bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent'>CaffTrack</span> and start...</h3>
                    <div className='text-xl py-5'>
                        <p>✅ Tracking every coffee</p>
                        <p>✅ Measuring your blood caffeine level</p>
                        <p>✅ Costing and quantifying your addiction</p>
                    </div>
                </div>
                <div className='mx-10 sm:mt-6 p-5 border rounded-xl bg-gray-100'>
                    <div className='flex items-center gap-2'>
                        <i className="fa-solid fa-circle-info"></i>
                        <h3>Did you know...</h3>
                    </div>
                    <h5 className='pt-3 font-bold'>That caffeine&apos;s half-life is about 5 hours?</h5>
                    <p className='pt-2'>This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer! So if you drink a cup of coffee with 200 mg of caffeine, 5 hours, later, you&apos;ll still have about 100 mg of caffeine in your system.</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
