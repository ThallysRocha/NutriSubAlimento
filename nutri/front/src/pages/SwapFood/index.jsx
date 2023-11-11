import { useEffect, useState } from "react";
import { api } from '../../services/api';
import "./styles.css";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLogin } from "../../contexts/Login";
import Header from "../../components/Header";
import Card from "../../components/Card";
const SwapFood = () => {
    //const admins = ['6539ac2fc0937416b496a323']
    const admins = process.env.REACT_APP_ADMIN_IDS.split(',').map((id) => id.replace('"', '').replace('"', ''));
    const { loggedUserId} = useLogin();
    const [foods, setFoods] = useState([]);
    const [options, setOptions] = useState([]);
    const [optionsRecomended, setOptionsRecomended] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedFoodName, setSelectedFoodName] = useState(null);
    const [newFoodName, setNewFoodName] = useState(null);
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
    
    const getFoodAtributes = (foodName) => {
        if (!foodName) return null;
        const food = foods.find((food) => food.name === foodName);
        return food;
    }
    const getFoodClass = (foodName) => {
        if (!foodName) return null;
        const food = getFoodAtributes(foodName);
        return food.class;
    }
    const getFoodsAtributes = (foodsNames) => {
        if (!foodsNames) return [];
        const foodsFiltered = foods.filter((food) => foodsNames.includes(food.name));
        return foodsFiltered;
    }
    const getFoodsClasses = (foodsNames) => {
        if (!foodsNames) return [];
        const food = getFoodsAtributes(foodsNames);
        const foodsClasses = food.map((food) => food.class).map((food)=>food.toLowerCase());
        return [...new Set(foodsClasses)];
    }
    const handleSwap =  (event) => {
        event.preventDefault();
        if(!selectedFoodName.length||!newFoodName.length){
            alert("Você precisa selecionar comidas!");
            return;
        }
        const selectedFoodsClasses = getFoodsClasses(selectedFoodName);
        const newFoodsClasses = getFoodsClasses(newFoodName);
        //console.log(selectedFoodsClasses,newFoodsClasses);
        const missmatchesSelected = selectedFoodsClasses.filter((selectedFoodClass)=>!newFoodsClasses.includes(selectedFoodClass));
        const missmatchesNew = newFoodsClasses.filter((newFoodClass)=>!selectedFoodsClasses.includes(newFoodClass));
        //console.log(missmatchesSelected.length,missmatchesNew.length);
        if(missmatchesSelected.length && missmatchesNew.length){
            let missmatchesStringSelected = missmatchesSelected[0]
            for(let i=1;i<missmatchesSelected.length;i++){
                if(i === missmatchesSelected.length - 1){
                    missmatchesStringSelected = missmatchesStringSelected + ', e '+ missmatchesSelected[i];
                }
                else{

                    missmatchesStringSelected = missmatchesStringSelected + ', '+ missmatchesSelected[i];
                }
            }
            missmatchesStringSelected += ', ';

            let missmatchesStringNew = missmatchesNew[0]
            for(let i=1;i<missmatchesNew.length;i++){
                if(i === missmatchesNew.length - 1){
                    missmatchesStringNew = missmatchesStringNew + ', e '+ missmatchesNew[i];
                }
                else{

                    missmatchesStringNew = missmatchesStringNew + ', '+ missmatchesNew[i];
                }
            }
            missmatchesStringNew += '. ';
            
            alert("Está faltando " + missmatchesStringSelected + "e foi acrescentado " + missmatchesStringNew + "Essa não foi uma boa troca, no futuro tente fazer trocas de comidas da mesma classe.");
        }
        else if(missmatchesSelected.length){
            let missmatchesString = missmatchesSelected[0]
            for(let i=1;i<missmatchesSelected.length;i++){
                if(i === missmatchesSelected.length - 1){
                    missmatchesString = missmatchesString + ', e '+ missmatchesSelected[i] ;
                }
                else{

                    missmatchesString = missmatchesString + ', '+ missmatchesSelected[i];
                }
            }
            missmatchesString += '. ';
            alert("Está faltando " + missmatchesString + "Tudo bem, mas no futuro tente fazer trocas de comidas da mesma classe.");
        }
        else if(missmatchesNew.length){
            let missmatchesString = missmatchesNew[0]
            for(let i=1;i<missmatchesNew.length;i++){
                if(i === missmatchesNew.length - 1){
                    missmatchesString = missmatchesString + ', e '+ missmatchesNew[i];
                }
                else{

                    missmatchesString = missmatchesString + ', '+ missmatchesNew[i];
                }
            }
            missmatchesString += '. ';
            alert("Está acrescentando " + missmatchesString + "Tudo bem, mas no futuro tente fazer trocas de comidas da mesma classe.");
        }
        else{
            alert("Muito bem, troca válida!")
        }
        
    }
    const handleChangeSelectedFood = (event,value) => {
        //console.log(value);
        const selectedFoodNameAux = value.map((food) => food.label);
        setSelectedFoodName(selectedFoodNameAux);
        const selectedFoodsClasses = getFoodsClasses(selectedFoodNameAux);
        //const optionsRecomendedAux = options.filter((food) => (selectedFoodsClasses.includes(getFoodClass(food.label).toLowerCase())));
        //console.log(selectedFoodsClasses,selectedFoodNameAux,optionsRecomendedAux);

        //setOptionsRecomended(optionsRecomendedAux);
        const newFoodsClasses = getFoodsClasses(newFoodName);
        //console.log(selectedFoodsClasses,newFoodsClasses);
        const missmatchesSelected = selectedFoodsClasses.filter((selectedFoodClass)=>!newFoodsClasses.includes(selectedFoodClass));
        
    }
    const handleChangeNewFood = (event,value) => {
        //console.log(value);
        const newFoodNameAux = value.map((food) => food.label);
        setNewFoodName(newFoodNameAux);

        const selectedFoodsClasses = getFoodsClasses(selectedFoodName);
        const newFoodsClasses = getFoodsClasses(newFoodName);
        //console.log(selectedFoodsClasses,newFoodsClasses);        
        const missmatchesNew = newFoodsClasses.filter((newFoodClass)=>!selectedFoodsClasses.includes(newFoodClass));
        

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
                    onChange={(event,value) => handleChangeSelectedFood(event,value)}
                    id="oldFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Comida na dieta" />}
                  />
                  <Autocomplete                  
                    className="autocomplete"
                    multiple
                    onChange={(event, value) => handleChangeNewFood(event,value)}
                    disablePortal
                    id="newFood"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Nova comida" />}
                  />
            <button type="submit" className="primaryButton">Trocar</button>
            </form>
            <div className="foodCardsSeparator">
                {selectedFoodName?<div className="foodCards"> Comidas da dieta: <br/> <br/>{getFoodsAtributes(selectedFoodName).map((food)=>
                <Card 
                name={food.name}
                calories={food.calories}
                carbs={food.carbs}
                proteins={food.proteins}
                fats={food.fats}
                group={food.class}
                key={food.name}
                />)}</div>:""}
                {newFoodName?<div className="foodCards"> Comidas novas: <br/> <br/>{getFoodsAtributes(newFoodName).map((food)=>
                <Card 
                name={food.name}
                calories={food.calories}
                carbs={food.carbs}
                proteins={food.proteins}
                fats={food.fats}
                group={food.class}
                key={food.name}
                />)}</div>:""}
            </div>
        </div>
    );
}

export default SwapFood;