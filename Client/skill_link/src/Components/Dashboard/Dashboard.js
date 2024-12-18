import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css'
import { Typography, Flex, Spin,Card, Table } from 'antd';
import userContext from '../Login/UserContext';
import OrderRequests from '../Tables/OrderRequests.js'
import axios from 'axios';
const { Text } = Typography;
const Dashboard = () => {

  const { user, error, loading, setLoading } = useContext(userContext);
  const [requestsData, setRequestsData] = useState([]);

  useEffect(() => {


    const getRequestsData = async () => {

      setLoading(true);
      try {

           const result=await axios.get(process.env.REACT_APP_API_URL+'/orders?user_id='+user._id);
           setRequestsData(result.data);
       }
      catch (err) {
        console.log(err);
        error('unable to fetch Requests');

      }
      setLoading(false);

    }

    getRequestsData();


  }, [])

  return (
    <Spin tip="Loading...." size='large' spinning={loading}>
      <div className="dashboard-container pt-3">

        <h1><b>Dashboard</b></h1>
        <br></br>
        <Text className='fs-1'>Welcome ,<b style={{ color: 'blue' }}>{user.name}</b></Text>
        <br></br>
        <div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
          <h2 >Recent Requests</h2>
          <OrderRequests rowsData={requestsData}/>

        </div>



      </div>
    </Spin>
  );
};


export default Dashboard;
