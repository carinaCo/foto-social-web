// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    userId: string | null;
    login: (id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(() => {
        // Load from localStorage on initial load
        return localStorage.getItem("userId");
    });

    const login = (id: string) => {
        setUserId(id);
        localStorage.setItem("userId", id);
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem("userId");
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
