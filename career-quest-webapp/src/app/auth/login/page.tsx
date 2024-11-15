'use client';

import { useLoginMutation } from '@/store/auth/api';
import { setToken } from '@/store/auth/slice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectIsLoggedIn } from '@/store/auth/selectors';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard'); // Redirect if already logged in
        }
    }, [isLoggedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(setToken({ token: response.token, user: response.user }));
            localStorage.setItem('authToken', response.token); // Persist token
            router.push('/dashboard'); // Redirect to dashboard after login
        } catch (error: any) {
            alert(error.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-1 h-full bg-gray-100 items-center">
            {/* Main content */}
            <div className="flex flex-grow h-full items-center justify-center">
                <div className="bg-white shadow-lg h-full rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-blue-900 text-center">
                        Welcome Back!
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Please login to see your account.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                        >
                            {isLoading ? 'Logging in...' : 'LOGIN'}
                        </button>
                        <p className="mt-4 flex items-center gap-2">
                            Not registered yet?
                            <Link
                                href="/auth/register"
                                className="text-blue-500"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
