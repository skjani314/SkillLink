
import { Modal, Button as AntButton } from 'antd';
import React, { useEffect, useState } from 'react';
import './login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SigninReg() {
const [FormFlag,setFormFlag]=useState('reg');
const [FormData,setFormData]=useState({name:'',email:'',password:'',cpassword:'',mobile:''});
const [LogData,setLogdata]=useState({email:'',password:''});
const [psicon,setPsicon]=useState(false);
const [ValData,setValData]=useState({name:true,email:true,password:true,cpassword:true,mobile:true});
const [plen,setPlen]=useState(false);
const [lcase,setLcase]=useState(false);
const [ucase,setUcase]=useState(false);
const [dig,setDig]=useState(false);
const [spc,setSpc]=useState(false);
const [rsub,setRsub]=useState(false);
const [message,setMessage]=useState('');





  useEffect(() => {
    const signUpButton = document.getElementById('sign-up-button');
    const logInButton = document.getElementById('log-in-button');
    const signUpForm = document.getElementById('sign-up-form');
    const logInForm = document.getElementById('log-in-form');
  
    if (signUpButton && logInButton && signUpForm && logInForm) {
      if (FormFlag !== 'reg') {
        logInButton.classList.add('active');
        signUpButton.classList.remove('active');
        signUpForm.style.display = 'none';
        logInForm.style.display = 'block';
        setPsicon(false);
        setLogdata({ email: '', password: '' });
        setRsub(false);
        setMessage('');
        setValData({
          name: true,
          email: true,
          password: true,
          cpassword: true,
          mobile: true,
         
        });
      } else {
        setMessage('');
        signUpButton.classList.add('active');
        logInButton.classList.remove('active');
        logInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        setPsicon(false);
        setRsub(false);
        setFormData({ name: '', email: '', password: '', cpassword: '',mobile:'' });
        setValData({
          name: true,
          email: true,
          password: true,
          cpassword: true,
          mobile: true,
        
        });
      }
    }
  }, [FormFlag]);
  

const handleFormData = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({ ...prev, [name]: value }));

  if (value!='') {
    switch (name) {
      case 'name':
        const isValidName = /^[A-Za-z ]{2,}$/.test(value);
        setValData(prev => ({ ...prev, [name]: isValidName }));
        break;
      case 'email':
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setValData(prev => ({ ...prev, email: isValidEmail }));
        break;
      case 'password':
        setValData(prev => ({ ...prev, password: false }));
        setPlen(/^.{8,20}$/.test(value));
        setUcase(/[A-Z]/.test(value));
        setLcase(/[a-z]/.test(value));
        setDig(/[0-9]/.test(value));
        setSpc(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value));
        break;
      case 'cpassword':
        setValData(prev => ({ ...prev, cpassword: value === FormData.password }));
        break;
      case 'mobile':
        const isValidMobile =  /^\d{10}$/.test(value);
        setValData(prev => ({ ...prev, mobile: isValidMobile }));
        break; 
     default:
        break;
    }
  } else {
    setValData(prev => ({ ...prev, [name]: true }));
  }

};



const handleLogData=(e)=>
  {
   const {name,value}=e.target;
   setLogdata({...LogData,[name]:value})

  }

const handleRegSubmit = (e) => {
    e.preventDefault();
    let role='';
    document.getElementsByName('role').forEach(
(each)=>{
if(each.checked){role=each.value}
}
)
    const cbox=document.getElementsByName('cbox')[0].checked;
  if(ValData.name  && ValData.email && !ValData.password && ValData.cpassword && ValData.mobile && cbox && role!=='')
    {


        // axios.post('http://127.0.0.1:3300/register',{FormData,role})
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))

      setFormData({name:'',email:'',password:'',cpassword:'',mobile:''})
      setRsub(false);
    }
    else{
    setRsub(true);
    }


  
  };

  const handleLogSubmit=(e)=>
    {
        e.preventDefault();
        // axios.post('http://127.0.0.1:3300/login',{email:LogData.email,password:LogData.password})
        // .then(res=>{setMessage(res.data.message);console.log(res)})
        // .catch(err=>console.log(err));

        setLogdata({email:'',password:''});

    }
  return (
    <>
   
    
    <div className="fcontainer mt-4"> 
        <div className='row mx-1'>
       <div className="sign-up active col-6" id="sign-up-button" onClick={()=>{setFormFlag('reg')}}>
           <p className="sign-up-header">Sign Up</p>
       </div>
      <div className="log-in col-6" id="log-in-button" onClick={()=>{setFormFlag('')}}>
       <p className="log-in-header">Log In</p>
      </div>
      </div>
    <form id="sign-up-form" onSubmit={handleRegSubmit} method='POST'>
       <div className="header">
        <h1>Sign Up for Free</h1>
       </div>
       {rsub?<p>Fill the Required Fields</p>:null}
       <div className='radio-buttons d-flex justify-content-around'>
        <label className='mt-1'>I AM </label>
        <label><input type="radio" name="role" value="customer" />{" "}User</label>
        <label> <input type="radio" name="role" value="supplier" />{" "}Supplier</label>
        <label><input type="radio" name="role" value="agent" />{" "}Agent</label>
       </div>
       <input className="first-name" name='name' type="text" placeholder="Enter Your Name*" required value={FormData.name} onChange={handleFormData}/>
       {!ValData.name?<p>First name should be greater than one letter and Have No numbers</p>:null}
       <input type="email" name='email' placeholder="Email Address*" required value={FormData.email} onChange={handleFormData}/>
       {!ValData.email?<p>Email should contain @ and . symbols</p>:null}
       <input type="text" name='mobile' placeholder="Mobile Number*" required value={FormData.mobile} onChange={handleFormData}/>
       
       {!ValData.mobile?<p>Mobile Number should contain 10 digits</p>:null}

       <div style={{position:'relative'}}> <input  type={!psicon?'password':'text'} name='password' placeholder="Your password*" required value={FormData.password} onChange={handleFormData}/>{' '}{psicon?<FaEyeSlash className='passicon'  onClick={()=>{setPsicon(!psicon);}} />:<FaEye className='passicon'  onClick={()=>{setPsicon(!psicon)}} />}</div>
       {!ValData.password && !plen ?<p>Password must be between 8 and 20 characters long.</p>:null}
       {!ValData.password && !lcase ?<p>"Password must include at least one lowercase letter."</p>:null}

       {!ValData.password && !ucase ?<p>Password must include at least one uppercase letter.</p>:null}
       {!ValData.password && !dig ?<p>"Password must include at least one digit."</p>:null}
       {!ValData.password && !spc ?<p>"Password must include at least one special character."</p>:null}
       
       <input type={!psicon?'password':'text'} name='cpassword' placeholder="confirm password*" required  value={FormData.cpassword} onChange={handleFormData}/>
       {!ValData.cpassword?<p>Password And Confirm Password Should be same</p>:null}
       <label><input type='checkbox'  name='cbox'></input>{' '}By Registering,you confirm that you accept our <a>Terms</a> of Uses and <a>Privacy Policy</a> </label> 
       <button id="sign-up-submit">Register</button>
    </form>
    <form id="log-in-form" onSubmit={handleLogSubmit} method='POST'>
      <div className="header">
        <h1>Welcome back!</h1>
      </div>
      {message}
      <input className="email" name='email' type="email" placeholder="Email Address*" required value={LogData.email} onChange={handleLogData}/>
     <div style={{position:'relative'}}> <input  type={!psicon?'password':'text'} name='password' placeholder="Your password*" required value={LogData.password} onChange={handleLogData}/>{' '}{psicon?<FaEyeSlash className='passicon' onClick={()=>{setPsicon(!psicon);}} />:<FaEye className='passicon' onClick={()=>{setPsicon(!psicon)}} />}</div>
     
      <div className="password">
        Forgot Password?
      </div>
      <button id="log-in-submit mb-6">Log in</button><br></br>
      <center>If you Are Not Registered,Please <a>Sign Up</a></center>
    </form>

  </div>
  </>
   );
}

export default SigninReg;
