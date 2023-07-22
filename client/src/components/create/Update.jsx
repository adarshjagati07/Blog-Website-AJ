import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
   margin: "50px 100px",
   [theme.breakpoints.down("md")]: {
      margin: "5px",
   },
}));
const Image = styled("img")({
   width: "100%",
   height: "50vh",
   objectFit: "cover",
});
const StyledForm = styled(FormControl)`
   margin: 10px 0;
   display: flex;
   flex-direction: row;
`;
const InputTextField = styled(InputBase)`
   flex: 1;
   margin: 0 20px;
   font-size: 20px;
`;
const TextArea = styled(TextareaAutosize)`
   width: 100%;
   margin-top: 30px;
   font-size: 18px;
   padding: 12px;
   border: none;
   &:focus-visible {
      outline: none;
   }
`;

const initialPost = {
   title: "",
   description: "",
   picture: "",
   username: "",
   categories: "",
   createdDate: new Date(),
};

const Update = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { id } = useParams();
   const [post, setPost] = useState(initialPost);
   const [file, setFile] = useState("");
   const { account } = useContext(DataContext);
   const url = post.picture
      ? post.picture
      : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

   useEffect(() => {
      const fetchData = async () => {
         let response = await API.getPostById(id);
         if (response.isSuccess) {
            setPost(response.data);
         }
      };
      fetchData();
   }, []);
   useEffect(() => {
      const getImage = async () => {
         if (file) {
            try {
               const data = new FormData();
               data.append("name", file.name);
               data.append("file", file);

               //Api call
               const response = await API.uploadFile(data);
               post.picture = response.data;
            } catch (err) {
               console.info(err);
            }
         }
      };
      getImage();
      post.username = account.username;
      post.categories = location.search?.split("=")[1] || "All";
   }, [file]);

   const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
   };

   const updateBlogPost = async () => {
      let response = await API.updatePost(post);
      console.log(response);
      if (response.isSuccess) {
         navigate(`/details/${id}`);
      }
   };

   return (
      <Container>
         <Image src={url} alt="postimg" />
         <StyledForm>
            <label htmlFor="fileInput">
               <Add fontSize="large" color="action" />
            </label>
            <input
               type="file"
               id="fileInput"
               style={{ display: "none" }}
               onChange={(e) => setFile(e.target.files[0])}
            />
            <InputTextField
               placeholder="Title"
               value={post.title}
               onChange={(e) => handleChange(e)}
               name="title"
            />
            <Button variant="contained" onClick={() => updateBlogPost()}>
               Update
            </Button>
         </StyledForm>
         <TextArea
            minRows={5}
            placeholder="Tell us about your story...."
            onChange={(e) => handleChange(e)}
            name="description"
            value={post.description}
         />
      </Container>
   );
};

export default Update;
