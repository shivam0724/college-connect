import { z } from "zod";

export const assignmentSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(170, { message: "Title must be at most 170 characters" }),
    description: z.string().min(1, { message: "Description is required" }).max(250, { message: "Description must be at most 250 characters" }),
    subject: z.object({
        name: z.string().min(1, { message: "Subject is required" }),
        code: z.string().min(1, { message: "Subject code is required" }),
    }).refine((subject) => subject.name && subject.code, { message: "Subject and Subject Code are required" }),
    givento: z.object({
        college: z.string().min(1, "College is required"),
        branch: z.string().min(1, "Branch is required"),
        semester: z.coerce
            .number()
            .int()
            .min(1)
            .max(8, "Semester must be between 1 and 8"),
        section: z.string().min(1, "Section is required"),
    }),
    givenon: z.preprocess((val) => {
        if (typeof val === "number") return val;
        if (typeof val === "string") return Date.parse(val);
        return val;
    }, z.number({ invalid_type_error: "Invalid given-on timestamp" })),
    deadline: z.preprocess((val) => {
        if (typeof val === "number") return val;
        if (typeof val === "string") return Date.parse(val);
        return val;
    }, z.number({ invalid_type_error: "Invalid deadline timestamp" }).refine((ts) => !isNaN(ts), { message: "Must be a valid date" })),
});