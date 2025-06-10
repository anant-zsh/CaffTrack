import React, { useState } from 'react'


const Authentication = () => {
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)


    async function handleAunthenticate() {

    }


    return (
        <div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p className="text-sm text-gray-500 text-center mb-6">{isRegistration ? `Create your account!` : 'Sign in to your account!'}</p>

            {/* Inputs */}
            <div className="space-y-4">
                <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Submit Button */}
                <button
                    onClick={handleAunthenticate}
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md">
                    Submit
                </button>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-300" />

            {/* Footer */}
            <div className="text-center">
                <p className="text-sm text-gray-600">{!isRegistration ? `Don't have an account?` : 'Already have an account?'}</p>
                <button 
                onClick={() => setIsRegistration(!isRegistration)}
                className="mt-2 cursor-pointer text-blue-600 hover:underline font-medium">{!isRegistration ? 'Sign Up' : 'Login'}</button>
            </div>
        </div>

        // Here's why:
        // Your Authentication component renders its own full-screen modal overlay:

        // jsx
        // Copy code
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        //   <div className="relative w-full max-w-md mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        //     {/* Content */}
        //   </div>
        // </div>
        // But your Modal component also renders the exact same full-screen overlay and backdrop:

        // jsx
        // Copy code
        // <div
        //   onClick={handleCloseModal}
        //   className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        // >
        //   <div
        //     onClick={(e) => e.stopPropagation()}
        //     className="relative w-full max-w-md mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up"
        //   >
        //     {children}
        //   </div>
        // </div>
        // So what happens?
        // You end up with nested fullscreen backdrops, and the innermost modal (from Authentication) is on top of the backdrop button from Modal. This prevents clicks on the backdrop from reaching the modal's overlay layer, so handleCloseModal never triggers.

        // How to fix this:
        // Remove the backdrop and centering container from Authentication component.
        // Authentication should only render the content inside the modal box.


        // <>
        //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        //         <div className="relative w-full max-w-md mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">

        //             {/* Title */}
        //             <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Sign Up / Login</h2>
        //             <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account!</p>

        //             {/* Inputs */}
        //             <div className="space-y-4">
        //                 <input
        //                     type="email"
        //                     placeholder="Email"
        //                     className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 />
        //                 <input
        //                     type="password"
        //                     placeholder="*********"
        //                     className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 />

        //                 {/* Submit Button */}
        //                 <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md">
        //                     Submit
        //                 </button>
        //             </div>

        //             {/* Divider */}
        //             <hr className="my-6 border-gray-300" />

        //             {/* Footer */}
        //             <div className="text-center">
        //                 <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
        //                 <button className="mt-2 cursor-pointer text-blue-600 hover:underline font-medium">Sign Up</button>
        //             </div>
        //         </div>
        //     </div>

        // </>
    )
}

export default Authentication
