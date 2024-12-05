'use client';

import { cn } from '@/lib/utils';
import {
    useGetStartSimulationQuery,
    useUpdateLeaderboardScoreMutation
} from '@/store/api/api';
import { useGetStatusQuery } from '@/store/auth/api';
import React, { useState } from 'react';

interface QuizComponentProps {
    simulationId: number;
    onQuizComplete: (score: number) => void; // Callback for quiz completion
}

const QuizComponent = ({
    simulationId,
    onQuizComplete
}: QuizComponentProps) => {
    const {
        data: simulationData,
        isLoading,
        error
    } = useGetStartSimulationQuery(simulationId);

    const { data: user, isLoading: isUserLoading } = useGetStatusQuery();

    const [updateLeaderboardScore] = useUpdateLeaderboardScoreMutation();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        Record<number, number>
    >({});
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const currentQuestion = simulationData?.questions[currentQuestionIndex];

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

    const handleNextQuestion = async () => {
        // updateLeaderboardScore({user, currentQuestion.questionId, })
        if (currentQuestionIndex < simulationData.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setQuizComplete(true); // Quiz is complete
            onQuizComplete(score); // Invoke the callback with the final score
        }

        console.log(user);

        const userId = user?.user?.UserId;
        const selectedAnswerIndex = selectedAnswers[currentQuestion.questionId];
        const selectedAnswer = currentQuestion.answers.at(selectedAnswerIndex);

        console.log(userId, selectedAnswerIndex, selectedAnswer);
        const requestObj = {
            userId,
            questionId: currentQuestion.questionId,
            selectedAnswerId: selectedAnswer.answerId
        };

        console.log(requestObj);
        await updateLeaderboardScore(requestObj);
    };

    if (isLoading || isUserLoading) return <p>Loading Simulation...</p>;
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
                            // disabled={
                            //     selectedAnswers[currentQuestion.questionId] !==
                            //     undefined
                            // }
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
                    className={cn(
                        'mt-4 p-2 bg-blue-500 text-white rounded w-full',
                        selectedAnswers[currentQuestion.questionId] ===
                            undefined
                            ? 'disabled:bg-gray-500'
                            : ''
                    )}
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
