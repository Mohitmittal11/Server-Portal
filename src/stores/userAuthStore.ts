import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  _id: string;
  username: string;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  isDelete: boolean;
  isVerified: boolean;
  date: string;
  time: string;
  accessToken: string;
}
const InitialAuth = {
  _id: "",
  username: "",
  email: "",
  role: "",
  isActive: true,
  isDelete: false,
  isVerified: true,
  date: "",
  time: "",
  accessToken: "",
};

interface AuthState {
  authData: AuthData | null;
  setAuthData: (authData: AuthData | null) => void;
}
const useUserAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authData: InitialAuth,
      setAuthData: (authData) =>
        set({
          authData,
        }),
    }),
    {
      name: "user-auth-storage",
    }
  )
);

export default useUserAuthStore;
