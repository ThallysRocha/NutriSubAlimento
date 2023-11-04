import { useState } from "react";
import { api } from "../../services/api";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
const InsertFood = () => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [proteins, setProteins] = useState(null);
    const [fats, setFats] = useState(null);
    const [classe, setClasse] = useState("");
    const navigate = useNavigate();
    const resetStates = () => {
        setName("");
        setCalories("");
        setCarbs("");
        setProteins("");
        setFats("");
        setClasse("");
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !calories || !carbs || !proteins || !fats || !classe) {alert("Preencha todos os campos"); return; }
        try {
            const response = api.post("/food", {
                name,
                calories,
                carbs,
                proteins,
                fats,
                "class":classe,
            });
            response
                .then((result) => {
                    alert("Cadastrado com sucesso");
                    console.log(result);
                    resetStates();

                })
                .catch((error) => {
                    alert("Erro ao cadastrar");
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
            alert("Erro ao cadastrar");
        }
    };
    return (
        <div className="container">
        <Header />
        <form onSubmit={handleSubmit} className="form">
            <h1>Inserir Nova Comida</h1>
            <h2>Valores para 100g</h2>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value.toLowerCase())}
            />
            <input
                type="number"
                placeholder="Calorias"
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
            />
            <input
                type="number"
                placeholder="Carboidratos"
                value={carbs}
                onChange={(event) => setCarbs(event.target.value)}
            />
            <input
                type="number"
                placeholder="Proteínas"
                value={proteins}
                onChange={(event) => setProteins(event.target.value)}
            />
            <input
                type="number"
                placeholder="Gorduras"
                value={fats}
                onChange={(event) => setFats(event.target.value)}
            />
            <input
                type="text"
                placeholder="Classe"
                value={classe}
                onChange={(event) => setClasse(event.target.value.toLowerCase())}
            />
            <div className="buttons">                
            <button className="secondaryButton" onClick={()=>navigate("/swapFood")}>Cancelar</button>
            <button type="submit" className="primaryButton">Cadastrar</button>    
            </div>
        </form>
        </div>
    );
};

export default InsertFood;
