import React from "react";
import "./styles.css";
import foodIcon from "../../assets/food_icon.png";
import { useLogin } from "../../contexts/Login";
import { useState } from "react";
import { useNavigate } from "react-router";
import logoutIcon from "../../assets/logout_icon.png";
import plusIcon from "../../assets/plus_icon.png";
const Header = () => {
    const admins = ['6539ac2fc0937416b496a323']
    const { loggedUserId, handleLogout } = useLogin();    
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    if(admins.includes(loggedUserId) && !isAdmin){
        setIsAdmin(true);
    }
    return (
        <div className="header">
            {loggedUserId?(<img src={logoutIcon} alt="LogoutIcon" className="logoutIcon" onClick={handleLogout}/>):null}
            
            <div className="logo">
            <img src={foodIcon} alt="foodIcon" className="foodIcon"/>
            <h1 className="title">NutriApp</h1>
            </div>
            {isAdmin?(<img src={plusIcon} alt="PlusIcon" className="plusIcon" onClick={()=>navigate("/insertFood")}/>):null}
            {!isAdmin?(<img src={plusIcon} alt="PlusIcon" className="plusIconFake"/>):null}
        </div>
    );
};

export default Header;