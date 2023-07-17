import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
   const [account, setAccount] = useState({ username: "", name: "" });

   return (
      <DataContext.Provider
         value={{
            account,
            setAccount,
         }}
      >
         {children}
      </DataContext.Provider>
   );
};

export default DataProvider;

//we are using context api to store some values globally that we can use further as per our requirements..
//these values include name and username of user
