import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { EmployeeProvider } from './context/EmployeeContext'
import Signup from './pages/Signup'
import Login from './pages/Login'
import EmployeeDashBoard from './pages/EmployeeDashBoard';
import AdminDashBoard from './pages/AdminDashBoard'
import { AdminProvider } from './context/AdminContext'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <AdminProvider>
    <EmployeeProvider>
      <Routes>
      <Route path='/admin/:email' element={<AdminDashBoard />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/employeeDashBoard/:email' element={<EmployeeDashBoard />} />
      </Routes>
     </EmployeeProvider>
     </AdminProvider>
    </BrowserRouter>
      </>
  )
}

export default App