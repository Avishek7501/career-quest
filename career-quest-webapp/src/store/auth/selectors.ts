// src/store/auth/selectors.ts
import { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) =>
    Boolean(state.auth.isAuthenticated);
