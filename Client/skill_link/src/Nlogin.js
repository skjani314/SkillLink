import { useState } from "react";
const emailpattern=/^[a-zA-Z0-9,_%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,}$/;
function Nlogin(){
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('')
    const [radio,setradio]=useState()
    const [error,seterror]=useState({
        email:'',
        password:'',
        radio:'',
    })
    function handlesubmit(){
       if(email.trim()===''){
        seterror((error)=>({...error,email:"enter email address"}))
       }
       else if(!emailpattern.test(email)){
             seterror((error)=>({...error,email:"Enter correct email"}))
       }
       else{
        seterror((error)=>({...error,email:""}))
       }
       if(password.trim()===''){
        seterror((error)=>({...error,password:"Enter password"}))
       }
       else if(password.trim().length<8){
             seterror((error)=>({...error,password:"Enter 8 or above 8 char "}))
       }
       else{
        seterror((error)=>({...error,password:""}))
       }
       if(radio===''){
        seterror((error)=>({...error,radio:"Click radio button"}))
       }
    }
    return(
        <>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 col-md-3"></div>
            <div className="col-sm-10 col-md-5">
            <div className="border w-100 mt-5 m-auto p-4 container">
            <h2 className="text-center text-primary">Login Form</h2>
            <div className="d-flex">
                <div className="form-check p-3">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={radio} 
  onChange={()=>{setradio("Client")}} checked/>
  <label className="form-check-label" for="exampleRadios1">
    User
  </label>
</div>
<div className="form-check p-3">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={radio}
  onChange={()=>{setradio("Agent")}}/>
  <label className="form-check-label" for="exampleRadios2">
    Agent
  </label>
</div>
<div className="form-check p-3">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value={radio}
  onChange={()=>{setradio("Admin")}}/>
  <label className="form-check-label" for="exampleRadios3">
    Admin
  </label>
</div>
</div>
                <div className="mt-1">
                <label className="form-label">Email:</label>
                <input type="Email"className="form-control " value={email} placeholder="Enter Email..." 
                onChange={(e)=>{
                    setemail(e.target.value);
                }}/>
                {error.email&&<span className="text-danger">{error.email}</span>}
                </div>
                <div className="mt-3">
                    <label className="form-label">Password</label>
                    <input type="password"className="form-control" value={password} placeholder="Enter Password..."
                    onChange={(e)=>{
                        setpassword(e.target.value);
                    }}/>
                    {error.password&&<span className="text-danger">{error.password}</span>}
                <div/>
               
                <div className="mt-3">
                    <button className="btn btn-primary w-100" onClick={handlesubmit}>Login</button>
                </div>


            </div>
        </div>
            </div>
            <div className="col-sm-2 col-md-4"></div>
          </div>
        </div>
        
        </>
    )
}
export default Nlogin;