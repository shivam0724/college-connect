"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { noticeSchema } from '@/lib/types/notice';
import { postNotice } from '@/lib/dashboard/notices';

import { TextInput, SelectField, SubmitButton, FileInput } from './Form';
import { Form } from "@/components/shadcn/ui/form";
import { toast } from 'react-toastify';

const NoticeForm = ({ role, session, refresh }) => {
    const form = useForm({
        resolver: zodResolver(noticeSchema),
        defaultValues: { subject: "", category: "", noticeFor: "All", date: new Date().getTime(), file: undefined },
    });

    const onSubmit = async (data) => {
        toast.loading("Uploading file...");
        if (data?.file?.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB. Please upload a smaller file.");
            return;
        }

        if (data?.file && data?.file?.size > 0) {
            const formData = new FormData();
            formData.append("file", data.file);
            formData.append("category", "notices");
            formData.append("id", session.id);

            const fileRes = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const fileData = await fileRes.json();
            toast.dismiss();
            if (fileData?.url) {
                data.file = fileData.url;
                toast.success("File uploaded successfully!", { autoClose: 1000 });
            } else {
                toast.error("Failed to upload file. Please try again.");
                return;
            }
        }

        toast.loading("Posting notice...");
        data.facultyid = session.id;

        const res = await postNotice(data, session.id);

        toast.dismiss();
        refresh();
        if (res) {
            form.reset();
            toast.success("Notice posted successfully!");
        } else {
            toast.error("Failed to post notice. Please try again.");
        }
    };

    return (
        <div className='flex flex-col w-full gap-4'>
            <div>
                <h2 className='text-xl'>Post Notice</h2>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto grid">
                        {/* Subject */}
                        <TextInput form={form} name="subject" label="Subject" placeholder="Notice Subject" />

                        {/* category */}
                        <SelectField form={form} name="category" label="Notice Category" options={["TNP", "Scholarship", "Event", "Holiday", "Meeting", "Project", "Other"]} />

                        {/* notice for */}
                        <SelectField form={form} name="for" label="Notice For" options={["All", "Students", "Faculty"]} />

                        {/* file */}
                        <FileInput form={form} name="file" label="Upload File" accept=".pdf, .doc, .docx, .ppt, .pptx" />

                        <SubmitButton form={form} label="Post Assignment" loadinglabel={"Posting..."} />
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default NoticeForm