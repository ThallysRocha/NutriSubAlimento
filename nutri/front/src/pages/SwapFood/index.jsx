import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLogin } from "../../contexts/Login";
const SwapFood = () => {
    const { loggedUserId, handleLogout } = useLogin();
    const [foods, setFoods] = useState([]);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getFoods = async () => {
            try{
                const response = await api.get("/food");
                setFoods(response.data.foods);
                foods.map((food,index,foods) => (
                    console.log(food.name,index)
                ));
            } catch (error) {
                console.log(error);
                alert("Erro ao buscar comidas");
            }            
        };
        if (loggedUserId && foods.length === 0){
            getFoods();
            
        }
    }, [loggedUserId]);
    
        if(foods.length > options.length){
            const optionsAux = [...options];
            foods.map((food,index) => (
                optionsAux.push({ label: food.name, id: index }))
            
            );
            setOptions(optionsAux);
        }
    return (
        <div>
            <Link to="/insertFood">Inserir Comida</Link>
            
            <select name="Comidas" id="foods">
                {foods.length?(foods.map((food,i) => (                    
                    <option key={i} value={food.id}>{food.name}</option>
                ))):(<option value={""}>{"Nenhuma comida encontrada"}</option>)}
            </select>
            <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Comida" />}
                  />
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default SwapFood;