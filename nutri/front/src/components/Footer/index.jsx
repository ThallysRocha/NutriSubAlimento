import React from "react";
import "./styles.css";
import instagram_icon from "../../assets/instagram_icon.png";
import email_icon from "../../assets/email_icon.png";
import phone_icon from "../../assets/phone_icon.png";
import site_icon from "../../assets/site_icon.png";
const Footer = () => {
    return (
        <div className="footer">
            <div>
                <img className="footer-icon" src={instagram_icon} alt="instagram_icon" />
                <p className="instagram">Instagram <br /><a href="https://www.instagram.com/josericardonutricao">@josericardonutricao</a></p>
            </div>
            <div>
                <img className="footer-icon" src={email_icon} alt="email_icon" />
                <p className="email">Email<a href="mailto:josericardocampos@gmail.com">josericardocampos@gmail.com</a></p>
            </div>
            <div>
                <img className="footer-icon" src={phone_icon} alt="phone_icon" />
                <p className="phone">Telefone <a href="https://wa.me/5581986694811">(81) 98669-4811</a></p>
            </div>
            <div>
                <img className="footer-icon" src={site_icon} alt="site_icon" />
                <p className="site">Site <a href="http://www.josericardonutricao.com.br/">www.josericardonutricao.com.br</a></p>
            </div>
            
        </div>
    );
}
export default Footer;