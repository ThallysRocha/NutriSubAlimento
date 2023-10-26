import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            console.log(error);
            alert("Erro ao cadastrar");
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
                    onChange={(event) => setPassowrd(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Register;