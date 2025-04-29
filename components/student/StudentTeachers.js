"use client"
import StickyHeadTable from './StickyHeadTable'

const StudentTeachers = () => {
  return (
    <div className='w-full'>
      <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Teacher Section</h2></div>
      <div className='mt-8 font-medium w-full'>
        {rows.length === 0 ? (
          < div className='text-center'>Get connected to you teachers.</div>
        ) : (<StickyHeadTable columns={columns} rows={rows} />)}
      </div>
    </div>
  )
}

export default StudentTeachers

const columns = [
  { id: 'name', label: 'Name', minWidth: 300, align: 'left' },
  { id: 'subcode', label: 'Subject Code', minWidth: 150, align: 'right' },
  { id: 'subject', label: 'Subject', minWidth: 250, align: 'right' },
  { id: 'mobile', label: 'Contact Number', minWidth: 200, align: 'right' },
];

const rows = [
  createData(1, 'Dr. Ruchi Jain', 'CS-601', "Machine Learning", 'XXXXXXXXXX'),
  createData(2, 'Dr. Md Sarwar', 'CS-602', "Computer Network", 'XXXXXXXXXX'),
  createData(3, 'Prof. Vinod Patel', 'CS-603-C', "Compiler Desgin", 'XXXXXXXXXX'),
  createData(4, 'Prof. Parag Sohoni', 'CS-604-B', "Project Management", 'XXXXXXXXXX'),
  createData(5, 'Prof. Aradhana Saxena', 'CS-606', "Skill Development", 'XXXXXXXXXX'),
];

function createData(id, name, subcode, subject, mobile) {
  return { id, name, subcode, subject, mobile };
}
