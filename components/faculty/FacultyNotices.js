"use client"
import StickyHeadTable from './StickyHeadTable'

const FacultyNotices = () => {
  return (
    <div className='w-full'>
      <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Notices/Announcement</h2></div>
      <div className='mt-8 font-medium w-full'>
        {rows.length === 0 ? (
          < div className='text-center'>There are currently no new notices.</div>
        ) : (<StickyHeadTable columns={columns} rows={rows} />)}
      </div>
    </div >
  )
}

export default FacultyNotices

const columns = [
  { id: 'title', label: 'Title', minWidth: 300 },
  { id: 'category', label: 'Category', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 150, align: 'right' },
  { id: 'file', label: 'File', minWidth: 100, align: 'right' },
];

const rows = [
  createData(1, 'IT/Aptitude Classes Suspened', 'TNP', new Date("2025-04-22").toLocaleDateString(), '/student/notices/quantiphi.jpg'),
  createData(2, '6th Sem Classes Suspended', 'Holiday', new Date("2025-04-21").toLocaleDateString(), '/student/notices/quantiphi.jpg'),
  createData(3, 'Quantiphi Pre Placement Talk', 'TNP', new Date("2025-04-19").toLocaleDateString(), '/student/notices/quantiphi.jpg'),
  createData(4, 'Minor Project Submission', 'Project', new Date("2025-04-04").toLocaleDateString(), '/student/notices/quantiphi.jpg'),
  createData(5, 'Faculty Meeting Scheduled Today at 3PM', 'Meeting', new Date("2025-04-23").toLocaleDateString(), '/student/notices/quantiphi.jpg'),
];

function createData(id, title, category, date, file) {
  return { id, title, category, date, file };
}