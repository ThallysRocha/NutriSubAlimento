import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLogin } from "../../contexts/Login";
import "./styles.css";
import Header from "../../components/Header";
import userIcon from "../../assets/user_icon.png";

const Login = () => {
    const { handleLogin, loggedUserId } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) return;

        handleLogin(email, password);
    };
    useEffect(() => {
        if (!!loggedUserId) navigate("/swapFood");
        
    }, [loggedUserId, navigate]);

    return(
        <>
        <div className="container">
            <Header/>
            <form onSubmit={handleSubmit} className="form">
                <img src={userIcon} alt="userIcon" className="userIcon"/>
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
        </>
    );
};

export default Login;