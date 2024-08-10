import { IoMdHome } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import styled from 'styled-components';
const StyledIcon = styled(IoMdHome)`
  width:25px;
  height:30px;
`;

function IconWithPadding() {
  return <StyledIcon />;
}
const  Ricus= styled(RiCustomerServiceLine)`
  width:25px;
  height:30px;
`;

function Icons() {
  return <Ricus />;
}
const Faph = styled(FaPhoneVolume)`
  width:25px;
  height:30px;
`;

function Icon() {
  return <Faph/>;
}
const Loc = styled(IoLocation)`
  width:25px;
  height:30px;
`;

function Location() {
  return <Loc/>;
}
const Log = styled(IoIosLogIn)`
  width:25px;
  height:30px;
  margin:10px;
`;

function Login() {
  return <Log/>;
}

function Nav(){
    return(
        <>
    

    <nav className="navbar navbar-expand-md bg-light">

      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          <img src="logo3.png" alt="Avatar Logo" style={{width:"100px", height:"50px"}} className="rounded-pill img-fluid"/> 
        </a>
        <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        <ul className="navbar-nav">
         <div style={{display:"flex"}}>
         < IconWithPadding/>
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
        </div>
        <div style={{display:"flex"}}>
        <Icons />
          <li className="nav-item">
            <a className="nav-link" href="#">Service</a>
          </li>
        </div>
          <div style={{display:"flex"}}>
          <Icon/>
          <li className="nav-item">
            <a className="nav-link" href="#">contact</a>
          </li>
        </div>
          
          <div style={{display:"flex"}}>
         <Loc/>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Location</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Ongole</a></li>
                <li><a className="dropdown-item" href="#">Hyderabad</a></li>
                <li><a className="dropdown-item" href="#">Guntur</a></li>
              </ul>
            </li>
          </div>
          
            <div style={{display:"flex"}}>
            
            <Login/>
              <div className="btn-group btn-group">
                <button type="button" className="btn btn-primary">Sign Up</button>
                <button type="button" className="btn btn-primary">Login</button>
              
             </div>
            </div>
    
        </ul>
      </div>
    
    </nav>
    
        </>
    )
}
export default Nav;