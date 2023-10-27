import { useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
const InsertFood = () => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [proteins, setProteins] = useState(null);
    const [fats, setFats] = useState(null);
    const [classe, setClasse] = useState("");
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
        <div>
            <h1>InsertFood</h1>
            <h2>Valores para 100g</h2>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Cadastrar</button>    
            <Link to={"/swapFood"}>Voltar</Link>
        </form>
        </div>
    );
};

export default InsertFood;
