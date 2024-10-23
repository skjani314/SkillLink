import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AgentSideBar from './AgentSideBar';
import { useParams } from 'react-router-dom';


const AgeDashboard = props => {


    const { contextHolder, error, user, setUser, success, loading, activeTab } = useContext(userContext);

    const {id}=useParams();
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
                            <AgentSideBar />
                        </div>
                        <div className="main-content">

                            <div className="dashboard-container pt-3">
                                    AgeDashboard
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default AgeDashboard;