"use client"
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [])

  return <Loading />
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen py-2">
  //     <Link href={"/student"} className="text-blue-500 hover:underline">Student</Link>
  //     <Link href={"/faculty"} className="text-blue-500 hover:underline">Faculty</Link>
  //     <Link href={"/login"} className="text-blue-500 ul hover:underline">SignIn</Link>
  //   </div>
  // );
}