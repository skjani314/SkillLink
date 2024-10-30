import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin, Typography, Flex, Button, Card } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AgentSideBar from './AgentSideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RequestTable from '../../Components/Tables/RequestTable.js'
import { TextField } from '@mui/material';


const AgeDashboard = props => {


    const { contextHolder, error, user, setUser, success, activeTab, changeActiveTab } = useContext(userContext);
    const [requestsData, setRequestsData] = useState([]);
    const [formdata, setformdata] = useState({ location: '', status: '' })
    const { id } = useParams();
    const { Text } = Typography;
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        changeActiveTab('DASHBOARD')
        const getData = async () => {


            try {

                const result = await axios.get('/requests?req_to=' + user._id);
                const req_result = await axios.get('/requests?req_from=' + user._id);
                setRequestsData(result.data);
                console.log(req_result.data);
                setformdata((prev) => ({ ...prev, status: req_result.data.status }))
            }
            catch (err) {
                console.log(err);
            }





        }




        getData();




    }, [loading,user])

    const handleReqClick = async () => {

        setLoading(true);
        try {
            const form_data = new FormData();
            form_data.append('location', formdata.location);
            form_data.append('req_from', user._id);
            const result = await axios.post('/requests', form_data);
            console.log(result.data);

        }
        catch (err) {
            error("unable Process the Request");
            console.log(err);
        }


        setLoading(false);

    }

console.log(user)


    if (id != user._id) {
        return null;
    }

    return (
        <>
            {contextHolder}
            {
                user.verified ?
                    <Spin tip="Loading...." size='large' spinning={loading}>
                        <div className="home-container">
                            <div className="home-header-sidebar"><TopBar /></div>

                            <div className="header-down">
                                <div className="sidebar-container">
                                    <AgentSideBar />
                                </div>
                                <div className="main-content">

                                    <div className="dashboard-container pt-3">
                                        <h1><b>Dashboard</b></h1>
                                        <br></br>
                                        <Text className='fs-1'>Welcome ,<b style={{ color: 'blue' }}>{user.name}</b></Text>
                                        <br></br>
                                        <div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
                                            <h2 >Recent Requests</h2>
                                            <RequestTable rowsData={requestsData} loading={loading} setLoading={setLoading} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Spin> :
                    <>
                        {

                            <Spin tip="Loading...." size='large' spinning={loading}>

                                <div className="home-container">
                                    <div className="home-header-sidebar"><TopBar /></div>

                                    <div className="header-down">
                                        <div className="sidebar-container">
                                            <AgentSideBar />
                                        </div>
                                        <div className="main-content">

                                            <div className="dashboard-container pt-3">
                                                {
                                                    user.status !== 'Pending' ?
                                                        <>
                                                            <h2>Enter The Location Where Do You want to Work</h2>
                                                            <center>
                                                                <Flex justify="around" gap={10} >

                                                                    <TextField variant='outlined' label="Pincode" value={formdata.location} onChange={(e) => { setformdata({ location: e.target.value }) }} />


                                                                    <Button type="primary" className='mt-2' onClick={handleReqClick}>Submit</Button>

                                                                </Flex>
                                                            </center>
                                                        </>
                                                        : <center>
                                                            <Card
                                                            >
                                                                <h1>Your Request is Under processing</h1>
                                                                <img alt="pending" src='https://cdn-icons-png.flaticon.com/512/1027/1027650.png' style={{ width: '40%' }} className='img-fluid' />
                                                            </Card></center>

                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Spin>

                        }
                    </>

            }
        </>

    );

}

export default AgeDashboard;