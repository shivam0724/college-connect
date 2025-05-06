"use client"
import StickyHeadTable from './StickyHeadTable'
import useSWR, { mutate } from 'swr'
import { deleteNotice, fetchNotices } from '@/lib/dashboard/notices'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import NoticeForm from './subs/NoticeForm'
import { deleteNote } from '@/lib/dashboard/notes'

const fetcher = async (role) => {
    return await fetchNotices(role);
}

const Notices = ({ role, session }) => {
    const { data, error, isLoading } = useSWR(role, fetcher);

    const refresh = () => mutate(role);
    const actions = {
        delete: {
            label: "Delete", action: async (id) => {
                try {
                    toast.loading("Deleting notice...");
                    const res = await deleteNotice(id);
                    toast.dismiss();
                    if (res) {
                        toast.success("Notice deleted successfully!");
                        refresh();
                    } else {
                        toast.error("Failed to delete notice. Please try again.");
                    }
                } catch (error) {
                    console.error("Error deleting notice:", error);
                    toast.error(error?.message || "Failed to delete notice. Please try again.");
                }
            }
        },
        update: { label: "Update", action: async (id) => { } },
    }

    return (
        <div className='w-full'>
            <div className='text-2xl w-full font-semibold'><h2 className='text-left'>Notices/Announcement</h2></div>
            <div className='mt-8 font-medium w-full'>
                {isLoading && <Loading />}
                {error && <p>Error: {error.message}</p>}
                {data && data.length === 0 && <div className='text-center'>There are currently no new notices.</div>}
                {data && data.length > 0 && (
                    <StickyHeadTable role={role} columns={columns} rows={data} actions={actions} />
                )}
            </div>

            {role == "faculty" && (
                <div className='mt-8 font-medium w-full'>
                    <NoticeForm role={role} session={session} refresh={refresh} />
                </div>
            )}
        </div>
    )
}

export default Notices

const columns = [
    { id: 'subject', label: 'Subject', minWidth: 300 },
    { id: 'category', label: 'Category', minWidth: 100, align: 'center' },
    { id: 'date', label: 'Date', minWidth: 150, align: 'right' },
    { id: 'file', label: 'File', minWidth: 100, align: 'right' },
    { id: 'actions', label: 'Actions', minWidth: 80, align: 'right' },
];