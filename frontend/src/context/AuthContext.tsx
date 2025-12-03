import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  userRole: "admin" | "client" | null;
  userName: string | null;
  userImage: string | null;
  login: (
    token: string,
    role: "admin" | "client",
    name: string,
    avatar: string
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userRole: null,
  userName: null,
  userImage: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState<"admin" | "client" | null>(
    (localStorage.getItem("role") as "admin" | "client") || null
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userImage, setUserImage] = useState(localStorage.getItem("userImage"));

  const login = (
    token: string,
    role: "admin" | "client",
    name: string,
    avatar: string
  ) => {

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userImage", avatar);

    setToken(token);
    setUserRole(role);
    setUserName(name);
    setUserImage(avatar);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserRole(null);
    setUserName(null);
    setUserImage(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, userRole, userName, userImage, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
