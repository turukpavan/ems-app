import { createContext, useState } from "react"


const AdminContext=createContext()
// eslint-disable-next-line react/prop-types
const AdminProvider = ({children}) => {
    const [adminData,setAdminData]=useState([{
        id:1234,
        username:'rahul',
        email:'rahul@gmail.com',
        password:'rahul123'
    }]);

    const addAdminData=(data)=>{
        setAdminData((prev)=>({...prev,data}));
    }
  return (
    <AdminContext.Provider value={{adminData,addAdminData}}>
        {children}
    </AdminContext.Provider>
  )
}

export {AdminContext,AdminProvider};