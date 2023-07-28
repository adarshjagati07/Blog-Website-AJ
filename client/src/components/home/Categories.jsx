import { Button, Table, TableHead, TableBody, TableCell, TableRow, styled } from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
   border: 2px solid rgba(224, 224, 224, 1);
   margin-left: 3px;
   padding: 0 20px;
   box-sizing: border-box;
   border-radius: 10px;
`;
const StyledButton = styled(Button)`
   margin: 20px;
   width: 85%;
   background: #6495ed;
   color: #fff;
`;
const StyledTableCell = styled(TableCell)`
   display: flex;
   justify-content: center;
   font-weight: 600;
   background: "#f1f1f1";
   &:hover: {
      background: "#f00";
   }
`;
const StyledLink = styled(Link)`
   text-decoration: none;
   color: inherit;
`;

const Categories = () => {
   const [searchParams] = useSearchParams();
   const category = searchParams.get("category");

   return (
      <>
         <StyledLink to={`/create?category=${category || ""}`}>
            <StyledButton variant="contained">Create Blog</StyledButton>
         </StyledLink>

         <StyledTable>
            <TableHead>
               <TableRow>
                  <StyledTableCell
                     style={{ background: " rgba(255, 221, 204,0.4)", borderRadius: "5px" }}
                  >
                     <StyledLink to="/">All Categories</StyledLink>
                  </StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {categories.map((category) => (
                  <TableRow key={category.id}>
                     <StyledTableCell>
                        <StyledLink to={`/?category=${category.type}`}>{category.type}</StyledLink>
                     </StyledTableCell>
                  </TableRow>
               ))}
            </TableBody>
         </StyledTable>
      </>
   );
};

export default Categories;
