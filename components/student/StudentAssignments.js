"use client"
import { fetchAssignments } from '@/lib/student/assignments'
import React from 'react'
import useSWR from 'swr'
import StickyHeadTable from './StickyHeadTable'

const fetcher = async (_class) => {
    return await fetchAssignments(_class);
}

const StudentAssignments = () => {
    const { data, error, isLoading } = useSWR({ branch: "CSE", semester: 6, section: "A" }, fetcher);

    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Assignments</h2></div>
            <div className='mt-8 font-medium w-full'>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.length === 0 && <div className='text-center'>Lucky You, There are no assignments.</div>}
                {data && data.length > 0 && (
                    <StickyHeadTable columns={columns} rows={data} />
                )}
            </div>
        </div>
    )
}

export default StudentAssignments

const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "subject", label: "Subject", minWidth: 170, align: "right" },
    { id: "givenby", label: "Given By", minWidth: 170, align: "right" },
    { id: "givenon", label: "Given On", minWidth: 100, align: "right" },
    { id: "deadline", label: "Due Date", minWidth: 100, align: "right" },
]