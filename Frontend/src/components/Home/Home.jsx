import React, { useContext } from 'react'
import { Context } from "../../main"
import { useNavigate } from 'react-router-dom'
import HeroSection from "./HeroSection"
import HowItWorks from "./Howitwork"
import PopularCategories from "./PopularCategoris"
import PopularCompanies from "./PopularCompany"

function Home() {
  const Navigate = useNavigate();
  const { isAuthorized } = useContext(Context);


  const applie = () => {
    Navigate("/Registation")
  }


  return (
    <>
      {!isAuthorized ? <> <div className='topbar'><h5>Job Application</h5></div> <div onClick={applie}><marquee behavior="15" bgcolor="red" direction="right"><h4>Click and apply a job</h4></marquee></div> </> : ""
      }
      <section className="homePage page">
        <HeroSection />

        {!isAuthorized ? <div onClick={applie}><marquee behavior="15" bgcolor="red" direction="left"><h4>Click and apply a job</h4></marquee></div> : ""
        }
        <HowItWorks />
        {!isAuthorized ? <div onClick={applie}><marquee behavior="15" bgcolor="red" direction="down"><h4>Click and apply a job   Click and apply a job   Click and apply a job   Click and apply a job  </h4></marquee></div> : ""
        }
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  )
}

export default Home
