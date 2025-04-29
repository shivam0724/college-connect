"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link href={"/student"} className="text-blue-500 hover:underline">Student</Link>
      <Link href={"/faculty"} className="text-blue-500 hover:underline">Faculty</Link>
      <Link href={"/login"}className="text-blue-500 ul hover:underline">SignIn</Link>
    </div>
  );
}