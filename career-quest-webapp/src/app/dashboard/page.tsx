'use client';

import React, { useState } from 'react';
import {
    useGetLeaderboardsQuery,
    useGetJobSimulationsQuery
} from '@/store/api/api';
import QuizComponent from '@/components/quiz';

export default function Dashboard() {
    const [selectedSimulationId, setSelectedSimulationId] = useState<
        number | null
    >(null);

    const { data: jobSimulations, isLoading: loadingSimulations } =
        useGetJobSimulationsQuery();

    const { data: leaderboards } = useGetLeaderboardsQuery();

    if (loadingSimulations) return <p>Loading Job Simulations...</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-between p-4 bg-blue-900 text-white">
                <h2 className="text-lg">Your Leaderboard</h2>
                {/* Add your leaderboard display logic here */}
                <div></div>
            </div>
            <div className="flex p-4">
                <div className="w-1/4 bg-blue-800 p-4 text-white">
                    <h3 className="font-bold mb-2">Global Leaderboard</h3>
                    {leaderboards?.map((leader) => (
                        <p key={leader.LeaderboardId}>
                            {leader.User.Username} - {leader.TotalScore}
                        </p>
                    ))}
                </div>
                <div className="w-2/4 bg-gray-200 p-4 flex items-center justify-center">
                    {/* Main Job Simulation Area */}

                    <div>
                        <h3>Job Simulations</h3>
                        {
                            // Render the QuizComponent if a simulation is selected
                            selectedSimulationId ? (
                                <div className="p-4">
                                    <button
                                        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                        onClick={() =>
                                            setSelectedSimulationId(null)
                                        }
                                    >
                                        Back to Dashboard
                                    </button>
                                    <QuizComponent
                                        simulationId={selectedSimulationId}
                                    />
                                </div>
                            ) : (
                                jobSimulations?.map((simulation) => (
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
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="w-1/4 bg-blue-800 p-4 text-white">
                    <h3 className="font-bold mb-2">Friends</h3>
                    {/* <button className="bg-black text-white p-2 rounded-lg">
                        Refer a Friend
                    </button> */}
                </div>
            </div>
        </div>
    );
}
