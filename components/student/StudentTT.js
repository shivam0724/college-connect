import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StudentTT = () => {
    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Time Table</h2></div>
            <div className='mt-8 font-medium w-full'>
                {rows.length === 0 ? (
                    < div className='text-center'>Scheduled is not prepared yet.</div>
                ) : (<ColumnGroupingTable rows={rows} />)}
            </div>
            <div className='text-base mt-4 w-full font-medium'>Mentor - <span className='font-semibold'>Prof. Vinod Patel</span></div>
        </div>
    )
}

export default StudentTT

// null values means skips the column
// colSpan means how many columns to span
// empty text because of previous column span
const rows = [
    {
        day: 'MON',
        slots: [
            { text: '' },
            { text: '' },
            { text: 'CS 605 - LAB - F1 - OLD BLOCK', colSpan: 2 },
            null,
            { text: 'CS 602 - T 07 NEW', colSpan: 2 },
            null,
            { text: 'Lunch Break' },
            { text: 'CS 603 - G 06 NEW' },
            { text: 'CS 601 - G3 NEW', colSpan: 2 },
            null
        ]
    },
    {
        day: 'TUE',
        slots: [
            { text: '' },
            { text: '' },
            { text: 'CS 602 - G3 NEW', colSpan: 2 },
            null,
            { text: 'CS 603 - S 05 NEW', colSpan: 2 },
            null,
            { text: 'Lunch Break' },
            { text: 'CS 604 - F 13 LAB NEW' },
            { text: 'CS 601 - ML LAB Prof. Vinod Patel', colSpan: 2 },
            null,
        ]
    },
    {
        day: 'WED',
        slots: [
            { text: '' },
            { text: '' },
            { text: 'CS 601 - G 04 NEW', colSpan: 2 },
            null,
            { text: 'TNP - APTITUDE - S 21 - NEW BLOCK', colSpan: 2 },
            null,
            { text: 'Lunch Break' },
            { text: 'Mentor/Library F 13 LAB NEW' },
            { text: 'CS 601 - G3 NEW' },
            { text: 'CS 604 - G3 NEW' }
        ]
    },
    {
        day: 'THU',
        slots: [
            { text: '' },
            { text: '' },
            { text: 'CS 602 - CN LAB - T15 - EC FLOOR - OLD BLOCK', colSpan: 2 },
            null,
            { text: 'CS 603 - G 09 OLD', colSpan: 2 },
            null,
            { text: 'Lunch Break' },
            { text: 'TNP - IT TRAINING - LNCTE AUDITORIUM / CS 605 - VP - F-14', colSpan: 3 },
            null,
            null,
        ]
    },
    {
        day: 'FRI',
        slots: [
            { text: '' },
            { text: '' },
            { text: 'CS - 608 - Lab - Aradhna Saxena - F15', colSpan: 2 },
            null,
            { text: 'CS 603 - G 09 OLD', colSpan: 2 },
            null,
            { text: 'Lunch Break' },
            { text: 'TNP - IT TRAINING - LNCTE AUDITORIUM / CS 606 LAB - F01 LAB', colSpan: 3 },
            null,
            null,
        ]
    }
];

const timeSlots = [
    '09:00 - 09:50',
    '09:50 - 10:30',
    '10:30 - 11:20',
    '11:20 - 12:10',
    '12:10 - 01:00',
    '01:00 - 01:50',
    '01:50 - 02:40',
    '02:40 - 03:30',
    '03:30 - 04:15',
    '04:15 - 05:00',
];

export function ColumnGroupingTable({ rows }) {
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" rowSpan={2} style={{ minWidth: 100, fontWeight: 'bold' }} sx={{ borderRight: '1px solid #ccc' }}>
                                Day
                            </TableCell>
                            {
                                Array.from({ length: 10 }).map((_, index) => {
                                    return (
                                        <TableCell className='col-span-1' key={index} align="center" colSpan={1} style={{ minWidth: 150 }} sx={{ borderRight: '1px solid #ccc' }}>
                                            {`Lecture ${index + 1}`}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                        <TableRow>
                            {
                                timeSlots.map((slot, index) => (
                                    <TableCell colSpan={1} key={index} align="center" style={{ minWidth: 150 }} sx={{ borderRight: '1px solid #ccc' }}>
                                        {slot}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell align="center" style={{ fontWeight: 'bold' }} sx={{ borderRight: '1px solid #ccc' }}>{row.day}</TableCell>
                                {row.slots.map((slot, colIndex) => {
                                    if (slot === null) return null;

                                    return (
                                        <TableCell key={colIndex} align="center" colSpan={slot.colSpan || 1} sx={{ borderRight: '1px solid #ccc' }}>
                                            {slot.text}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
