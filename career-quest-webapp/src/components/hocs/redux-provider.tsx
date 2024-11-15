'use client';

import { Provider } from 'react-redux';

import { persistor, store } from '../../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from '@/context/auth-provider';

export default function ReduxProvider({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <PersistGate loading={<>Loading...</>} persistor={persistor}>
                <AuthProvider>
                    <>{children}</>
                </AuthProvider>
            </PersistGate>
        </Provider>
    );
}
