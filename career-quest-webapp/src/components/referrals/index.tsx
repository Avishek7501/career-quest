'use client';

import { useGetReferralsQuery } from '../../store/auth/api';
import React from 'react';

export default function Referrals({ userId }: { userId: string | number }) {
    const { data: referrals, isLoading, error } = useGetReferralsQuery(userId);

    if (isLoading) return <p>Loading referrals...</p>;
    if (error) return <p>Error loading referrals.</p>;

    return (
        <div className="rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Referrals</h2>

            {/* User who referred me */}
            {referrals.referredBy && (
                <div className="mb-4">
                    <h3 className="font-bold">Referred By:</h3>
                    <p>
                        {referrals.referredBy.Username} (
                        {referrals.referredBy.Email})
                    </p>
                </div>
            )}

            {/* Users referred by me */}
            <div>
                <h3 className="font-bold">Users I Referred:</h3>
                {referrals.referredUsers.length > 0 ? (
                    <ul className="flex flex-col gap-y-3 mt-3">
                        {referrals.referredUsers.map((user: any) => (
                            <li
                                key={user.UserId}
                                className="flex text-start gap-x-3 bg-blue-600 p-3 rounded-md shadow-md hover:bg-blue-500 transition duration-300 flex-col"
                            >
                                <div className="font-bold text-xl">
                                    {user.Username}
                                </div>
                                <span className="text-gray-200">
                                    {user.Email} - Joined on{' '}
                                    {new Date(
                                        user.CreatedAt
                                    ).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users referred yet.</p>
                )}
            </div>
        </div>
    );
}
