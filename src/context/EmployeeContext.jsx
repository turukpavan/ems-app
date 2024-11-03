import { createContext, useState } from "react";

 const EmployeeContext=createContext();

  // eslint-disable-next-line react/prop-types
  const EmployeeProvider=({children})=>{
    const [employeeData,setEmployeeData]=useState([
        {
            username:'Pavan',
            email:'turukpavan@gmail.com',
            password:'123',
            tasks:[]
          }
    ]);
    const addEmployeesData =(data)=>{
        setEmployeeData([...employeeData,data]);
    }

    const updateEmployeeData = (data) => {
        const updatedEmployeeData = employeeData.map((item) => {
          if (item.username === data.assign_to) {
            return { ...item, tasks: [...item.tasks, data] };
          }
          return item;
        });
        setEmployeeData(updatedEmployeeData);
      };
      
    const taskStatus=(updatedData)=>{
      const UpDatedStatusData= employeeData.map((item)=>{
        if(item.username===updatedData.username){
          return updatedData
        }
        return item;
      })
      setEmployeeData(UpDatedStatusData)
    }
    return(
        <EmployeeContext.Provider value={{taskStatus, addEmployeesData, updateEmployeeData, employeeData}}>
            {children}
        </EmployeeContext.Provider>
    )    
}
export { EmployeeContext,EmployeeProvider};



