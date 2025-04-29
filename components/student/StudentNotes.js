"use client"
import React from 'react'
import useSWR from 'swr'
import StickyHeadTable from './StickyHeadTable'
import { fetchNotes } from '@/lib/student/notes'

const fetcher = async (_class) => {
    return await fetchNotes(_class);
}

const StudentNotes = () => {
    const { data, error, isLoading } = useSWR({ branch: "CSE", semester: 6, section: "A" }, fetcher);

    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Notes/Course Material</h2></div>
            <div className='mt-8 font-medium w-full'>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.length === 0 && <div className='text-center'>Course Material and notes will be uploaded soon.</div>}
                {data && data.length > 0 && (
                    <StickyHeadTable columns={columns} rows={data} />
                )}
            </div>
        </div>
    )
}

export default StudentNotes

const columns = [
    { id: 'topic', label: 'Topic', minWidth: 200 },
    { id: 'description', label: 'Description', minWidth: 300 },
    { id: 'givenby', label: 'Shared by', minWidth: 200, align: 'right' },
    { id: 'givenon', label: 'Date', minWidth: 150, align: 'right' },
    { id: 'file', label: 'File', minWidth: 100, align: 'right' },
];

// const rows = [
//     createData(1, 'Data Structures & Algorithm', 'Prof. Vinod Patel', new Date("2025-04-22").toLocaleDateString(), '/student/notes/dsa.pdf'),
//     createData(2, 'Software Enginnering', 'Dr, Vishwa Gupta', new Date("2025-04-21").toLocaleDateString(), '/student/notes/dsa.pdf'),
//     createData(3, 'Operating System', 'Prof. Monika Kudopa', new Date("2025-04-19").toLocaleDateString(), '/student/notes/dsa.pdf'),
//     createData(4, 'Database Management System', 'Prof. Aaradhana Saxena', new Date("2025-04-04").toLocaleDateString(), '/student/notes/dsa.pdf'),
// ];

// function createData(id, topic, sharedBy, date, file) {
//     return { id, topic, sharedBy, date, file };
// }