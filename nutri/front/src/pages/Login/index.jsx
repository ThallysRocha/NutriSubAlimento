import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../contexts/Login";
import "./styles.css";
import Header from "../../components/Header";
import userIcon from "../../assets/user_icon.png";
import Spinner from "../../components/Spinner";

const Login = () => {
    const { handleLogin, loggedUserId, loading} = useLogin();
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
        <div className="container">
            <Header/>
            <form onSubmit={handleSubmit} className="form">
                <img src={userIcon} alt="userIcon" className="userIcon"/>
                <input
                    disabled={loading}
                    autoComplete="off"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    disabled={loading}
                    autoComplete="off"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" className="primaryButton" disabled={loading}>Entrar</button>
                {loading && <Spinner/>}
            </form>
            <button onClick={()=>navigate("/Register")} className="secondaryButton" disabled={loading}>Criar Conta</button>

        </div>
    );
};

export default Login;