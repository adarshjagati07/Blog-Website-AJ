import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
   background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
`;
const Container = styled(Toolbar)`
   justify-content: center;
   & > a {
      padding: 20px;
      color: #0e2954;
      text-decoration: none;
   }
`;

const Header = () => {
   return (
      <Component>
         <Container>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Logout</Link>
         </Container>
      </Component>
   );
};

export default Header;
