import { Box, Divider, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

//css handling
const Container = styled(Box)(({ theme }) => ({
   margin: "50px 100px",
   [theme.breakpoints.down("md")]: {
      margin: "3px",
   },
}));

const Image = styled("img")({
   width: "100%",
   height: "50vh",
   objectFit: "cover",
});
const Heading = styled(Typography)(({ theme }) => ({
   fontSize: "38px",
   fontWeight: "600",
   textAlign: "center",
   margin: "30px 0 0",
   wordBreak: "break-word",
   [theme.breakpoints.down("md")]: {
      margin: "5px",
      marginTop: "35px",
      fontSize: "30px",
      fontWeight: "600",
      textAlign: "center",
   },
}));
const EditIcon = styled(Edit)`
   margin: 5px;
   padding: 5px;
   border: 1px solid #878787;
   border-radius: 10px;
`;
const DeleteIcon = styled(Delete)`
   margin: 5px;
   padding: 5px;
   border: 1px solid #878787;
   border-radius: 10px;
`;
const Author = styled(Box)(({ theme }) => ({
   color: "#878787",
   margin: "20px 0",
   display: "flex",
   [theme.breakpoints.down("md")]: {
      margin: "10px",
   },
}));

const Description = styled(Box)(({ theme }) => ({
   wordBreak: "break-word",
   [theme.breakpoints.down("md")]: {
      margin: "8px",
      textAlign: "justify",
   },
}));

const DetailView = () => {
   const [post, setPost] = useState({});
   const { id } = useParams();
   const { account } = useContext(DataContext);
   const navigate = useNavigate();
   const url = post.picture
      ? post.picture
      : "https://getwallpapers.com/wallpaper/full/f/3/3/765105-technology-background-images-1920x1080-free-download.jpg";
   useEffect(() => {
      const fetchData = async () => {
         let response = await API.getPostById(id);
         if (response.isSuccess) {
            setPost(response.data);
         }
      };
      fetchData();
   }, []);

   const deleteBlog = async () => {
      let response = await API.deletePost(post._id);
      if (response.isSuccess) {
         navigate("/");
      }
   };

   return (
      <Container>
         <Image src={url} alt="blog" />
         <Box style={{ float: "right" }}>
            {account.username === post.username && (
               <>
                  <Link to={`/update/${post._id}`}>
                     <EditIcon color="primary" />
                  </Link>
                  <DeleteIcon color="error" onClick={() => deleteBlog()} />
               </>
            )}
         </Box>
         <Heading>{post.title}</Heading>
         <Author>
            <Typography>
               Author:
               <Box component="span" style={{ fontWeight: 600 }}>
                  {post.username}
               </Box>
            </Typography>
            <Typography style={{ marginLeft: "auto" }}>
               {new Date(post.createdDate).toDateString()}
            </Typography>
         </Author>
         <Description>{post.description}</Description>
      </Container>
   );
};

export default DetailView;
