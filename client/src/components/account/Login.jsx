import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

//for CSS styling in material ui
const BgContainer = styled(Box)`
   background: url("/imgs/back.jpeg") no-repeat center;
   background-size: cover;
`;
const RootContainer = styled(Box)`
   backdrop-filter: blur(3px);
   min-height: 100vh;
   box-sizing: border-box;
   padding-top: 105px;
`;
const Component = styled(Box)`
   width: 400px;
   margin: auto;
   padding-top: 100;
   border-radius: 10px;
   background: rgba(255, 238, 204, 0.3);
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
   width: 170,
   display: `flex`,
   margin: `auto`,
   padding: `50px 0 0 0`,
});
const LoginButton = styled(Button)`
   text-transform: none;
   background: #fb641a;
   height: 50px;
   border-radius: 2px;
`;

const Text = styled(Typography)`
   color: #878787;
   font-size: 16px;
`;
const Error = styled(Typography)`
   font-size: 10px;
   color: #ff6161;
   line-height: 0;
   margin-top: 10px;
   font-weight: 600;
`;
const SignupButton = styled(Button)`
   text-transform: none;
   background: #fff;
   color: #2874f0;
   height: 50px;
   border-radius: 2px;
   box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
//we are creating a demi object for storing values coming from form, later we have to create another state for this.
const signupInitialValues = {
   name: ``,
   username: ``,
   password: ``,
};
const loginInitialValues = {
   username: ``,
   password: ``,
};

const Login = ({ isUserAuthenticated }) => {
   const imageURL = "/imgs/logo-bg.png";

   const [account, toggleAccount] = useState(`login`); //for default state
   const [signup, setSignup] = useState(signupInitialValues);
   const [error, setError] = useState("");
   const [login, setLogin] = useState(loginInitialValues);
   const { setAccount } = useContext(DataContext);
   const navigate = useNavigate();

   const toggleSignup = () => {
      account === `signup` ? toggleAccount(`login`) : toggleAccount(`signup`);
   };

   const signupUser = async () => {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
         setError("");
         setSignup(signupInitialValues);
         toggleAccount("login");
      } else {
         setError("Something went wrong! Please try again.");
      }
   };
   const onInputChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value });
   };

   const loginUser = async () => {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
         setError("");

         sessionStorage.setItem("accessToken", `Bearer ${response.data.accessToken}`);
         sessionStorage.setItem("refreshToken", `Bearer ${response.data.refreshToken}`);
         setAccount({ username: response.data.username, name: response.data.name });
         isUserAuthenticated(true);
         navigate("/");
      } else {
         setError("Something went wrong! Please try again.");
      }
   };
   const onValueChange = (e) => {
      setLogin({ ...login, [e.target.name]: e.target.value });
   };

   return (
      <BgContainer>
         <RootContainer>
            <Component>
               <Box>
                  <Image src={imageURL} alt="login" />
                  {account === `login` ? (
                     <Wrapper>
                        <TextField
                           variant="standard"
                           onChange={(e) => onValueChange(e)}
                           name="username"
                           autoComplete="off"
                           style={{ background: "transparent" }}
                           label="Enter Username"
                        />
                        <TextField
                           variant="standard"
                           onChange={(e) => onValueChange(e)}
                           name="password"
                           id="outlined-password-input"
                           label="Enter Password"
                           style={{ background: "transparent" }}
                           type="password"
                           autoComplete="current-password"
                        />
                        {error && <Error> {error} </Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>
                           Login
                        </LoginButton>
                        <Text style={{ textAlign: `center` }}>OR</Text>
                        <SignupButton onClick={() => toggleSignup()}>
                           Create an account
                        </SignupButton>
                     </Wrapper>
                  ) : (
                     <Wrapper>
                        <TextField
                           variant="standard"
                           onChange={(e) => onInputChange(e)}
                           name="name"
                           label="Enter Name"
                        />
                        <TextField
                           variant="standard"
                           name="username"
                           onChange={(e) => onInputChange(e)}
                           label="Enter Username"
                        />
                        <TextField
                           variant="standard"
                           name="password"
                           id="outlined-password-input"
                           onChange={(e) => onInputChange(e)}
                           label="Enter Password"
                           type="password"
                           autoComplete="current-password"
                        />
                        {error && <Error> {error} </Error>}
                        <SignupButton onClick={() => signupUser()}>SignUp</SignupButton>
                        <Text style={{ textAlign: `center` }}>OR</Text>
                        <LoginButton variant="contained" onClick={() => toggleSignup()}>
                           Already have an account
                        </LoginButton>
                     </Wrapper>
                  )}
               </Box>
            </Component>
         </RootContainer>
      </BgContainer>
   );
};

export default Login;
