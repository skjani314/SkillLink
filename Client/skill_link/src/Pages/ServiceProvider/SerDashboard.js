import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext,useState,useEffect } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import './ServiceProvider.css'
import { useParams } from 'react-router-dom';


const SerDashboard = props => {


const {contextHolder,error,user,setUser,success,loading,activeTab,changeActiveTab}=useContext(userContext);
const {id}=useParams();

useEffect(()=>{


    changeActiveTab('DASHBOARD')

},[])
if(id!=user._id){
return null;
}



    return (
        <>
            {contextHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>
                <div className="home-container">
                    <div className="home-header-sidebar"><TopBar /></div>

                    <div className="header-down">
                        <div className="sidebar-container">
                            <Sidebar />
                        </div>
                        <div className="main-content">
                             
                            <Dashboard/>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default SerDashboard;