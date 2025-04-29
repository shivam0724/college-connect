"use client"
import { Avatar } from '@mui/material'
import React from 'react'

const Navbar = () => {
    return (
        <div className="h-18 bg-[#13202d] shadow-md px-4">
            <div className="flex justify-between items-center h-full px-4">
                <div className="text-gray-200 text-base font-normal">Shaktimaan</div> {/* Replace with actual student name */}
                <div className="flex items-center space-x-4">
                    <Avatar alt="profile" src="/avatar/avatar.svg" />
                </div>
            </div>
        </div>
    )
}

export default Navbar