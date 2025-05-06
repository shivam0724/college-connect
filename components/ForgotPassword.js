"use client";

import React, { useState } from 'react';
import { Button } from "@/components/shadcn/ui/button";
import { useForm } from 'react-hook-form';
import { Form } from "@/components/shadcn/ui/form";
import { TextInput, SubmitButton, TextInputHidden } from './dashboard/subs/Form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/shadcn/ui/dialog";
import { checkUserExists, resetPassword } from '@/lib/user';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

function ForgotPassword({ username }) {
    const [open, setOpen] = useState(false);
    const [isExists, setIsExists] = useState(false);
    const [user, setUser] = useState(username || "");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogClose />
            <DialogTrigger asChild>
                <button type='button' className='"ml-auto text-sm underline-offset-2 hover:underline'>Forgot Password?</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogDescription>Resetting password will logout you from every device you have signed in yet.</DialogDescription>
                </DialogHeader>
                <div>
                    {!isExists ? <UserNameForm username={user} setIsExists={setIsExists} setUser={setUser} /> : <PasswordResetForm username={user} setOpen={setOpen} setIsExists={setIsExists} />}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { setOpen(false); setIsExists(false) }}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ForgotPassword;

const UserNameForm = ({ username, setIsExists, setUser }) => {
    const form = useForm({
        defaultValues: { username: username || "" },
    });
    const onSubmit = async (data) => {
        try {
            toast.loading("Verifying username...");
            const isExists = await checkUserExists(data.username);
            toast.dismiss();
            if (isExists) {
                setIsExists(true);
                setUser(data.username);
                toast.success("Password reset link sent to your email.");
            }
            else {
                toast.error("User does not exist. Please check your username.");
            }
        } catch (error) {
            console.log("Error checking user existence:", error);
            toast.error(error.message || "An error occurred while checking user existence. Please try again.");
        }
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto grid">
            <TextInput form={form} name="username" label="Username" placeholder="enter your username" />

            <SubmitButton form={form} label="Verify" loadinglabel={"verifying..."} />
        </form>
    </Form>
}

const PasswordResetForm = ({ username, setOpen, setIsExists }) => {
    const form = useForm({
        defaultValues: {
            username: username,
        },
        resolver: zodResolver(z.object({
            username: z.string().min(1, "Username is required"),
            password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
            confirmpassword: z.string().min(8, "Confirm Password must be at least 8 characters long").max(20, "Confirm Password must be at most 20 characters long"),
        }).refine((data) => data.password === data.confirmpassword, {
            message: "Passwords do not match",
            path: ["confirmpassword"],
        })),
    });

    console.log('[ForgotPassword.js]: ', form.formState.errors);

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmpassword) {
                toast.error("Passwords do not match. Please try again.");
                return;
            }

            const reset = resetPassword(data.username, data.password);
            if (!reset) {
                toast.error("Failed to reset password. Please try again.");
                return;
            }

            toast.success("Password reset successfully. You can now login with your new password.");
            form.reset();
            setIsExists(false);
            setOpen(false);
        } catch (error) {
            console.log("Error resetting password:", error);
            toast.error(error.message || "An error occurred while resetting password. Please try again.");
        }
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto grid">
            {/* username */}
            <TextInputHidden form={form} name="username" />
            {/* password */}
            <TextInput form={form} name="password" label="New Password" placeholder="enter your new password" />

            <TextInput form={form} name="confirmpassword" label="Confirm Password" placeholder="confirm your new password" />

            <SubmitButton form={form} label="Reset Password" loadinglabel={"resetting..."} />
        </form>
    </Form>
}