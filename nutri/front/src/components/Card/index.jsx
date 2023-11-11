import "./styles.css"
const Card = ({
    name,
    calories,
    carbs,
    proteins,
    fats,
    group,
    ...props
}) => {
    return (
        <div {...props} className="foodCard">
            <label>Nome: {name} </label>
            <label>Calorias: {calories} </label>
            <label>Carboidratos: {carbs} </label>
            <label>Proteínas: {proteins} </label>
            <label>Gorduras: {fats} </label>
            <label>Classe: {group} </label>
        </div>
    );
}
export default Card;