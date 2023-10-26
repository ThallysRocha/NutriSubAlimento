import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLogin } from "../../contexts/Login";

const Login = () => {
    const { handleLogin, loggedUserId } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);
    };
    useEffect(() => {
        if (loggedUserId) navigate("/swapFood");
    }, [loggedUserId, navigate]);

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    autoComplete="off"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    autoComplete="off"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/register">Cadastro</Link>
        </div>
    );
};

export default Login;