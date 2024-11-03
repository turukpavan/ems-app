import { useContext, useState } from "react"
import { EmployeeContext } from "../context/EmployeeContext"
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const AdminDashBoard = () => {
    const {updateEmployeeData, employeeData}=useContext(EmployeeContext);
    const {email}=useParams();
    const {adminData}=useContext(AdminContext);
    const navigate=useNavigate();
    const [taskData,setTaskData]=useState({
        task_title :'',
        assign_to :'',
        task_description :'',
        due_date:'',
        status:'not accepted yet'
    })

    const currentAdmin=(adminData,email)=>{
        const localData=JSON.parse(localStorage.getItem("Admin"));
        if(localData !== null){

            const admin=adminData.filter((admin)=>admin.email===email);
           
            return admin[0]
        }
        return 0
    }
        
  return (
    currentAdmin(adminData,email) ===0 ? <div className="w-[100vw] h-screen content-center"><h1 className=" text-center">404: page not found😑</h1></div> :
    <div className="max-w-[100vw] px-10 overflow-x-hidden">
        <div className="flex justify-between py-6  items-center">
        <h2 className=" capitalize">Hii {currentAdmin(adminData,email).username}🖐</h2>
        <button className="bg-red-700 px-4 py-1 rounded" onClick={()=>(localStorage.removeItem("Admin"), navigate('/'))}>Logout</button>
        </div >
        <div className="w-full bg-zinc-700 p-5 rounded">
            <h2>Assign Task</h2>
            <form className="mt-3 flex justify-around " action="" onSubmit={(e)=>{
                    e.preventDefault();
                    updateEmployeeData({...taskData,id: new Date().getTime()})
                    console.log(taskData);
                    setTaskData({
                        task_title :'',
                        assign_to :'',
                        task_description :'',
                        due_date:'',
                        status:'not accepted yet'

                    })                    
                }}>
            <div className="flex flex-col ">
            <input className="bg-transparent outline-none border-2 rounded px-3 py-2 border-zinc-500 my-2 w-64" type="text" placeholder="task Title" required value={taskData.task_title} onChange={(e)=>{setTaskData({...taskData,task_title:e.target.value})}}  />

                <select className="bg-transparent outline-none border-2 rounded px-3 py-2 border-zinc-500 my-2 w-64 " required name="employee" id="employee" value={taskData.assign_to} 
                onChange={
                    (e) =>{
                        setTaskData((prevData) =>({...prevData, assign_to: e.target.value }));                        
                    }
                    }>
                        <option className="bg-zinc-600 text-white"  value="" >--select--</option>
                    {employeeData.map((item)=>(<option className="bg-zinc-600 text-white" key={item.username} value={item.username}>{item.username}</option>))}
                    
                </select>
                <input className="bg-transparent outline-none border-2 rounded px-3 py-2 border-zinc-500 my-2 w-64" required type="date" value={taskData.due_date} onChange={(e)=>{setTaskData({...taskData,due_date:e.target.value})}}  />

            </div>
            <div className="flex flex-col items-center">
                <textarea className="bg-transparent outline-none border-2 rounded px-3 py-2 border-zinc-500 my-2 h-28 w-64" required placeholder="Task Description" name="" id="" value={taskData.task_description} onChange={(e)=>{setTaskData({...taskData,task_description:e.target.value})}}></textarea>

                <input 
                className="outline-none rounded px-4 py-2 bg-green-400 w-24" 
                type="submit"  
                />
            </div>
            </form>
        </div>
        <div className="w-full p-5 mt-4 bg-zinc-700 rounded">
            <h1>All Tasks</h1>
            <div className="flex flex-col py-2 h-44">
            <div className="flex gap-3 ">
                    <h2 className="w-[300px] text-center font-bold">Task Title</h2>
                    <h2 className="w-[300px] text-center font-bold">Assigned To</h2>
                    <h2 className="w-[300px] text-center font-bold">Due Date</h2>
                    <h2 className="w-[300px] text-center font-bold">Status</h2>

                </div>
                <div className=" overflow-y-scroll">
                    {employeeData.filter((item) => item.tasks.length !== 0).map((element) => element.tasks.map((el,index) => (<div key={index+1} className="flex gap-3 bg-green-400 rounded py-2 my-2">
                    <h2 className="w-[300px] text-center">{el.task_title}</h2>
                    <h2 className="w-[300px] text-center">{el.assign_to}</h2>
                    <h2 className="w-[300px] text-center">{el.due_date}</h2>
                    <h2 className="w-[300px] text-center">{el.status}</h2>

                </div>)))}
                   
               
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashBoard