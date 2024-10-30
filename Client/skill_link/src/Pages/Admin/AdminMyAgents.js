import React, { useEffect } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext, useState } from 'react';
import { Spin, Flex } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AgentCard from '../../Components/Cards/AgentCard';

const AdminMyAgents = props => {


    const { contextHolder, error, user, setUser, success, activeTab ,changeActiveTab    } = useContext(userContext);
    const [agentsData, setagentsData] = useState([]);
    const [loading,setLoading]=useState(false);
    const { id } = useParams();

    useEffect(() => {
        changeActiveTab('MYAGENTS')

        const getData = async () => {

setLoading(true);
            try {
      
                const result = await axios.get('/agents?verified_by=' + user._id)
                setagentsData([...result.data])
            }
            catch (err) {
                console.log(err);
            }
setLoading(false);

        }

        getData();

    }, [])






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
                                <h1 className='p-1 m-1'>My Agents</h1>
                                <Flex wrap gap={10} justify='around'>
                                    {
                                        agentsData.map((each) => (
                                            <AgentCard data={each} />
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

export default AdminMyAgents;