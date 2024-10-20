import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext,useState } from 'react';
import { Spin } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import './ServiceProvider.css'
import Transactions from '../../Components/Transactions/Transactions';
import Profile from '../../Components/profile/Profile';
import Myservices from '../../Components/myservices/Myservices';

const ServiceProvider = props => {


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
                             <>
                               { ()=>{switch(activeTab)
                                {
                                       case 'DASHBOARD':
                                        return <Dashboard/>
                                        break;
                                        case 'TRANSACTIONS':
                                            return <Transactions/>
                                            break;
                                        case 'PROFILE':
                                            return <Profile/>
                                            break;
                                        case 'SERVICES' :
                                            return <Myservices/>
                                            break;   
                                    default:
                                           return null;
                                            break;
                                }}
                            }
                            </>
                            
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default ServiceProvider;