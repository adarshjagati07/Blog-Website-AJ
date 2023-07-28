import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <div id="headerContainer">
         <header id="appHeader">
            <Link to="/">
               <img src="/imgs/logo-bg.png" className="logo" alt="logo" />
            </Link>
            <nav>
               <ul className="nav_links">
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  <li>
                     <Link to="/about">About</Link>
                  </li>
                  <li>
                     <Link to="/contact">Contact</Link>
                  </li>
               </ul>
            </nav>
            <Link to="/login">
               <button>Logout</button>
            </Link>
         </header>
      </div>
   );
};

export default Header;
