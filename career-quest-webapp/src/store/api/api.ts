import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import environments from '../../configs/environments';
import { API_PATH, API_TAG_TYPES } from './types';

let token: string | null = null;
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    token = storedToken;
}

export const api = createApi({
    reducerPath: API_PATH,
    tagTypes: [API_TAG_TYPES],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({
        baseUrl: environments.API_ENDPOINT_HOST,
        credentials: 'include',
        prepareHeaders: (headers) => {
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Leaderboard CRUD
        getLeaderboards: builder.query<any[], void>({
            query: () => ({ url: '/leaderboard', method: 'GET' })
        }),
        getLeaderboard: builder.query<any, number>({
            query: (id) => ({ url: `/leaderboard/${id}`, method: 'GET' })
        }),
        updateLeaderboard: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `/leaderboard/${id}`,
                method: 'PATCH',
                body: data
            })
        }),

        // JobApplication CRUD
        getJobApplications: builder.query<any[], void>({
            query: () => ({ url: '/job/application', method: 'GET' })
        }),
        createJobApplication: builder.mutation<any, any>({
            query: (data) => ({
                url: '/job/application',
                method: 'POST',
                body: data
            })
        }),

        // JobSimulation CRUD
        getJobSimulations: builder.query<any[], void>({
            query: () => ({ url: '/job/simulation', method: 'GET' })
        }),

        // JobCategory CRUD
        getJobCategories: builder.query<any[], void>({
            query: () => ({ url: '/job/category', method: 'GET' })
        }),

        // JobSkill CRUD
        getJobSkills: builder.query<any[], void>({
            query: () => ({ url: '/job/skill', method: 'GET' })
        }),
        getInterviewQuestions: builder.query<
            any[],
            { jobSimulationId: number }
        >({
            query: ({ jobSimulationId }) => ({
                url: `/job/simulation/${jobSimulationId}/questions`,
                method: 'GET'
            })
        }),

        // Fetch possible answers for an interview question
        getInterviewAnswers: builder.query<
            any[],
            { interviewQuestionId: number }
        >({
            query: ({ interviewQuestionId }) => ({
                url: `/interview/question/${interviewQuestionId}/answers`,
                method: 'GET'
            })
        }),

        getStartSimulation: builder.query<any, number>({
            query: (simulationId) => `/job/simulation/${simulationId}/start`
        })
    })
});

export const {
    useGetLeaderboardsQuery,
    useGetLeaderboardQuery,
    useUpdateLeaderboardMutation,
    useGetJobApplicationsQuery,
    useCreateJobApplicationMutation,
    useGetJobSimulationsQuery,
    useGetJobCategoriesQuery,
    useGetJobSkillsQuery,
    useGetInterviewQuestionsQuery,
    useGetInterviewAnswersQuery,
    useGetStartSimulationQuery
} = api;
