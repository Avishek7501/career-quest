import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import environments from '../../configs/environments';
import { API_PATH, API_TAG_TYPES } from './types';
import { AUTH_REFRESH_TAG, AUTH_TAG_TYPES } from '../auth/types';

let token: string | null = null;
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    token = storedToken;
}

export const api = createApi({
    reducerPath: API_PATH,
    tagTypes: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES],
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
            query: () => ({ url: '/leaderboard', method: 'GET' }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
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
        updateLeaderboardScore: builder.mutation<any, any>({
            query: (data) => ({
                url: '/leaderboard/score/update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
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
            query: () => ({ url: '/job/simulation', method: 'GET' }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),

        // JobCategory CRUD
        getJobCategories: builder.query<any[], void>({
            query: () => ({ url: '/job/category', method: 'GET' }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),

        // JobSkill CRUD
        getJobSkills: builder.query<any[], void>({
            query: () => ({ url: '/job/skill', method: 'GET' }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),
        getInterviewQuestions: builder.query<
            any[],
            { jobSimulationId: number }
        >({
            query: ({ jobSimulationId }) => ({
                url: `/job/simulation/${jobSimulationId}/questions`,
                method: 'GET'
            }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),

        // Fetch possible answers for an interview question
        getInterviewAnswers: builder.query<
            any[],
            { interviewQuestionId: number }
        >({
            query: ({ interviewQuestionId }) => ({
                url: `/interview/question/${interviewQuestionId}/answers`,
                method: 'GET'
            }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),

        getStartSimulation: builder.query<any, number>({
            query: (simulationId) => `/job/simulation/${simulationId}/start`,
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
        }),

        // Account Management
        getProfile: builder.query<any, string | number>({
            query: (userId) => ({
                url: `/auth/profile/${userId}`,
                method: 'GET'
            }),
            providesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
            //providesTags: ['UserProfile'] // Add tag for cache handling
        }),
        updateProfile: builder.mutation<any, any>({
            query: (profileData) => ({
                url: `/auth/profile/me`,
                method: 'PUT',
                body: profileData
            })
            //invalidatesTags: ['UserProfile'] // Invalidate cache to reflect updates
        }),
        updatePassword: builder.mutation<any, any>({
            query: (passwordData) => ({
                url: `/auth/password`,
                method: 'PUT',
                body: passwordData
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST'
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('authToken'); // Clear token on logout
                } catch (error) {
                    console.error('Logout failed', error);
                }
            },
            invalidatesTags: [API_TAG_TYPES, AUTH_REFRESH_TAG, AUTH_TAG_TYPES]
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
    useUpdateLeaderboardScoreMutation,
    useGetStartSimulationQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useLogoutMutation
} = api;
