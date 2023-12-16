import React from "react";
import "./styles.css";
import logo_JR_light from "../../assets/logo_JR_light.png";
import { useLogin } from "../../contexts/Login";
import { useState } from "react";
import { useNavigate } from "react-router";
import logoutIcon from "../../assets/logout_icon.png";
import plusIcon from "../../assets/plus_icon.png";
const Header = () => {
    //const admins = ['6539ac2fc0937416b496a323']
    const admins = process.env.REACT_APP_ADMIN_IDS.split(',').map((id) => id.replace('"', '').replace('"', ''));
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
            <img src={logo_JR_light} alt="logo_JR_light" className="logo_JR_light"/>
            <div className="titleBox">                
            <h1 className="title">José Ricardo</h1>
            <h2 className="subtitle">Nutrição Exportiva</h2>
            </div>
            </div>
            {isAdmin&&loggedUserId?(<img src={plusIcon} alt="PlusIcon" className="plusIcon" onClick={()=>navigate("/insertFood")}/>):null}
            {!isAdmin&&!loggedUserId?(<img src={plusIcon} alt="PlusIcon" className="plusIconFake"/>):null}
        </div>
    );
};

export default Header;