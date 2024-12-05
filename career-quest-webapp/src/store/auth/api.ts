import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import environments from '../../configs/environments';

import { AUTH_REFRESH_TAG, AUTH_TAG_TYPES } from './types';
import { CreateUser, UserLogin } from '@/models/dtos/CreateUser';

export const AUTH_REDUCER_PATH = 'authApi';

let token: string | null = null;
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    token = storedToken;
}

export const authApi = createApi({
    reducerPath: AUTH_REDUCER_PATH,
    tagTypes: [AUTH_TAG_TYPES, AUTH_REFRESH_TAG],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({
        baseUrl: environments.API_ENDPOINT_HOST,
        credentials: 'include',
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStatus: builder.query<any, void>({
            query: () => ({
                url: `/auth/status`,
                method: 'GET'
            }),
            providesTags: [AUTH_REFRESH_TAG]
        }),
        register: builder.mutation<any, CreateUser>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body: body
            }),
            invalidatesTags: [AUTH_TAG_TYPES]
        }),
        login: builder.mutation<any, UserLogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body: body
            }),
            invalidatesTags: [AUTH_TAG_TYPES],
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    token = data.token; // Store the token for subsequent requests
                    localStorage.setItem('authToken', token ?? '');
                } catch (error) {
                    console.error('Login failed', error);
                }
            }
        }),
        logout: builder.mutation<any, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST'
            }),
            invalidatesTags: [AUTH_REFRESH_TAG],
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    token = null; // Clear the token on logout
                    localStorage.removeItem('authToken');
                } catch (error) {
                    console.error('Logout failed', error);
                }
            }
        })
    })
});

export const {
    useGetStatusQuery,
    useLazyGetStatusQuery,
    useLogoutMutation,
    useLoginMutation,
    useRegisterMutation
} = authApi;
