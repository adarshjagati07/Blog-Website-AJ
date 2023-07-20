import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
   background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
`;
const Container = styled(Toolbar)`
   justify-content: center;
   & > a {
      color: #0e2954;
      text-decoration: none;
   }
`;
const LeftNav = styled(Typography)`
   & > a {
      padding: 20px;
      color: #0e2954;
      text-decoration: none;
   }
   margin-right: auto;
`;

const Header = () => {
   return (
      <Component>
         <Container>
            <LeftNav>
               <Link to="/">Home</Link>
               <Link to="/about">About</Link>
               <Link to="/contact">Contact</Link>
            </LeftNav>
            <Link to="/login">Logout</Link>
         </Container>
      </Component>
   );
};

export default Header;
