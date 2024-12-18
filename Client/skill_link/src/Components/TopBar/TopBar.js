import React from 'react';
import logo from './log1.png';
import { IoIosNotifications } from "react-icons/io";
import { useContext } from "react"
import userContext from '../Login/UserContext';
import { Spin, Input, Flex ,Typography,Button} from 'antd';
import { useState } from 'react'
import axios from 'axios';
import './TopBar.css';
import TopBarDup from './TopBarDup';
import { Link, useNavigate } from 'react-router-dom';

const {Text}=Typography;

const TopBar = (props) => {

    const {  loading,setLoading ,success ,error ,setUser}=useContext(userContext);
    
const navigate=useNavigate();

const handleLogout=async ()=>{
    setLoading(true);
    try{
    
      await axios.post(process.env.REACT_APP_API_URL+'/logout')
       setUser(null);
       setLoading(false);
       navigate('/');
       success("logged out successfully");

    
    }
    catch{
    error("something went wrong")
    setLoading(false);
    }
    
    }
    
   
    return (
        <>
            <TopBarDup />
            <div className='header-main-container' style={{ zIndex: 1000 }}>
                <div className='header-container'  >
                    <div>
                    <Link to='/'>  <img src={logo} className="styling-logo" alt="logo" /></Link> 
                    </div>
                    <div className="logout-container">
                       
                        <IoIosNotifications className="styling-icon mt-3" />
                        <Button type="primary" className='mt-3' size="small" onClick={handleLogout}>Log Out</Button>                    </div>
                </div>
               

            </div>
        </>
    );
};
export default TopBar;