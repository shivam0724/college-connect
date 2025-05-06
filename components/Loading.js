import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = ({ className, width, height }) => {
    return (
        <div className={`fji ${height ? height : "min-h-[70vh]"} ${width ? width : "min-w-[calc(100vw-368px)]"}`}>
            <span className='mx-auto text-center'><ClipLoader color='#f97316' size={45} /></span>
        </div>
    )
}

export default Loading