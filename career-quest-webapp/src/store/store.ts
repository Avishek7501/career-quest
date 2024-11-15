/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import environments from '../configs/environments';
import { RESET_STATE_ACTION_TYPE } from './actions/resetState';
import { authApi } from './auth/api';
import authSlice from './auth/slice';
import { api } from './api/api';

const middlewares = [authApi.middleware, api.middleware];

const reducers = {
    [authSlice.reducerPath]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
    if (action.type === RESET_STATE_ACTION_TYPE) {
        state = {} as RootState;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(middlewares),
    // @ts-ignore
    preloadedState: {},
    devTools: !environments.IS_IN_PRODUCTION_MODE
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;

setupListeners(store.dispatch);
