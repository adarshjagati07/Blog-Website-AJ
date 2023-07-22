import { Box, styled, Typography } from "@mui/material";

const Image = styled(Box)`
   background: url(https://img.wallpapersafari.com/desktop/1536/864/43/34/Q2fXm3.jpg) center/75%
      repeat-x #000;
   width: 100%;
   height: 50vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;
const Heading = styled(Typography)`
   font-size: 70px;
   color: #fff;
   line-height: 1.4;
`;
const SubHeading = styled(Typography)`
   font-size: 20px;
   background: #fff;
   padding: 2px 10px;
`;
const Banner = () => {
   return (
      <Image>
         <Heading>Blog</Heading>
         <SubHeading>Adarsh Jagati</SubHeading>
      </Image>
   );
};

export default Banner;
