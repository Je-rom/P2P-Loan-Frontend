import { create, StateCreator } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

export type AuthState = {
    token?: string;
    //   refreshToken?: string;
    user?: User;
};

export type AuthActions = {
    setToken: (authToken: string) => void;
    //   setRefreshToken: (refreshToken: string) => void;
    clearAuth: () => void;
    setUser: (user: User) => void;
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
    setToken: (authToken: string) => set({ token: authToken }),
    clearAuth: () =>
        set({
            token: undefined,
            user: undefined,
        }),
    setUser: (user: User) => {
        set({
            user: user,
        });
    },
});

const persistedAuthState = persist<AuthState & AuthActions>(initializer, {
    name: 'auth',
});

export const useAuthState = create<
    AuthState & AuthActions,
    [['zustand/persist', AuthState & AuthActions]]
>(persistedAuthState);