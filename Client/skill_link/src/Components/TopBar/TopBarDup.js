import React from 'react';
import logo from './log1.png';
import { IoIosNotifications } from "react-icons/io";
import './TopBar.css'
import { useContext } from "react"
import userContext from '../Login/UserContext';
import { Spin, Input, Flex ,Typography} from 'antd';
import { useState } from 'react'
import axios from 'axios';
import './TopBar.css';


const {Text}=Typography;

const TopBarDup = (props) => {
    
    const {  loading,setLoading ,success ,error }=useContext(userContext);
    
   
    return (
        <>
             <div className='header-main-container' style={{position:'static'}}>
             <div className='header-container' style={{zIndex:-1}} >
                    <div>
                        <img src={logo} className="styling-logo" alt="logo" />
                    </div>
                    <div className="logout-container">
                       
                        <IoIosNotifications className="styling-icon" />
                    </div>
                </div>
               

            </div>
        </>
    );
};
export default TopBarDup;