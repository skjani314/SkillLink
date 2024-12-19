import React, { useEffect } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';
import { useParams } from 'react-router-dom';
import Profile from '../../Components/Cards/Profile';

const AdminProfile = props => {


    const { contextHolder, error, user, setUser, success, loading, activeTab ,changeActiveTab} = useContext(userContext);
    const {id}=useParams();


useEffect(()=>{
    changeActiveTab('PROFILE')

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
                            <AdminSideBar />
                        </div>
                        <div className="main-content" style={{marginTop:'30px'}}>

                            <div className="dashboard-container pt-3">
                            <Profile data={user}/>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default AdminProfile;