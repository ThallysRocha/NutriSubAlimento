import React from "react";
import "./styles.css";
import foodIcon from "../../assets/food_icon.png";
const Header = () => {

    return (
        <div className="header">
            <img src={foodIcon} alt="foodIcon" className="foodIcon"/>
            <h1 className="title">NutriApp</h1>
        </div>
    );
};

export default Header;