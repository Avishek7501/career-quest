'use client';

import { selectIsLoggedIn } from '@/store/auth/selectors';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const router = useRouter();

    useLayoutEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard'); // Redirect to the dashboard if logged in
        }
    }, [isLoggedIn, router]);

    return <>{children}</>;
}
