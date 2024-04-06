import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../contexts/Login";
import "./styles.css";
import userIcon from "../../assets/JR_user_icon.png";
import nutriIcon from "../../assets/nutri_icon.png";
import patientIcon from "../../assets/patient_icon.png";
import Spinner from "../../components/Spinner";

const Login = () => {
    const { handleLogin, loggedUserId, loading, setLoggedUserId,isNutri, setIsNutri} = useLogin();
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
        isNutri?
            (<div className="container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="userIcon-box">
                    <img src={userIcon} alt="userIcon" className="userIcon"/>
                    </div>
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
                    <div className="buttons-login">
                        <button type="submit" className="primaryButton" disabled={loading}>Entrar</button>
                        <button onClick={()=>{setLoggedUserId("guest");navigate("/Swapfood");setIsNutri(false)}} className="secondaryButton">Entrar como paciente</button>
                    </div>
                    {loading && <Spinner/>}
                </form>
                <button onClick={()=>navigate("/Register")} className="secondaryButton" disabled={loading}>Criar Conta</button>
            </div>)
            :
            (<>
                <h2 >
                    Bem vindo(a)! 
                    <br/>
                    Para continuar, selecione uma opção:
                </h2>
                <div className="container"> 
                    <div className="container-buttons">
                        <div className="user-type" onClick={()=>{setLoggedUserId("guest");navigate("/Swapfood")}}>
                            <img src={patientIcon} alt="patient icon" />
                            <p className="user-type-label">Sou paciente</p>
                        </div>
                        <div className="user-type" onClick={()=>setIsNutri(true)}>
                            <img src={nutriIcon} alt="nutri icon" />
                            <p className="user-type-label">Sou nutri</p>
                        </div>       
                    </div>
                </div>
            </>)
        
    );
};

export default Login;