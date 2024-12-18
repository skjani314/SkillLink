import {Spin} from 'antd';
import userContext from '../Login/UserContext';
import React, { useContext, useState,useEffect } from 'react';
import OrderRequests from '../Tables/OrderRequests';
import axios from 'axios';


const Transactions = () => {

const {user,loading,error,setLoading}=useContext(userContext);
const [TransactionData,setTransactionData]=useState([]);


useEffect(() => {


    const getTransactionData = async () => {

      setLoading(true);
      try {

           const result=await axios.get(process.env.REACT_APP_API_URL+'/orders?user_id='+user._id+'&status=tran');
           console.log(result.data);
           setTransactionData(result.data);
       }
      catch (err) {
        console.log(err);
        error('unable to fetch Requests');

      }
      setLoading(false);

    }

    getTransactionData();


  }, [])

    return (
        <Spin tip="Loading...." size='large' spinning={loading}>

        <div className="dashboard-container pt-3">

<h1 className='p-2 m-2'>Transactions</h1>
<div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
          <h2 >Recent Requests</h2>
          <OrderRequests rowsData={TransactionData} transaction={true}/>

        </div>
        </div>
    
    </Spin>
    );
};


export default Transactions;
