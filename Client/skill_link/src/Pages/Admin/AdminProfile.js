import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';


const AdminProfile = props => {


    const { contextHolder, error, user, setUser, success, loading, activeTab } = useContext(userContext);



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
                        <div className="main-content">

                            <div className="dashboard-container pt-3">
                                    Admin Profile
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default AdminProfile;