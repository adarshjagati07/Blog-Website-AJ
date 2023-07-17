import { Button, Table, TableHead, TableBody, TableCell, TableRow, styled } from "@mui/material";
import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
   border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton = styled(Button)`
   margin: 20px;
   width: 85%;
   background: #6495ed;
   color: #fff;
`;

const Categories = () => {
   return (
      <>
         <StyledButton variant="contained">Create Blog</StyledButton>

         <StyledTable>
            <TableHead>
               <TableRow>
                  <TableCell>All Categories</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {categories.map((category) => (
                  <TableRow key={category.id}>
                     <TableCell>{category.type}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </StyledTable>
      </>
   );
};

export default Categories;
