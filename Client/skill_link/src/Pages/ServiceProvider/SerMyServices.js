import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext,useState } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './ServiceProvider.css'
import Myservices from '../../Components/myservices/Myservices';

const SerMyServices = props => {


const {contextHolder,error,user,setUser,success,loading,activeTab}=useContext(userContext);



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
                             <Myservices/>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default SerMyServices;