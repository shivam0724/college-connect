"use client";

import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { notesSchema } from '@/lib/types/notes';

import { TextInput, TextAreaInput, CheckboxField, FileInput, SelectField, SemSubjectsSelect, SubjectSelect, SubmitButton } from './Form';
import { Form } from "@/components/shadcn/ui/form";
import { assignTo } from './CONSTANTS';

import { toast } from 'react-toastify';
import { postNotes } from '@/lib/dashboard/notes';

const NotesForm = ({ role, session, refresh }) => {
    const form = useForm({
        resolver: zodResolver(notesSchema),
        defaultValues: {
            topic: "Introduction to Data Structures",
            description: "These Notes consist of the basic concepts of Data Structures",
            // givento: { college: "LNCTS", branch: "CSE", semester: 6, section: "C" },
            givenon: Date.now(),
            subject: { name: "Data Structure", code: "CS-303" },
            forall: true,
            file: undefined
        }
    })

    const shareToAll = useWatch({ control: form.control, name: "forall" });

    useEffect(() => {
        if (shareToAll) {
            form.resetField("givento");
        }
    }, [shareToAll, form]);

    const onSubmit = async (data) => {
        console.log('[NotesForm.js]: ', data);
        if (data?.file?.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB. Please upload a smaller file.");
            return;
        }


        if (data?.file && data?.file?.size > 0) {
            toast.loading("Uploading file...");
            const formData = new FormData();
            formData.append("file", data.file);
            formData.append("category", "notes");
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
        toast.loading("Posting notes...");
        console.log('[NotesForm.js]: ', data);
        try {
            data.facultyid = session?.id;
            data.givento = { college: "", branch: "", semester: 6, section: "C" };
            const res = await postNotes(data);

            toast.dismiss();
            if (!res) {
                toast.error("Failed to post notes. Please try again.");
                return;
            }
            form.reset();
            toast.success("Notes posted successfully!");
            refresh();
        } catch (error) {
            console.error("Error posting notes:", error);
            toast.dismiss();
            toast.error(error?.message || "Failed to post notes. Please try again.");
        }
    };
    return (
        <div className='flex flex-col w-full gap-4'>
            <h2 className='text-xl font-semibold'>Post Notes</h2>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto grid">
                        {/* topic */}
                        <TextInput form={form} name="topic" label="Topic" placeholder="Enter your topic" />

                        {/* description */}
                        <TextAreaInput form={form} name="description" label="Description" placeholder="Enter your description" />

                        {/* share to all */}
                        <CheckboxField form={form} name="forall" label="Share to all students" />

                        {/* Assigned To */}
                        {shareToAll ? null : (
                            <div className="grid grid-cols-2 gap-4">
                                {assignTo.map(({ name, label, options }) => (
                                    <SelectField key={name} form={form} name={name} label={label} options={options} />
                                ))}
                                {form.formState.errors.givento && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {form.formState.errors.givento.message}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Subject */}
                        <SubjectSelect form={form} name="subject" label="Subject" placeholder="Select subject" />

                        {/* file */}
                        <FileInput form={form} name="file" label="File" placeholder="Upload your file" accept=".pdf, .docx, .pptx" />

                        <SubmitButton form={form} label="Post Notes" loadinglabel={"Posting..."} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default NotesForm


// {
//     <SelectGroup>
//         <SelectLabel className='pl-2 font-semibold'>Subject - Sem - {form.watch("givento.semester")}</SelectLabel>
//         {
//             semesterSubjects[form.watch("givento.semester")].map((subject) => (
//                 <SelectItem key={subject.name} value={subject.name}>
//                     {subject.name}
//                 </SelectItem>
//             ))
//         }
//     </SelectGroup >
// }