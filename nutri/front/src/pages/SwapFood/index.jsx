import { useEffect, useState } from "react";
import { api } from '../../services/api';
import "./styles.css";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLogin } from "../../contexts/Login";
import Header from "../../components/Header";
const SwapFood = () => {
    const admins = ['6539ac2fc0937416b496a323']
    const { loggedUserId} = useLogin();
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
        <div className="container">
            <Header/>
            <form onSubmit={handleSwap} className="form">
            <h1>Substituir comida</h1>

            <Autocomplete
            className="autocomplete"
                    disablePortal
                    multiple
                    id="oldFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Comida na dieta" />}
                  />
                  <Autocomplete                  
                    className="autocomplete"
                    multiple
                    disablePortal
                    id="newFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Nova comida" />}
                  />
            <button onClick={handleSwap} className="primaryButton">Trocar</button>

            </form>
        </div>
    );
}

export default SwapFood;