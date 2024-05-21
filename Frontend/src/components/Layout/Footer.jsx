import React, { useContext } from 'react'
import { Context } from "../../main"

function Footer() {
  const {isAuthorized} = useContext(Context)
  return (
    <>
    {isAuthorized ?
      <footer className="text-center text-lg-start bg-body-tertiary text-muted  bg-dark">
     
     <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
     
       <div className="me-5 d-none d-lg-block">
         <span>Get connected with us on social networks:</span>
       </div>
      
       <div>
         <a href="" className="me-4 text-reset">
         <i className="fab fa-facebook" aria-hidden="true"></i>
         </a>
         <a href="" className="me-4 text-reset">
           <i className="fab fa-twitter"></i>
         </a>
         <a href="" className="me-4 text-reset">
         <i className="fab fa-google"></i>
         </a>
         <a href="" className="me-4 text-reset">
         
  
         <i className="fab fa-instagram"></i>
         </a>
         <a href="" className="me-4 text-reset bg-gray">
           <i className="fab fa-linkedin"></i>
         </a>
         <a href="" className="me-4 text-reset">
           <i className="fab fa-github"></i>
         </a>
       </div>
      
     </section>
    
     <section className="">
       <div className="container text-center text-md-start mt-5">
     
         <div className="row mt-3">
         
           <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
             
             <h6 className="text-uppercase fw-bold mb-4">
               <i className="fa fa-gem me-3"></i>Company name
             </h6>
             <p>
               Here you can use rows and columns to organize your footer content. Lorem ipsum
               dolor sit amet, consectetur adipisicing elit.
             </p>
           </div>
         
           <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            
             <h6 className="text-uppercase fw-bold mb-4">
               Products
             </h6>
             <p>
               <a href="#!" className="text-reset">Angular</a>
             </p>
             <p>
               <a href="#!" className="text-reset">React</a>
             </p>
             <p>
               <a href="#!" className="text-reset">Vue</a>
             </p>
             <p>
               <a href="#!" className="text-reset">Laravel</a>
             </p>
           </div>
        

         
           <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
           
             <h6 className="text-uppercase fw-bold mb-4">
           
             </h6>
             <p>
               <a href="#!" className="text-reset">Pricing</a>
             </p>
             <p>
               <a href="#!" className="text-reset">Settings</a>
             </p>
             <p>
               <a href="#!" className="text-reset">Orders</a>
             </p>
             <p>
               <a href="#!" className="text-reset">Help</a>
             </p>
           </div>
          
           <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
             <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
             <p><i className="fa fa-home me-3"></i> New York, NY 10012, US</p>
             <p>
               <i className="fa fa-envelope me-3"></i>
               ashishjat126@gmail.com
             </p>
             <p><i className="fa fa-phone me-3"></i> + 91 7232816781</p>
             <p><i className="fa fa-print me-3"></i> + 91 6367321255</p>
           </div>
          </div>
       </div>
     </section>
    

    
     <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
       © 2024 Copyright:
       <a className="text-reset fw-bold" href="#">Aashish jaat</a>
     </div>
    
   </footer>
:<></>}
    </>
  )
}

export default Footer
