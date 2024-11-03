import { useContext, useRef, useState } from "react"
import { EmployeeContext } from "../context/EmployeeContext";
import { Link, useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const SlideRef =useRef()
  const navigate = useNavigate();
  const [toggleBtn,setToggleBtn]=useState(true);
  const {employeeData}=useContext(EmployeeContext);
  const {adminData}=useContext(AdminContext);
  const [loginData,setLoginData]=useState({
    email:'',
    password:''
  });
  return (
    <div className="w-[100vw] h-screen content-center">
      <div className="w-[350px] mx-auto  p-5">
      <div className=" flex w-[150px]  bg-zinc-700 rounded-e-2xl rounded-s-2xl mx-auto p-1  ">
        <button className={`rounded-e-2xl rounded-s-2xl px-5 py-1 transition duration-300 ease-in-out ${toggleBtn ?" bg-green-500" :"  bg-transparent" }`} onClick={()=>{setToggleBtn(true);SlideRef.current.swiper.slidePrev();}}>User</button>
        <button className={`rounded-e-2xl rounded-s-2xl px-3 py-1 transition duration-300 ease-in-out ${toggleBtn ? "bg-transparent":" bg-green-500"}`} onClick={()=>{setToggleBtn(false);SlideRef.current.swiper.slideNext();}} >Admin</button>
        </div>

        <Swiper
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      ref={SlideRef}
    >
      <SwiperSlide><div>
    <h2 className=" text-center text-2xl font-bold p-2"> User LogIn </h2>
    <form action="" className="w-[300px] h-auto flex flex-col m-auto border-[1px] border-green-300 rounded">
        <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>
        <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="password" name="" placeholder="password" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} />
        <input 
        className="bg-green-400 inline-block mx-3 p-2 rounded cursor-pointer " 
        type="submit" 
        value="LogIn" 
        onClick={(e)=>{
          e.preventDefault();
          const filterEmployee=employeeData.filter((item)=>item.email===loginData.email && item.password===loginData.password);  
          if(filterEmployee.length !==0){
            localStorage.setItem("User", JSON.stringify(filterEmployee[0]));
            const localUser=JSON.parse(localStorage.getItem("User"));
            
            navigate(`/employeeDashBoard/${localUser.email}`)
          }else{
            alert('user not found');
          }        
                   
        }} />
       <p className="mx-4 mb-3 text-sm "> don&apos;t have an account ? <Link to='/signup' >SignUp</Link> </p>

    </form>
    </div></SwiperSlide>
      <SwiperSlide> <div>
    <h2 className=" text-center text-2xl font-bold p-2">Admin LogIn </h2>
    <form action="" className="w-[300px] h-auto flex flex-col m-auto border-[1px] border-green-300 rounded">
        <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>
        <input className="bg-transparent border-[1px] border-zinc-500 rounded outline-none p-2 m-3" type="password" name="" placeholder="password" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} />
        <input 
        className="bg-green-400 inline-block mx-3 p-2 rounded cursor-pointer " 
        type="submit" 
        value="LogIn" 
        onClick={(e)=>{
          e.preventDefault();
          
          const filterAdmin=adminData.filter((item)=>item.email===loginData.email && item.password===loginData.password);

          if(filterAdmin.length !==0){
            localStorage.setItem("Admin", JSON.stringify(filterAdmin[0]));
            const localAdmin=JSON.parse(localStorage.getItem("Admin"));
            navigate(`/admin/${localAdmin.email}`)
          }else{
            alert('user not found');
          }
          
          filterAdmin.length !==0 ? navigate(`/admin/${filterAdmin[0].email}`) : alert('user not found');          
        }} />
       <p className="mx-4 mb-3 text-sm ">don&apos;t have an account ? <Link>Contact Admin</Link> </p>

    </form>
    </div></SwiperSlide>
    </Swiper>
    </div>
  </div>
  )
}

export default Login