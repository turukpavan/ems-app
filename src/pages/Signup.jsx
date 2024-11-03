import { useContext, useState } from "react"
import { EmployeeContext } from "../context/EmployeeContext"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate=useNavigate();
    const [signUpDetails,setSignUpDetails]=useState({
      username:'',
      email:'',
      password:'',
      tasks:[]
    })

    const {employeeData, addEmployeesData}=useContext(EmployeeContext);
  
  return (
    <div className="w-[100vw] h-screen content-center">
      <h1 className=" font-bold text-2xl text-center p-2">SignUp </h1>
      <form action="" className="w-[300px] h-auto flex flex-col m-auto border-[1px] border-green-300 rounded">
          <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="text" name="userName" placeholder="username" value={signUpDetails.username} onChange={(e)=>setSignUpDetails({...signUpDetails,username:e.target.value})} />
          <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="email" name="email" placeholder="Email" value={signUpDetails.email} onChange={(e)=>setSignUpDetails({...signUpDetails,email:e.target.value})} />
          <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="password" name="" id="" placeholder="password" value={signUpDetails.password} onChange={(e)=>setSignUpDetails({...signUpDetails,password:e.target.value})} />
          <input 
          className="bg-green-400 inline-block mx-3 p-2 rounded cursor-pointer " 
          type="submit" 
          value="Sign Up" 
          onClick={ (e)=>{ e.preventDefault();
                  employeeData.filter((emp)=>emp.email===signUpDetails.email).length !==0 ? alert('user already exists') :addEmployeesData(signUpDetails) 
                  setSignUpDetails({ username: '', email: '', password: '' });
                  navigate('/')
          }} />
          <p className="mx-4 mb-3 text-sm ">Already have an account ? <Link to='/' >LogIn</Link> </p>
      </form>
    </div>
  )
}

export default Signup