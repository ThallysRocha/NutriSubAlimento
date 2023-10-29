import { useContext, useEffect, useMemo } from "react";
import { useCallback } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";

const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [loggedUserId, setLoggedUserId] = useState("");

    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.clear();
        setLoggedUserId("");
        setAuthToken("");
        navigate("/login");
    }, [navigate]);

    useEffect(() => {
        const validateLogin = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) handleLogout();
            else{
              const response = await api.post("/auth/validate-token", undefined, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const { userId } = response.data;
              // console.log(userId);
              setAuthToken(token);
              setLoggedUserId(userId);

            }
          } catch (error) {
            handleLogout();
          }
        };
        if (!loggedUserId)
          validateLogin();
      }, [loggedUserId]);
      

    const handleLogin = useCallback(async (email, password) => {
        try {
          const body = { email, password };
          const response = await api.post("/auth/login", body);
          const { token, userId } = response.data;
            localStorage.setItem("token", token);
            setAuthToken(token);
            setLoggedUserId(userId);
            navigate("/swapFood");
        } catch (error) {
          if (error.response.data.error === "Invalid credentials")
            alert("Credenciais inválidas");
          else
            alert("Erro ao logar");
        }
    }, [navigate]);
    

    const value = useMemo(
        () => ({
            loggedUserId,
            setLoggedUserId,
            handleLogin,
            handleLogout,
        }),
        [loggedUserId, handleLogin, handleLogout]
    );

    return (
        <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error("useLogin must be used within a LoginProvider");
    return context;
  };