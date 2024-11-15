'use client';

import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { selectIsLoggedIn } from '@/store/auth/selectors';

interface AuthContextType {
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children
}: AuthProviderProps): JSX.Element | null => {
    const reduxIsLoggedIn = useSelector(selectIsLoggedIn); // Redux state
    const router = useRouter();
    const pathname = usePathname();

    const [authChecked, setAuthChecked] = useState(false); // Tracks if auth logic is resolved
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Combined state (localStorage + Redux)

    // Initial load: Check token in localStorage and combine with Redux state
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Check localStorage for token
        if (token) {
            setIsLoggedIn(true); // Assume logged in if token exists
        } else {
            setIsLoggedIn(reduxIsLoggedIn); // Use Redux as fallback
        }
        setAuthChecked(true); // Mark auth check as completed
    }, [reduxIsLoggedIn]);

    // Handle redirection logic after auth check
    useEffect(() => {
        if (!authChecked || isLoggedIn === null) return; // Wait for auth check to complete

        const publicPaths = ['/auth/login', '/auth/register', '/'];
        const authOnlyPaths = ['/auth/login', '/auth/register'];

        if (isLoggedIn && authOnlyPaths.includes(pathname)) {
            // Redirect logged-in users away from login/register
            router.push('/dashboard');
        } else if (!isLoggedIn && !publicPaths.includes(pathname)) {
            // Redirect non-logged-in users trying to access protected routes
            router.push('/auth/login');
        }
    }, [authChecked, isLoggedIn, pathname, router]);

    if (!authChecked) {
        // Prevent rendering until auth check completes
        return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
