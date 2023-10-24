import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});



export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false); //check if the user value has been loaded

    useEffect(() => {
      async function fetchProfile(){
        if(!user) {
          const {data}= await axios.get('http://localhost:4000/profile');
          setUser(data);
          setReady(true);
        }
      }
      fetchProfile();
    },[]); // eslint-disable-next-line 

    return (
      <UserContext.Provider value={{user,setUser,ready}}>
        {children}
      </UserContext.Provider>
    );
}