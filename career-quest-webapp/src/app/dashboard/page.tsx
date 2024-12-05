'use client';

import React, { useState } from 'react';
import {
    useGetLeaderboardsQuery,
    useGetJobSimulationsQuery,
    useUpdateLeaderboardMutation
} from '@/store/api/api';
import QuizComponent from '@/components/quiz';
import { useGetStatusQuery } from '@/store/auth/api';
import Referrals from '@/components/referrals';

export default function Dashboard() {
    const [selectedSimulationId, setSelectedSimulationId] = useState<
        number | null
    >(null);
    const { data: jobSimulations, isLoading: loadingSimulations } =
        useGetJobSimulationsQuery();
    const { data: leaderboards } = useGetLeaderboardsQuery();
    const [updateLeaderboard] = useUpdateLeaderboardMutation();
    const { data: userData, isLoading: isUserLoading } = useGetStatusQuery();
    const [copied, setCopied] = useState(false);

    const handleCopy = (referralCode: string) => {
        const baseUrl = 'http://localhost:3000/auth/register';
        navigator.clipboard.writeText(
            `${baseUrl}?referralCode=${referralCode}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "copied" message after 2 seconds
    };

    const handleQuizCompletion = async (score: number) => {
        try {
            // Update leaderboard with the new score
            await updateLeaderboard({
                id: 35, // Replace with logged-in user's leaderboard ID
                data: { TotalScore: score }
            });
            alert('Your score has been updated!');
        } catch (error) {
            console.error('Failed to update leaderboard:', error);
        }
    };

    if (loadingSimulations || isUserLoading)
        return <p>Loading Job Simulations...</p>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex flex-1 mt-4 gap-x-4 px-4 mb-4">
                {/* Left Sidebar - Leaderboard */}
                <div className="w-1/4 bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white flex flex-col gap-y-4 rounded-lg shadow-lg">
                    <h3 className="font-bold text-lg text-center border-b border-blue-400 pb-2">
                        Global Leaderboard
                    </h3>
                    {leaderboards?.length ? (
                        <ul className="flex flex-col gap-y-3">
                            {leaderboards.map((leader, index) => (
                                <li
                                    key={leader.LeaderboardId}
                                    className="flex justify-between items-center bg-blue-600 rounded-md p-3 shadow-md hover:bg-blue-500 transition duration-300"
                                >
                                    <div className="flex items-center gap-x-3">
                                        {/* Medal or Rank */}
                                        <span
                                            className={`inline-block w-8 h-8 text-center rounded-full font-semibold ${
                                                index === 0
                                                    ? 'bg-yellow-400 text-yellow-900'
                                                    : index === 1
                                                      ? 'bg-gray-300 text-gray-800'
                                                      : index === 2
                                                        ? 'bg-orange-400 text-orange-900'
                                                        : 'bg-blue-500 text-white'
                                            }`}
                                        >
                                            {index + 1}
                                        </span>
                                        <span className="font-medium">
                                            {leader.User.Username}
                                        </span>
                                    </div>
                                    <span className="text-sm bg-blue-800 px-3 py-1 rounded-full shadow">
                                        {leader.TotalScore} pts
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-300">
                            No data available
                        </p>
                    )}
                </div>

                {/* Center Area - Job Simulations */}
                <div className="w-2/4 bg-gray-200 p-4 flex flex-col items-center justify-center gap-y-4 rounded shadow overflow-hidden">
                    {selectedSimulationId ? (
                        <div className="p-4 w-full h-full flex flex-col">
                            <button
                                className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded self-start"
                                onClick={() => setSelectedSimulationId(null)}
                            >
                                Back to Dashboard
                            </button>
                            <div className="overflow-y-auto flex-grow w-full p-4 bg-white rounded shadow">
                                <QuizComponent
                                    simulationId={selectedSimulationId}
                                    onQuizComplete={handleQuizCompletion}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full overflow-y-auto">
                            <h3 className="font-bold text-lg text-center mb-4">
                                Job Simulations
                            </h3>
                            <div className="grid gap-4">
                                {jobSimulations?.map((simulation) => (
                                    <div
                                        key={simulation.JobSimulationId}
                                        className="bg-white shadow rounded p-4 flex flex-col justify-between"
                                    >
                                        <h2 className="text-lg font-semibold">
                                            {simulation.JobTitle}
                                        </h2>
                                        <p className="text-gray-600">
                                            {simulation.JobDescription}
                                        </p>
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() =>
                                                setSelectedSimulationId(
                                                    simulation.JobSimulationId
                                                )
                                            }
                                        >
                                            Start Simulation
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Friends */}
                <div className="w-1/4 bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white flex flex-col gap-y-6 rounded-lg shadow-lg">
                    {/* Refer a Friend Section */}
                    {userData?.user?.ReferralCode && (
                        <div className="flex flex-col items-center gap-y-3">
                            <button
                                disabled
                                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg shadow transition duration-300"
                            >
                                Refer a Friend
                            </button>
                            <p className="text-sm text-center text-gray-300">
                                Invite your friends to join and earn rewards!
                            </p>
                            <div className="flex flex-col items-center gap-2">
                                <label
                                    htmlFor="referralCode"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Your Referral Link/Code:
                                </label>
                                <div className="relative w-full max-w-sm">
                                    <input
                                        id="referralCode"
                                        type="text"
                                        value={userData?.user?.ReferralCode}
                                        readOnly
                                        className="w-full p-2 pr-20 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                    />
                                    <button
                                        onClick={() =>
                                            handleCopy(
                                                userData?.user?.ReferralCode ??
                                                    ''
                                            )
                                        }
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                    >
                                        {copied ? 'Copied!' : 'Share'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/** Friends list */}
                    {userData?.user?.UserId && (
                        <Referrals userId={userData?.user?.UserId} />
                    )}
                </div>
            </div>
        </div>
    );
}
