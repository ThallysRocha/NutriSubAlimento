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
        if (loggedUserId && foods.length === 0){
            getFoods();
            
        }
        // console.log(loggedUserId,foods.length,foods);
        // console.log(options);
        
    }, [loggedUserId,foods.length,foods,options]);
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
    
    
    return (
        <div>
            {isAdmin?(<Link to="/insertFood">Inserir Comida</Link>):null}
            <h1>SwapFood</h1>
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