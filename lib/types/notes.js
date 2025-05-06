import { z } from "zod";

export const notesSchema = z.object({
    topic: z.string().min(1, { message: "Topic is required" }).max(170, { message: "Topic must be at most 170 characters" }),
    description: z.string().min(1, { message: "Description is required" }).max(250, { message: "Description must be at most 250 characters" }),
    givento: z.object({
        college: z.string().min(1, "College is required"),
        branch: z.string().min(1, "Branch is required"),
        semester: z.coerce
            .number()
            .int()
            .min(1)
            .max(8, "Semester must be between 1 and 8"),
        section: z.string().min(1, "Section is required"),
    }).optional(),
    givenon: z.preprocess((val) => {
        if (typeof val === "number") return val;
        if (typeof val === "string") return Date.parse(val);
        return val;
    }, z.number({ invalid_type_error: "Invalid given-on timestamp" })),
    subject: z.object({
        name: z.string().min(1, { message: "Subject is required" }),
        code: z.string().min(1, { message: "Subject code is required" }),
    }).refine((subject) => subject.name && subject.code, { message: "Subject and Subject Code are required" }),
    forall: z.boolean().default(false),
    file: z.instanceof(File).optional(),
}).superRefine((data, ctx) => {
    if (!data.forall && !data.givento) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["givento"],
            message: "You must select college/branch/semester/section when not sharing to all",
        });
    }
}) 