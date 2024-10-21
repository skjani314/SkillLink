import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext,useState } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './ServiceProvider.css'
import Profile from '../../Components/profile/Profile';

const SerProfile = props => {


const {contextHolder,error,user,setUser,success,loading,activeTab}=useContext(userContext);

const [check,setCheck]=useState('check');

console.log(activeTab);

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
                             <Profile/>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default SerProfile;