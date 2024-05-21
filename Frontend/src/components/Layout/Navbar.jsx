import React,{ useContext} from 'react'
import { Context } from "../../main"
import axios from 'axios'
import { Link, useNavigate , Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Navbar() {
  const Navigates = useNavigate()
  
  const {isAuthorized , setisAuthorized , user} = useContext(Context)

  const handellogout = async()=>{

try {
       const responce = await  axios.get("http://localhost:5000/user/logout", {withCredentials: true} )
       toast.success(responce.message) 
       setisAuthorized(false)
        Navigates("/")
} catch (error) {
  toast.error(error.responce.message) 
  setisAuthorized(true)
}

if(!isAuthorized){

  return <Navigate to={"/"} />
}

}


  
 
  return (
   
    <>
     {isAuthorized  ? (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <img className="navbar-brand  " style={{width: "60px", height: "60px", borderRadius: "50%"}} src="../job1.jpg" alt="logo" />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/job/getall">All Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="applications/me">{
              user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS ": "MY APPLICATIONS"
            }</Link>
          </li>
         {
          user && user.role === "Employer"? (
            <>
             <li className="nav-item">
            <Link className="nav-link" to="/Postjob">Post Jobs</Link>
          </li>
             <li className="nav-item">
            <Link className="nav-link" to="/Myjob">View your Jobs</Link>
          </li>
            </>
          ):(<>
          </>)
         }
          
        </ul>
        <form className="d-flex">
          <button className="btn btn-outline-success" onClick={handellogout}>LogOut</button>
        </form>
      </div>
    </div>
  </nav>): (<>
  </>) }
  </>
  )
}

export default Navbar
