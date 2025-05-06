"use client"

import { deleteAssignment, fetchAssignmentByFaculty, fetchAssignments } from '@/lib/dashboard/assignments'
import React from 'react'
import useSWR, { mutate } from 'swr'
import StickyHeadTable from './StickyHeadTable'
import Loading from '../Loading'
import AssignmentForm from './subs/AssignmentForm'
import { toast } from 'react-toastify'

const fetcher = async (data) => {
    if (data.role === "faculty") {
        return await fetchAssignmentByFaculty(data.id);
    }

    const college = data?.college;

    const _class = { branch: college?.branch, semester: college?.semester, section: college?.section, college: college?.name };

    return await fetchAssignments(_class);
}

const Assignments = ({ role, session }) => {
    const { data, error, isLoading } = useSWR({ role, id: session?.id, college: session?.college }, fetcher);

    const refresh = () => mutate({ role, id: session?.id, college: session?.college });
    const actions = {
        delete: {
            label: "Delete", action: async (id) => {
                try {
                    toast.loading("Deleting assignment...");
                    const res = await deleteAssignment(id);
                    toast.dismiss();
                    if (res) {
                        toast.success("Assignment deleted successfully!");
                        refresh();
                    } else {
                        toast.error("Failed to delete assignment. Please try again.");
                    }
                } catch (error) {
                    console.error("Error deleting assignment:", error);
                    toast.error(error?.message || "Failed to delete assignment. Please try again.");
                }
            }
        },
        update: { label: "Update", action: async (id) => { } },
    }

    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Assignments</h2></div>
            <div className='mt-4 font-medium w-full'>
                {isLoading && <Loading />}
                {error && <p>Error: {error.message}</p>}
                {data && data.length === 0 && <div className='text-center'>Lucky You, There are no assignments.</div>}
                {data && data.length > 0 && (
                    <StickyHeadTable role={role} columns={role === "student" ? studentColumns : facultyColumns} rows={data} actions={actions} />
                )}
            </div>

            {role == "faculty" && (
                <div className='mt-8 font-medium w-full'>
                    <AssignmentForm role={role} session={session} refresh={refresh} />
                </div>
            )}
        </div>
    )
}

export default Assignments

const studentColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 250 },
    { id: "subject", label: "Subject", minWidth: 210, align: "right" },
    { id: "givenby", label: "Given By", minWidth: 170, align: "right" },
    { id: "givenon", label: "Given On", minWidth: 80, align: "right" },
    { id: "deadline", label: "Due Date", minWidth: 80, align: "right" },
]

const facultyColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 250 },
    { id: "subject", label: "Subject", minWidth: 210, align: "right" },
    { id: "givento", label: "Assigned To", minWidth: 200, align: "right" },
    { id: "givenon", label: "Given On", minWidth: 80, align: "right" },
    { id: "deadline", label: "Due Date", minWidth: 80, align: "right" },
    { id: "actions", label: "Actions", minWidth: 80, align: "right" },
]