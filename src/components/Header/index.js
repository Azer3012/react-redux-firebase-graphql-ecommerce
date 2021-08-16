import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/ecommerce.png";
import { auth } from "../../firebase/utils";
import "./styles.scss";
function Header({ user }) {

  //app.jsden gonderdiyim state eger currentUser varsa log out duymesi olur ve ad soyad yazilir
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt={Logo} />
          </Link>
        </div>
        <div className="register-login">
          {!user && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}

          {user&&(
            <ul>
              <li>
                
              <span>{user.displayName}</span>
              </li>
              <li>
                <span onClick={()=>auth.signOut()}>log out</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
