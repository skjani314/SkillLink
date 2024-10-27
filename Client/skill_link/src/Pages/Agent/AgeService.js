import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin, Flex, Button, Row, Col, Modal } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AgentSideBar from './AgentSideBar';
import { useParams } from 'react-router-dom';
import ServiceCard from '../../Components/Cards/ServiceCard';
import { FaPlus } from 'react-icons/fa';
import { MdSettingsInputComponent } from 'react-icons/md';
import { TextField } from '@mui/material';
import ServiceSuggest from '../../Components/Cards/ServiceSuggest';
import axios from 'axios';
import SerProviderSuggest from '../../Components/Cards/SerProviderSuggest';

const AgeService = props => {


    const { contextHolder, error, user, loading,setLoading, success, activeTab, changeActiveTab, servicesData, setCurrLocation,serProData } = useContext(userContext);
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState({ modal: false, ser_id: '', service_id: '', ser_pro: '', ser_pro_id: '', cost: '', time: '' })
    const [serviceSuggestData, setServiceSuggestData] = useState([]);
    const [serProSuggestData, setserProSuggestData] = useState([]);

    useEffect(() => {
        changeActiveTab("SERVICES")
        setCurrLocation(user.location);
    }, [])

const hanldeSerProChange=async (e)=>{

    setIsOpen((prev) => ({ ...prev, ser_pro: e.target.value }))

    if (e.target.value == '') {
        setserProSuggestData([]);
    }
    else {

        const data = serProData.filter((each) => (

            each.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setserProSuggestData([...data]);

    }


}

    const handleServiceChange = async (e) => {

        setIsOpen((prev) => ({ ...prev, ser_id: e.target.value }))
        if (e.target.value == '') {
            setServiceSuggestData([]);
        }
        else {

            const data = servicesData.filter((each) => (

                each.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                each.category.toLowerCase().includes(e.target.value.toLowerCase())
            ))
            setServiceSuggestData([...data]);

        }


    }

const handleSubmitClick=async ()=>{

setLoading(true);
try{
const form_data=new FormData();

form_data.append('pincode',user.location);
form_data.append('ser_id',isOpen.service_id);
form_data.append('ser_pro',isOpen.ser_pro_id);
form_data.append('cost',isOpen.cost);
form_data.append('time',isOpen.time);

const result=await axios.post('/locservices',form_data);
console.log(result.data);
success('Service Added Successfully')

}
catch(err)
{
    error('Unable To Add The Service')
    console.log(err);
}
setLoading(false);
}




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
                                <h1>Services</h1>

                                <Flex justify="end" gap={10}>
                                    <Button onClick={() => { setIsOpen((prev) => ({ ...prev, modal: true })) }}><FaPlus />Add New Services</Button>
                                </Flex>
                                <h2>Recent Service</h2>
                                <Row>
                                    {
                                        servicesData.map((each, index) => (
                                            <Col span={11} offset={1} key={index}>
                                                <ServiceCard data={each} agent />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>

            <Modal open={isOpen.modal} footer={null} onCancel={()=>setIsOpen((prev) => ({ modal: false, ser_id: '', service_id: '', ser_pro: '', ser_pro_id: '', cost: '', time: '' }))
}>
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h1>Enter Details </h1>
                    <Flex vertical gap={10}>
                        <TextField variant='outlined' label="Service" value={isOpen.ser_id} onChange={(e) => { handleServiceChange(e) }} />
                        <div style={{ background: 'whitesmoke' }}>
                            <Flex vertical justify='around'>
                                {serviceSuggestData.map((each, index) => (
                                    <ServiceSuggest key={index} data={each} setServiceSuggestData={setServiceSuggestData} setIsOpen={setIsOpen} />))
                                }
                            </Flex>
                        </div>
                        <TextField variant='outlined' label="Provider" value={isOpen.ser_pro} onChange={(e) => { hanldeSerProChange(e)}} />
                        <div style={{ background: 'whitesmoke' }}>
                            <Flex vertical justify='around'>
                                {serProSuggestData.map((each, index) => (
                                    <SerProviderSuggest key={index} data={each} setserProSuggestData={setserProSuggestData} setIsOpen={setIsOpen} />))
                                }

                            </Flex>
                        </div>

                        <TextField variant='outlined' label="Cost" value={isOpen.cost} onChange={(e) => { setIsOpen((prev) => ({ ...prev, cost: e.target.value })) }} />
                        <TextField variant='outlined' label="Time" value={isOpen.time} onChange={(e) => { setIsOpen((prev) => ({ ...prev, time: e.target.value })) }} />
                        <Flex justify='end'>
                            <Button type='primary' onClick={handleSubmitClick}>submit </Button>
                        </Flex>
                    </Flex>


                </Spin>

            </Modal>
        </>

    )

}

export default AgeService;