import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeDashBoard = () => {
    const navigate=useNavigate();
    const {email}=useParams();
    const{taskStatus, employeeData}=useContext(EmployeeContext);
    const [requireData,setRequireData]=useState({});
   

    const handleEmployeeData=(email,employeeData)=>{
        const localData=JSON.parse(localStorage.getItem("User"));        
        if(localData !== null){
            const data=employeeData.filter(item=>item.email===email);
            setRequireData(data[0])
        }
    }
    useEffect(()=>{
        
        handleEmployeeData(email,employeeData)        
    },[email,employeeData])
  return (
    Object.keys(requireData).length !== 0 ? 
    
    <div className="w-[100vw] px-10">
        <div className="flex justify-between py-6  items-center">
        <h2>Hii {requireData.username}🖐</h2>
        <button className="bg-red-700 px-4 py-1 rounded" onClick={()=>(localStorage.removeItem("User"), navigate('/'))} >Logout</button>
        </div >
        <div className=" w-full flex flex-wrap justify-around bg-zinc-700 p-4 rounded gap-1">
            <div className=" w-[270px] flex justify-between bg-yellow-400 rounded py-3 px-6">
                <h2>New Task</h2>
                <h3>{requireData.tasks?.filter((item) => item.status === "not accepted yet")?.length || 0}</h3>
            </div>
            <div className=" w-[270px] flex justify-between bg-blue-400 rounded py-3 px-6">
                <h2>Accepted Task</h2>
                <h3>{requireData.tasks?.filter((item) => item.status === "accepted")?.length || 0}</h3>
            </div>
            <div className=" w-[270px] flex justify-between bg-green-400 rounded py-3 px-6">
                <h2>Completed Task</h2>
                <h3>{requireData.tasks?.filter((item) => item.status === "completed")?.length || 0}</h3>
            </div>
            <div className=" w-[270px] flex justify-between bg-red-400 rounded py-3 px-6">
                <h2>Failed</h2>
                <h3>{requireData.tasks?.filter((item) => item.status === "failed")?.length || 0}</h3>
            </div>

        </div>
            <div className="p-5 mt-10 bg-zinc-700 rounded">
        <div className="w-full   rounded flex flex-nowrap gap-4 overflow-x-scroll">
        {requireData.tasks?.filter((item) => item.status === "completed")?.map((task)=><div key={task.id} className="min-w-[300px] max-w-[300px] h-auto bg-green-400 rounded flex flex-col justify-between py-3 px-5">
                <div className="">
                <div className="flex justify-between items-center">
                <h1 className="text-2xl">{task.task_title}</h1>
                <h1 className="text-sm">{task.due_date}</h1>
                    </div>
                <p className=" text-justify">{task.task_description}</p>
                </div>
                <div className="flex justify-between mt-10">
                    <button className=" py-1 px-2 rounded bg-green-950 text-zinc-400 ">completed</button>
                </div>

            </div>)}            
            
        {requireData.tasks?.filter((item) => item.status === "failed")?.map((task)=><div key={task.id} className="min-w-[300px] max-w-[300px] h-auto bg-red-400 rounded flex flex-col justify-between py-3 px-5">
                <div className="">
                <div className="flex justify-between items-center">
                <h1 className="text-2xl">{task.task_title}</h1>
                <h1 className="text-sm">{task.due_date}</h1>
                    </div>
                <p className=" text-justify">{task.task_description}</p>
                </div>
                <div className="flex justify-between">
                    <button className=" bg-red-950 text-zinc-500 py-1 px-2 rounded">Failed</button>

                </div>

         </div>)}
            
        {requireData.tasks?.filter((item) => item.status === "not accepted yet")?.map((task)=> <div key={task.id} className="min-w-[300px] max-w-[300px] h-auto bg-yellow-400 rounded flex flex-col justify-between py-3 px-5">
                <div className="">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">{task.task_title}</h1>
                        <h1 className="text-sm">{task.due_date}</h1>
                    </div>
                    <p className=" text-justify">{task.task_description}</p>
                </div>
                <div className="flex justify-between mt-16">
                    <button className=" bg-blue-400 py-1 px-2 rounded" onClick={
                        ()=>{
                            const taskUpdated={...requireData, tasks: requireData.tasks.map((item) =>item.id === task.id ? { ...item, status: "accepted" } : item)};
                            console.log(taskUpdated);
                            
                            // console.log(taskUpdated);
                            taskStatus(taskUpdated)
                        }}>Accept</button>
                    <button className=" bg-red-700 py-1 px-2 rounded" onClick={
                        ()=>{
                            const taskUpdated={...requireData, tasks: requireData.tasks.map((item) =>item.id === task.id ? { ...item, status: "failed" } : item)}
                            // console.log(taskUpdated);
                            taskStatus(taskUpdated)
                        }}>Failed</button>

                </div>

            </div>
        )}
           
        {requireData.tasks?.filter((item) => item.status === "accepted")?.map((task)=><div key={task.id} className="min-w-[300px] max-w-[300px] h-auto bg-blue-400 rounded flex flex-col justify-between py-3 px-5">
                <div className="">
                <div className="flex justify-between items-center">
                     <h1 className="text-2xl">{task.task_title}</h1>
                     <h1 className="text-sm">{task.due_date}</h1>
                </div>               
                 <p className=" text-justify">{task.task_description}</p>
                </div>
                <div className="flex justify-between">
                    <button className=" bg-green-700 py-1 px-2 rounded" onClick={
                        ()=>{
                            const taskUpdated={...requireData, tasks: requireData.tasks.map((item) =>item.id === task.id ? { ...item, status: "completed" } : item)}
                            // console.log(taskUpdated);
                            taskStatus(taskUpdated)
                        }}>completed</button>
                    <button className=" bg-red-700 py-1 px-2 rounded" onClick={
                        ()=>{
                            const taskUpdated={...requireData, tasks: requireData.tasks.map((item) =>item.id === task.id ? { ...item, status: "failed" } : item)}
                            // console.log(taskUpdated);
                            taskStatus(taskUpdated)
                        }}>Failed</button>

                </div>

        </div> )}
            

            </div>
        </div>
    </div> : <div className="w-[100vw] h-screen content-center"><h1 className=" text-center">404: page not found😑</h1></div>
  )
}

export default EmployeeDashBoard