import React, { useEffect } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin,Flex } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AgentSideBar from './AgentSideBar';
import { useParams } from 'react-router-dom';
import ServiceProvider from '../../Components/Cards/ServiceProvider';


const AgeSuppliers = props => {


    const { contextHolder, error, user, setUser, success, loading, activeTab ,changeActiveTab,serProData} = useContext(userContext);
    const {id}=useParams();
useEffect(()=>{
    changeActiveTab("MYSUPPLIERS")

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
                            <AgentSideBar />
                        </div>
                        <div className="main-content">

                            <div className="dashboard-container pt-3">
                                    <h1>My Suppliers</h1>
<br></br>
                                   <Flex gap={10} wrap>
                                    {serProData.map((each)=>(
                                    <ServiceProvider data={each} agent={true}/>
                                    ))
}
                                    </Flex> 
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default AgeSuppliers;