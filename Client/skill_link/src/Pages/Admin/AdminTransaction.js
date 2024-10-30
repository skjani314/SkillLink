import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin ,Typography} from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';
import { useParams } from 'react-router-dom';
import AdminReqTable from '../../Components/Tables/AdminReqTable';
import axios from 'axios';


const {Text}=Typography;

const AdminTransaction = props => {

    const { contextHolder, error, user, setUser, success, activeTab, changeActiveTab } = useContext(userContext);
    const [TransactionData,setTransactionData]=useState([])
    const {id}=useParams();
    const [loading,setLoading]=useState(false)


useEffect(()=>{
    changeActiveTab('TRANSACTION')
const getData=async ()=>{



try{

const result=await axios.get('/requests?transaction_flag=true&req_to='+user._id)
setTransactionData([...result.data])

}
catch(err)
{
    console.log(err);
}



}



getData();


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
                            <AdminSideBar />
                        </div>
                        <div className="main-content" style={{marginTop:'30px'}}>

                            <div className="dashboard-container pt-3">
                            <h1><b>Transactions</b></h1>
                                <br></br>
                        
                                <div style={{ background: 'white', minHeight: '70vh' }} className='p-2 m-2'>
                                    <h2 >Recent Transactions</h2>
                                    <AdminReqTable rowsData={TransactionData} loading={loading} transaction setLoading={setLoading} />
                                </div>                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </>

    )

};



export default AdminTransaction;