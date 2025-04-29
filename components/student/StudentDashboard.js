import React from 'react'
import Navbar from '../Navigation/Navbar'

const StudentDashboard = ({ children }) => {
    return (
        <div className="flex-1 flex flex-col bg-slate-100 overflow-auto">
            <Navbar />
            <div className='bg-white px-6 py-4 m-6 rounded-lg shadow-md text-slate-950 h-full flex flex-col items-center overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}

export default StudentDashboard
