import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState } from "react";

//for CSS styling in material ui
const Component = styled(Box)`
   width: 400px;
   margin: auto;
   box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Wrapper = styled(Box)`
   padding: 25px 35px;
   display: flex;
   flex: 1;
   flex-direction: column;
   & > div,
   & > button,
   & > p {
      margin-top: 20px;
   }
`;
const Image = styled(`img`)({
   width: 100,
   display: `flex`,
   margin: `auto`,
   padding: `50px 0 0`,
});
const LoginButton = styled(Button)`
   text-transform: none;
   background: #fb641b;
   height: 50px;
   border-radius: 2px;
`;

const Text = styled(Typography)`
   color: #878787;
   font-size: 16px;
`;

const SignupButton = styled(Button)`
   text-transform: none;
   background: #fff;
   color: #2874f0;
   height: 50px;
   border-radius: 2px;
   box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Login = () => {
   const imageURL =
      "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
   const [account, toggleAccount] = useState(`login`); //for default state
   const toggleSignup = () => {
      account === `signup` ? toggleAccount(`login`) : toggleAccount(`signup`);
   };

   return (
      <Component>
         <Box>
            <Image src={imageURL} alt="login" />
            {account === `login` ? (
               <Wrapper>
                  <TextField variant="standard" label="Enter Username" />
                  <TextField
                     variant="standard"
                     id="outlined-password-input"
                     label="Enter Password"
                     type="password"
                     autoComplete="current-password"
                  />
                  <LoginButton variant="contained">Login</LoginButton>
                  <Text style={{ textAlign: `center` }}>OR</Text>
                  <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
               </Wrapper>
            ) : (
               <Wrapper>
                  <TextField variant="standard" label="Enter Name" />
                  <TextField variant="standard" label="Enter Username" />
                  <TextField
                     variant="standard"
                     id="outlined-password-input"
                     label="Enter Password"
                     type="password"
                     autoComplete="current-password"
                  />
                  <SignupButton>SignUp</SignupButton>
                  <Text style={{ textAlign: `center` }}>OR</Text>
                  <LoginButton variant="contained" onClick={() => toggleSignup()}>
                     Already have an account
                  </LoginButton>
               </Wrapper>
            )}
         </Box>
      </Component>
   );
};

export default Login;
