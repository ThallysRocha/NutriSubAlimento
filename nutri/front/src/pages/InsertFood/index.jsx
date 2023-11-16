import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import Autocomplete from '@mui/material/Autocomplete';
import { useLogin } from "../../contexts/Login";
const InsertFood = () => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [proteins, setProteins] = useState(null);
    const [fats, setFats] = useState(null);
    const [classe, setClasse] = useState("");
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [foods, setFoods] = useState([]);
    const { loggedUserId} = useLogin();
    useEffect(() => {
        try {
            setLoading(true);
            if (loggedUserId) {

                const response = api.get("/food");
                response
                    .then((result) => {
                        setFoods(result.data.foods.map((food)=>food.class.toLowerCase()));
                        console.log([...new Set(result.data.foods.map((food)=>food.class.toLowerCase()))].map((food)=>({label:food})));
                        setClasses([...new Set(result.data.foods.map((food)=>food.class.toLowerCase()))].map((food)=>({label:food})));
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [loggedUserId]);
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
            if (loggedUserId) {
            setLoading(true);
            const response = api.post("/food", {
                "name":name.toLowerCase(),
                calories,
                carbs,
                proteins,
                fats,
                "class":classe.toLowerCase(),
            });
            response
                .then((result) => {
                    setLoading(false);
                    alert("Cadastrado com sucesso");
                    console.log(result);
                    resetStates();

                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response.data.error === "Food already exists")
                        alert("Comida já foi cadastrada anteriormente!");
                    else
                    {alert("Erro ao cadastrar"); console.log(error);}
                });
            }
        } catch (error) {
            setLoading(false);
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
            <Autocomplete      
                    onInputChange={(event, newInputValue) => {
                        //console.log(newInputValue,classes);
                        setClasse(newInputValue);
                        }}
                    freeSolo
                    inputValue={classe}
                    id="newFood"
                    options={classes}
                    sx={{ 
                            width: '100%',
                            height: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                     }}
                     renderInput={(params) => (
                        <div ref={params.InputProps.ref} className="autocomplete">
                          <input type="text" placeholder="Classe" {...params.inputProps} />
                        </div>
                    )}
                  />
            <div className="buttons">                
            <button className="secondaryButton" onClick={()=>navigate("/swapFood")} disabled={loading}>Cancelar</button>
            {loading && <Spinner/>}
            <button type="submit" className="primaryButton" disabled={loading}>Cadastrar</button>    
            </div>
        </form>
        </div>
    );
};

export default InsertFood;
