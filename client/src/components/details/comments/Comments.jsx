import { Box, styled, TextareaAutosize, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

//commponents
import Comment from "./Comment";
//css handling
const Container = styled(Box)`
   display: flex;
   margin-top: 80px;
`;
const Image = styled("img")({
   width: 50,
   height: 50,
   borderRadius: "50%",
});
const StyledTextArea = styled(TextareaAutosize)`
   height: 100px;
   width: 100%;
   margin: 0 20px;
   padding: 10px;
`;
const initialValues = {
   name: "",
   postId: "",
   comments: "",
   date: new Date(),
};

export const Comments = ({ post }) => {
   const [comment, setComment] = useState(initialValues);
   const [comments, setComments] = useState([]);
   const { account } = useContext(DataContext);
   const [toggle, setToggle] = useState(false);
   const url = "https://static.thenounproject.com/png/12017-200.png";
   const handleChange = (e) => {
      setComment({
         ...comment,
         name: account.username,
         postId: post._id,
         comments: e.target.value,
      });
   };
   const addComment = async () => {
      let response = await API.newComment(comment);
      console.log("response:   ", response);
      if (response.isSuccess) {
         setComment(initialValues);
      }
      setToggle((prevState) => !prevState);
   };
   useEffect(() => {
      const getData = async () => {
         let response = await API.getAllComments(post._id);
         if (response.isSuccess) {
            setComments(response.data);
         }
      };
      getData();
   }, [post, toggle]);

   return (
      <Box>
         <Container>
            <Image src={url} alt="userdp" />
            <StyledTextArea
               minRows={5}
               placeholder="What's on your mind?"
               value={comment.comments}
               onChange={(e) => handleChange(e)}
            />
            <Button
               variant="contained"
               color="primary"
               size="medium"
               style={{ height: "40px" }}
               onClick={() => addComment()}
            >
               Post
            </Button>
         </Container>
         <Box>
            {comments &&
               comments.length > 0 &&
               comments.map((comment) => <Comment comment={comment} setToggle={setToggle} />)}
         </Box>
      </Box>
   );
};

export default Comments;
