"use client";

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const page = () => {
    const { role } = useParams();
    const router = useRouter();

    useEffect(() => {
        router.push(`/${role}/profile`);
    }, [])

    return <Loading />
}

export default page