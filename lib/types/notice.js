import { z } from "zod";

export const noticeSchema = z.object({
    subject: z.string().min(1, { message: "Subject is required" }).max(50, { message: "Subject must be at most 50 characters" }),
    category: z.enum(["TNP", "Scholarship", "Event", "Holiday", "Meeting", "Project", "Other"], { message: "Invalid category" }),
    noticefor: z.enum(["All", "Faculty", "Student"], { message: "Invalid notice for" }).default("All"),
    file: z.instanceof(File).optional(),
})