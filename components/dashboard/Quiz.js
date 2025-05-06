import React from 'react'

const Quiz = ({role}) => {
    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Quiz</h2></div>
            <div className='mt-8 font-medium w-full'>
                <div className='text-center'>{role === "student" ? "Keep Preparing, No quiz is available to solve." : "You have not posted any quiz yet."}</div>
            </div>
        </div>
    )
}

export default Quiz