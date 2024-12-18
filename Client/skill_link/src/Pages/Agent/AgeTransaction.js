import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin, Typography,Modal } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AgentSideBar from './AgentSideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RequestTable from '../../Components/Tables/RequestTable.js'
import { TextField } from '@mui/material';

const AgeTransaction = props => {

    const { contextHolder, error, user, setUser, success, activeTab ,changeActiveTab} = useContext(userContext);

    const [requestsData, setRequestsData] = useState([]);
    const { id } = useParams();
    const { Text } = Typography;
    const [loading,setLoading] =useState(false);

    useEffect(() => {

        changeActiveTab('TRANSACTION')
        const getData = async () => {


            try {

                const result = await axios.get(process.env.REACT_APP_API_URL+'/requests?req_to=' + user._id+'&transaction_flag=true');
                setRequestsData(result.data);
                console.log(result.data);
            }
            catch (err) {
                console.log(err);
            }





        }




        getData();




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
                            <AgentSideBar />
                        </div>
                        <div className="main-content">

                            <div className="dashboard-container pt-3">
                                <h1><b>Transactions</b></h1>
                                <br></br>
                                <div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
                                    <h2 >Transactions</h2>
                                    <RequestTable rowsData={requestsData} loading={loading} setLoading={setLoading} transaction/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
           
        </>

    );
};


export default AgeTransaction;