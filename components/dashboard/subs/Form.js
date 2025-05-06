import React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Button } from "@/components/shadcn/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/shadcn/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { cn } from "@/lib/shadcn/utils";
import { format } from "date-fns";
import { subjects, colleges, branches, semesters, sections, semesterSubjects, assignTo } from './CONSTANTS';
import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { toast } from 'react-toastify';

// export default FormF = ({ form, session }) => {
//     return <>
//         <div></div>
//     </>
// }

const TextInput = ({ form, name, label, placeholder, disabled = false }) => {
    return <FormField disabled={disabled} control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input readOnly={disabled} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
}

const TextInputHidden = ({ form, name }) => {
    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className="hidden">
            <FormControl>
                <Input {...field} />
            </FormControl>
        </FormItem>
    )} />
}

const TextAreaInput = ({ form, name, label, placeholder }) => {
    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Textarea placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
}

const SelectField = ({ form, name, label, options }) => {
    return <FormField key={name} control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Select onValueChange={field.onChange} value={field.value?.toString() ?? ""} >
                    <SelectTrigger>
                        <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel className='pl-2 my-1 font-semibold'>{label}</SelectLabel>
                            {options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
}

const CheckboxField = ({ form, name, label }) => {
    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <div className='flex items-center gap-2'>
                <FormControl>
                    <Checkbox id={name} {...field} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel htmlFor={name}>{label}</FormLabel>
            </div>
        </FormItem>
    )} />
}

const FileInput = ({ form, name, label, accept = "*" }) => {
    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input type="file" accept={accept} onChange={(e) => field.onChange(e.target.files?.[0])} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
}

const DateInput = ({ form, name, label }) => {
    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(new Date(field.value), "yyyy-MM-dd") : "Select date"}
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => { field.onChange(format(date, "yyyy-MM-dd")); }} />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )} />
}

const SubmitButton = ({ form, label, loadinglabel }) => {
    return <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? loadinglabel : label}
    </Button>
}

// based components

const SemSubjectsSelect = ({ form, name, label, sem = 1 }) => {
    const subjectsList = semesterSubjects[sem] || [];

    return <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Select onValueChange={(name) => {
                    const selected = subjects.find((s) => s.name === name);
                    field.onChange(selected ?? null);
                }} value={field.value?.name ?? ""} >
                    <SelectTrigger>
                        <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup key={sem}>
                            <SelectLabel className='pl-2 my-1 font-semibold'>Subject - Sem - {sem}</SelectLabel>
                            {subjectsList.map((subject) => (
                                <SelectItem key={subject.name} value={subject.name}>
                                    {subject.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
            {field.value && (
                <p className="mt-1 ml-1 text-sm text-gray-600">
                    Code: <strong>{field.value.code}</strong>
                </p>
            )}
        </FormItem>
    )} />
}

const SubjectSelect = ({ form }) => {
    return <FormField control={form.control} name="subject" render={({ field }) => (
        <FormItem>
            <FormLabel>Subject</FormLabel>
            <div className={"flex items-center"}>
                <FormControl>
                    <Select onValueChange={(name) => {
                        const selected = subjects.find((s) => s.name === name);
                        field.onChange(selected ?? null);
                    }} value={field.value?.name ?? ""} >
                        <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(semesterSubjects).map(([sem, subjects]) => (
                                <SelectGroup key={sem}>
                                    <SelectLabel className='pl-2 my-1 font-semibold'>Subject - Sem - {sem}</SelectLabel>
                                    {subjects.map((subject) => (
                                        <SelectItem key={subject.name} value={subject.name}>
                                            {subject.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            </div>
            <FormMessage />
            {field.value && (
                <p className="mt-1 ml-1 text-sm text-gray-600">
                    Code: <strong>{field.value.code}</strong>
                </p>
            )}
        </FormItem>
    )} />
}

export { TextInput, TextInputHidden, TextAreaInput, SelectField, CheckboxField, FileInput, SubmitButton, SemSubjectsSelect, SubjectSelect, DateInput }