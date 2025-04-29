"use client"
import { useForm } from 'react-hook-form';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import authenticate from '@/lib/authentication';

// components
import { cn } from "@/lib/shadcn/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

export default function LoginPage({ className }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const res = await authenticate(data);

        if (res?.error) {
            console.log(res);
            toast.error(res.message);
        } else {
            toast.success(res.message);
            router.push(res?.url);
        }
    }
    return (
        <div className="bg-[#13202d] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6 ", className)}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Welcome back</h1>
                                        <p className="text-muted-foreground text-balance">
                                            Login to your college connect account
                                        </p>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="username">Username</Label>
                                        <Input {...register("username", { required: "Username is required" })} id="username" type="text" placeholder="shaktimaan" required />
                                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum length of password should be 8 characters." } })} id="password" type="password" required />
                                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                                    </div>
                                    <Button type="submit" className="w-full cursor-pointer">
                                        Login
                                    </Button>
                                    <div className="text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <Link href="#" className="underline underline-offset-4">
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            </form>
                            <div className="bg-muted relative hidden md:block">
                                <img src="/logo.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                        and <Link href="#">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}