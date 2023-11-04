import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import Header from "../../components/Header";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) return;
        
        try {
            const response = await api.post("/user", {
                name,
                email,
                password,
            });
            alert("Cadastrado com sucesso");
            console.log(response);
            navigate("/login");
        } catch (error) {
            if (error.response.data.error === "User already exists")
            alert("Email já está em uso!");
          else{
            console.log(error);
            alert("Erro ao cadastrar");}
        }
    }
    return (
        <div className="container">
            <Header />
            {/* <h1>Register</h1> */}
            <form onSubmit={handleSubmit} className="form">
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
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Register;