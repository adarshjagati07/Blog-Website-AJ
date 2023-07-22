import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";
//css handling
const Container = styled(Box)`
   border: 1px solid #d3cede;
   border-radius: 10px;
   margin: 10px;
   height: 350px;
   display: flex;
   align-items: center;
   flex-direction: column;
   & > img {
      padding: 3px;
   }
   & > p {
      padding: 0 5px 5px 5px;
   }
`;
const Image = styled("img")({
   width: "98%",
   height: "150px",
   borderRadius: "10px 10px 0 0",
   objectFit: "cover",
});
const Text = styled(Typography)`
   color: #878787;
   font-size: 12px;
`;
const Heading = styled(Typography)`
   font-size: 18px;
   font-weight: 600;
`;
const Details = styled(Typography)`
   font-size: 14px;
   text-align: center;
   margin-top: 10px;
   word-break: break-word;
`;

const Post = ({ post }) => {
   const url = post.picture
      ? post.picture
      : "https://images.unsplash.com/flagged/photo-1595511369680-d728dc7f0be9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max";

   return (
      <Container>
         <Image src={url} alt="blog" />
         <Text>{post.categories}</Text>
         <Heading>{addElipsis(post.title, 20)}</Heading>
         <Text>{post.username}</Text>
         <Details>{addElipsis(post.description, 100)}</Details>
      </Container>
   );
};

export default Post;
