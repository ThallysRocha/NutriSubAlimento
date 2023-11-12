import "./styles.css"
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
    return (
        <div {...props} className={misses.includes(group) && !!misses?"foodCardMissing":"foodCard"}>
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