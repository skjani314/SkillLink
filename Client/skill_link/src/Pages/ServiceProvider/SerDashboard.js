import React from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext, useState, useEffect } from 'react';
import { Spin, Card, Flex, Button } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import './ServiceProvider.css'
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios';


const SerDashboard = props => {


    const { contextHolder, error, user, setUser, success, loading, activeTab, changeActiveTab, setLoading } = useContext(userContext);
    const [req_data, setReqData] = useState({ Proffision: '', location: '', })
    const { id } = useParams();

    useEffect(() => {


        changeActiveTab('DASHBOARD');


    }, [])


    const handleReqSubmit = async () => {

        setLoading(true);

        try {

            const form_data = new FormData();
            form_data.append('req_from', user._id);
            form_data.append('proffision', req_data.Proffision);
            form_data.append('location', req_data.location);

            const result = await axios.post('/requests', form_data);
             setUser((prev)=>({...prev,status:true}));
            console.log(result.data);
            success("your Request is Submited Succesfully");
        }
        catch (err) {

            error("Unable to Request or Unavailable At That Location");
        }

        setLoading(false);
    }




    if (id != user._id) {
        return null;
    }

console.log(user)


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
                            {user.verified ?
                                <Dashboard /> :
                                <>
                                    {!user.status ?
                                        <center>
                                            <Card
                                                title="Fill The Request Details"

                                            >
                                                <Flex vertical gap={10}>
                                                    <TextField variant='outlined' label='Proffision' value={req_data.Proffision} onChange={(e) => { setReqData((prev) => ({ ...prev, Proffision: e.target.value })) }} />
                                                    <TextField variant='outlined' label='Pincode' value={req_data.location} onChange={(e) => { setReqData((prev) => ({ ...prev, location: e.target.value })) }} />
                                                    <Flex justify="end">
                                                        <Button type='primary' onClick={handleReqSubmit}>Submit</Button>
                                                    </Flex>
                                                </Flex>

                                            </Card>
                                        </center> :
                                        <center>
                                        <Card
                                        >
                                            <h1>Your Request is Under processing</h1>
                                            <img alt="pending" src='https://cdn-icons-png.flaticon.com/512/1027/1027650.png' style={{width:'40%'}} className='img-fluid'/>
                                            </Card></center>
                                            
                                    }
                                </>
                            }
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

}

export default SerDashboard;