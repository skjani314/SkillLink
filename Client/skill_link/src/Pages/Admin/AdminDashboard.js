import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin, Typography } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';
import { useParams } from 'react-router-dom';
import AdminReqTable from '../../Components/Tables/AdminReqTable';
import axios from 'axios';



const { Text } = Typography;
const AdminDashboard = props => {


    const { contextHolder, error, user, setUser, success, activeTab } = useContext(userContext);
    const [requestsData, setRequestsData] = useState([]);
    const [loading, setLoading] = useState(false)
    const { id } = useParams();


    useEffect(() => {

        const getData = async () => {
            const result = await axios.get('/requests?req_to=' + user._id)
            setRequestsData([...result.data]);
        }


        getData()

    }, [loading])






    if (id != user._id) {
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
                        <div className="main-content" style={{ marginTop: '30px' }}>

                            <div className="dashboard-container pt-3">
                                <h1><b>Dashboard</b></h1>
                                <br></br>
                                <Text className='fs-1'>Welcome ,<b style={{ color: 'blue' }}>{user.name}</b></Text>
                                <br></br>
                                <div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
                                    <h2 >Recent Requests</h2>
                                    <AdminReqTable rowsData={requestsData} loading={loading} setLoading={setLoading} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default AdminDashboard;