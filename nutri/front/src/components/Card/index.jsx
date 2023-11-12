import "./styles.css"
import Slider from '@mui/material/Slider';
import { useState } from "react";

const Card = ({
    name,
    calories,
    carbs,
    proteins,
    fats,
    group,
    misses=[],
    ...props
}) => {
    const [value, setValue] = useState(100);
    return (
        <div {...props} className={misses.includes(group) && !!misses?"foodCardMissing":"foodCard"}>
            <label>Nome: {name} </label>
            <label>Calorias: {((value/100)*calories).toFixed(2)} </label>
            <label>Carboidratos: {((value/100)*carbs).toFixed(2)} </label>
            <label>Proteínas: {((value/100)*proteins).toFixed(2)} </label>
            <label>Gorduras: {((value/100)*fats).toFixed(2)} </label>
            <label>Classe: {group} </label>
            <label ><br /> Quantidade de gramas: <Slider
                defaultValue={100}
                aria-label="Default"
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={1000}
                onChange={(event, newValue) => {    
                    setValue(newValue);
                }}
                /></label>
            
        </div>
    );
}
export default Card;