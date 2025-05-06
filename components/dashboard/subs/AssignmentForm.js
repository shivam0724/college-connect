"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { assignmentSchema } from "@/lib/types/assignment";

import { TextInput, TextAreaInput, SelectField, SemSubjectsSelect, SubmitButton, DateInput } from './Form';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";

import { postAssignment } from '@/lib/dashboard/assignments';
import { toast } from 'react-toastify';
import { assignTo } from './CONSTANTS';

const AssignmentForm = ({ role, session, refresh }) => {
    const form = useForm({
        resolver: zodResolver(assignmentSchema),
        defaultValues: { title: "", description: "", subject: {name: "", code: ""}, givento: { college: "", branch: "", semester: "", section: "" }, givenon: new Date().toLocaleDateString(), deadline: "", },
    });

    const onSubmit = async (data) => {
        toast.loading("Posting assignment...");
        data.givenon = new Date().getTime();
        data.deadline = new Date(data.deadline).getTime();
        data.facultyid = session.id;

        const res = await postAssignment(data, session.id);

        toast.dismiss();
        refresh();
        if (res) {
            form.reset();
            toast.success("Assignment posted successfully!");
        } else {
            toast.error("Failed to post assignment. Please try again.");
        }
    };

    return (
        <div className='flex flex-col w-full gap-4'>
            <div>
                <h2 className='text-xl'>Post Assignment</h2>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto grid">
                        {/* Title */}
                        <TextInput form={form} name="title" label="Title" placeholder="Assignment Title" />

                        {/* Description */}
                        <TextAreaInput form={form} name="description" label="Description" placeholder="Assignment Description" />

                        {/* Assigned To */}
                        <div className="grid grid-cols-2 gap-4">
                            {assignTo.map(({ name, label, options }) => (
                                <SelectField key={name} form={form} name={name} label={label} options={options} />
                            ))}
                        </div>

                        {/* Subject */}
                        <SemSubjectsSelect form={form} name="subject" label="Subject" placeholder="Select Subject" sem={form.watch("givento.semester")} />

                        {/* Given On */}
                        <div className='grid grid-cols-2 gap-4'>
                            <TextInput form={form} name="givenon" label="Given On" placeholder="Given On" disabled={true} />

                            {/* Deadline */}
                            <DateInput form={form} name="deadline" label="Deadline" placeholder="Select Deadline" />
                        </div>

                        <SubmitButton form={form} label="Post Assignment" loadinglabel={"Posting..."} />
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default AssignmentForm