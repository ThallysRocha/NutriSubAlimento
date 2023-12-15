import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import Spinner from "../../components/Spinner";
import "./styles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) return;
        
        try {
            setLoading(true);
            const response = await api.post("/user", {
                name,
                email,
                password,
            });
            setLoading(false);
            alert("Cadastrado com sucesso");
            console.log(response);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            if (error.response.data.error === "User already exists")
            alert("Email já está em uso!");
          else{
            console.log(error);
            alert("Erro ao cadastrar");}
        }
    }
    return (
        <div className="container">
            {/* <h1>Register</h1> */}
            <form onSubmit={handleSubmit} className="form" >
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {loading && <Spinner/>}              
                <button type="submit" className="primaryButton" disabled={loading}>Cadastrar</button> 
            </form>
            <button className="secondaryButton" onClick={()=>navigate("/login")} disabled={loading}>Já tenho conta</button>
        </div>
    );
};

export default Register;