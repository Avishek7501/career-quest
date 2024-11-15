'use client';

import { useRegisterMutation } from '@/store/auth/api';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/store/auth/selectors';
import Link from 'next/link';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { isLoading }] = useRegisterMutation();
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
            await register({ username, email, password }).unwrap();
            alert('Registration successful! Please login.');
            router.push('/auth/login'); // Redirect to login page
        } catch (error: any) {
            alert(error.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-1 h-full bg-gray-100 items-center">
            {/* Main content */}
            <div className="flex flex-grow h-full items-center justify-center">
                <div className="bg-white shadow-lg h-full rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-blue-900 text-center">
                        Create an Account
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Please fill the details to register.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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
                        <div className="mb-4">
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
                            {isLoading ? 'Registering...' : 'REGISTER'}
                        </button>
                        <p className="mt-4 flex items-center gap-2">
                            Already have an account?
                            <Link href="/auth/login" className="text-blue-500">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
