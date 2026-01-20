declare module '..store/authStore' {
    export const useAuthStore: () => {
      isAuthenticated: Ref<boolean>;
      validateToken: () => Promise<void>;
      logout: () => void;
    };
  }