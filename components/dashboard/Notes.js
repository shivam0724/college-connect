"use client"
import React, { useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import StickyHeadTable from './StickyHeadTable'
import { deleteNote, fetchNotes, fetchNotesByFaculty } from '@/lib/dashboard/notes'
import Loading from '../Loading'
import NotesForm from './subs/NotesForm'
import { toast } from 'react-toastify'

const fetcher = async (data) => {
    if (data.role === "faculty") {
        return await fetchNotesByFaculty(data.id);
    }

    const college = data?.college;

    const _class = { branch: college?.branch, semester: college?.semester, section: college?.section, college: college?.name };

    return await fetchNotes(_class);
}

const Notes = ({ role, session }) => {
    const { data, error, isLoading } = useSWR({ role, id: session?.id, college: session?.college }, fetcher);

    useEffect(() => {
        if (role === "faculty") {
            columns[2] = { id: 'givento', label: 'Shared To', minWidth: 200, align: 'right' };
        }
    }, []);

    const refresh = () => mutate({ role, id: session?.id, college: session?.college });

    const actions = {
        delete: {
            label: "Delete", action: async (id) => {
                try {
                    toast.loading("Deleting note...");
                    const res = await deleteNote(id);
                    toast.dismiss();
                    if (res) {
                        toast.success("Notes deleted successfully!");
                        refresh();
                    } else {
                        toast.error("Failed to delete note. Please try again.");
                    }
                } catch (error) {
                    console.error("Error deleting note:", error);
                    toast.error(error?.message || "Failed to delete note. Please try again.");
                }
            }
        },
        update: { label: "Update", action: async (id) => { } },
    }

    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Notes/Course Material</h2></div>
            <div className='mt-8 font-medium w-full'>
                {isLoading && <Loading />}
                {error && <p>Error: {error.message}</p>}
                {data && data.length === 0 && <div className='text-center'>Course Material and notes will be uploaded soon.</div>}
                {data && data.length > 0 && (
                    <StickyHeadTable role={role} columns={columns} rows={data} actions={actions} />
                )}

                {role === "faculty" ? <div className='mt-8 font-medium w-full'><NotesForm role={role} session={session} refresh={refresh}/></div> : null}
            </div>
        </div>
    )
}

export default Notes

const columns = [
    { id: 'topic', label: 'Topic', minWidth: 200 },
    { id: 'description', label: 'Description', minWidth: 300 },
    { id: 'givenby', label: 'Shared by', minWidth: 200, align: 'right' },
    { id: 'givenon', label: 'Date', minWidth: 150, align: 'right' },
    { id: 'file', label: 'File', minWidth: 100, align: 'right' },
    { id: 'actions', label: 'Actions', minWidth: 80, align: 'right' },
];