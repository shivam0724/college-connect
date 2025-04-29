import React from 'react'
import StickyHeadTable from './StickyHeadTable'

const FacultyNotes = () => {
    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Notes/Course Material</h2></div>
            <div className='mt-8 font-medium w-full'>
                {rows.length === 0 ? (
                    < div className='text-center'>Your published content will be seen here.</div>
                ) : (<StickyHeadTable columns={columns} rows={rows} />)}
            </div>
        </div>
    )
}

export default FacultyNotes

const columns = [
    { id: 'topic', label: 'Topic', minWidth: 300 },
    { id: 'sharedBy', label: 'Shared by', minWidth: 200, align: 'right' },
    { id: 'date', label: 'Date', minWidth: 150, align: 'right' },
    { id: 'file', label: 'File', minWidth: 100, align: 'right' },
  ];
  
  const rows = [
    createData(1, 'Data Structures & Algorithm', 'Prof. Vinod Patel', new Date("2025-04-22").toLocaleDateString(), '/student/notes/dsa.pdf'),
    createData(2, 'Software Enginnering', 'Dr, Vishwa Gupta', new Date("2025-04-21").toLocaleDateString(), '/student/notes/dsa.pdf'),
    createData(3, 'Operating System', 'Prof. Monika Kudopa', new Date("2025-04-19").toLocaleDateString(), '/student/notes/dsa.pdf'),
    createData(4, 'Database Management System', 'Prof. Aaradhana Saxena', new Date("2025-04-04").toLocaleDateString(), '/student/notes/dsa.pdf'),
  ];
  
  function createData(id, topic, sharedBy, date, file) {
    return { id, topic, sharedBy, date, file };
  }