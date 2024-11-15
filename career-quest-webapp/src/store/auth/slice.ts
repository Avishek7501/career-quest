import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
    token: null,
    isAuthenticated: false
};

export const slice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        clearToken(state) {
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

const authReducer = persistReducer(
    {
        key: 'rtk:auth',
        storage,
        whitelist: ['value']
    },
    slice.reducer
);

const reducerObj = {
    reducerPath: slice.name,
    reducer: authReducer
};

export const { setToken, clearToken } = slice.actions;

export default reducerObj;

export const selectAuth = (state: any) => state.auth;
