import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            const { user: userData, token } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Redirect after login based on role
            if (userData.role === "admin") navigate("/admin/dashboard");
            else navigate("/employee/dashboard");
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}