import { createContext, useContext, useState } from "react";

const Store = createContext();

const StoreProvider = ({children})=>{
 
    const [welcome , setWecome] = useState("Welcome")

  return(
     <Store.Provider value={{
     welcome,
     }}>
       {children}
     </Store.Provider>
  )
}


const useStore = ()=>{
     return useContext(Store)
}

export {StoreProvider , useStore}