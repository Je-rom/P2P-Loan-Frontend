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

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
};

const clearCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
  setToken: (authToken: string) => {
    // Save token to zustand state
    set({ token: authToken });

    // Save token to cookie (for use in middleware)
    setCookie('token', authToken, 7); // Expires in 7 days
  },
  clearAuth: () => {
    set({
      token: undefined,
      user: undefined,
    });

    // Clear cookies
    clearCookie('token');
    clearCookie('user');
  },
  setUser: (user: User) => {
    set({ user });

    // Save user data as a stringified JSON object in cookies
    setCookie('user', JSON.stringify(user), 7); // Expires in 7 days
  },
});

const persistedAuthState = persist<AuthState & AuthActions>(initializer, {
  name: 'auth',
});

export const useAuthState = create<
  AuthState & AuthActions,
  [['zustand/persist', AuthState & AuthActions]]
>(persistedAuthState);
