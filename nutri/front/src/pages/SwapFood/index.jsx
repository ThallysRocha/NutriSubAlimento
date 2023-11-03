import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLogin } from "../../contexts/Login";
const SwapFood = () => {
    const admins = ['6539ac2fc0937416b496a323']
    const { loggedUserId, handleLogout } = useLogin();
    const [foods, setFoods] = useState([]);
    const [options, setOptions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const getFoods = async () => {
            try{
                const response = await api.get("/food");
                setFoods(response.data.foods);
                // foods.map((food,index,foods) => (
                //     console.log(food.name,index)
                // ));
            } catch (error) {
                console.log(error);
                alert("Erro ao buscar comidas");
            }            
        };
        if (loggedUserId){
            getFoods();
            
        }
        // console.log(loggedUserId,foods.length,foods);
        // console.log(options);
        
    }, [loggedUserId]);
    if(admins.includes(loggedUserId) && !isAdmin){
        setIsAdmin(true);
    }
        if(foods.length > options.length){
            const optionsAux = [...options];
            foods.map((food,index) => (
                optionsAux.push({ label: food.name, id: index }))
            
            );
            setOptions(optionsAux);
        }
    
    const handleSwap =  () => {
        const oldFoodName = document.getElementById('oldFood').value;
        const newFoodName = document.getElementById('newFood').value;
        const oldFood = foods.find((food) => food.name === oldFoodName);
        const newFood = foods.find((food) => food.name === newFoodName);
        console.log(oldFood,newFood);
        
    }
    return (
        <div>
            {isAdmin?(<Link to="/insertFood">Inserir Comida</Link>):null}
            <h1>SwapFood</h1>
            <Autocomplete
                    disablePortal
                    id="oldFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Comida na dieta" />}
                  />
                  <Autocomplete
                    disablePortal
                    id="newFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Nova comida" />}
                  />
            <button onClick={handleSwap}>Trocar</button>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default SwapFood;