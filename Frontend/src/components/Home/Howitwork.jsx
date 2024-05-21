import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Howitworks = () => {
  const { isAuthorized , user} = useContext(Context);
  const Navigate = useNavigate()

  const createaccount = ()=>{
Navigate("/Registation")
  }

  const home = ()=>{
Navigate("/")
  }
  const alljobs = ()=>{
Navigate("/job/getall")
  }
  const postjob = ()=>{
Navigate("/Postjob")
  }
  return (
    <>
    
     <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
          { isAuthorized && user.role == "Employer" ?
            <div onClick={postjob} className="card">
            <MdFindInPage />
            <p>Post a Job</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>: 
             <div onClick={createaccount } className="card">
             <FaUserPlus />
             <p>Create Account</p>
             <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
               Consequuntur, culpa.
             </p>
           </div>
}
{!isAuthorized ?
            <div onClick={createaccount} className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div> : <div onClick={alljobs} className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            }


{!isAuthorized ?
            <div onClick={createaccount} className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div> :  <div onClick={alljobs} className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>  }

          </div>
        </div>
      </div>
    </>
  );
};

export default Howitworks;