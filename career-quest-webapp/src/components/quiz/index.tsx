'use client';

import { useGetStartSimulationQuery } from '@/store/api/api';
import React, { useEffect, useState } from 'react';

const QuizComponent = ({ simulationId }: { simulationId: number }) => {
    const {
        data: simulationData,
        isLoading,
        error
    } = useGetStartSimulationQuery(simulationId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        Record<number, number>
    >({});
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    // // Fetch simulation data when the component is mounted
    // useEffect(() => {
    //     startSimulation(simulationId);
    // }, [simulationId, startSimulation]);

    console.log(simulationData);

    // Handle answer selection
    const handleAnswerSelect = (questionId: number, answerIndex: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerIndex
        }));

        // Check if the selected answer is correct
        const question = simulationData?.questions.find(
            (q: any) => q.questionId === questionId
        );
        if (question?.answers[answerIndex]?.isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < simulationData.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setQuizComplete(true); // Quiz is complete
        }
    };

    if (isLoading) return <p>Loading Simulation...</p>;
    if (error) return <p>Error loading simulation</p>;

    if (quizComplete) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Quiz Complete!</h2>
                <p className="text-xl mt-4">
                    Your Score: {score} / {simulationData?.questions.length}
                </p>
            </div>
        );
    }

    const currentQuestion = simulationData?.questions[currentQuestionIndex];

    console.log(simulationData);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">
                {simulationData?.simulation.title}
            </h2>
            <div className="w-full max-w-md bg-gray-100 p-4 rounded shadow">
                <p className="mb-2">{currentQuestion?.questionText}</p>
                <div className="flex flex-col">
                    {currentQuestion?.answers.map((answer: any, index: any) => (
                        <button
                            key={answer.answerId}
                            onClick={() =>
                                handleAnswerSelect(
                                    currentQuestion.questionId,
                                    index
                                )
                            }
                            disabled={
                                selectedAnswers[currentQuestion.questionId] !==
                                undefined
                            }
                            className={`p-2 my-1 text-left border rounded ${
                                selectedAnswers[currentQuestion.questionId] ===
                                index
                                    ? 'bg-blue-200'
                                    : 'bg-white'
                            }`}
                        >
                            {answer.answerText}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNextQuestion}
                    className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
                    disabled={
                        selectedAnswers[currentQuestion.questionId] ===
                        undefined
                    }
                >
                    {currentQuestionIndex < simulationData.questions.length - 1
                        ? 'Next Question'
                        : 'Finish Quiz'}
                </button>
            </div>
        </div>
    );
};

export default QuizComponent;
