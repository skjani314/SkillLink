import React, { useEffect, useState } from 'react'
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import { Spin, Flex, Button, Modal, Upload } from 'antd';
import TopBar from '../../Components/TopBar/TopBar';
import AdminSideBar from './AdminSideBar';
import { useParams } from 'react-router-dom';
import { FaPlus, FaUpload } from 'react-icons/fa6';
import AdminServicesCard from '../../Components/Cards/AdminServicesCard';
import axios from 'axios';
import { TextField } from '@mui/material';

const AdminServices = props => {


    const { contextHolder, error, user, setUser, success,setLoading, loading, activeTab , changeActiveTab} = useContext(userContext);
    const [serData, setSerData] = useState([]);
    const { id } = useParams();
    const [formdata, setFormData] = useState({ isopen: false, category: '', ser_name: '' })
    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    
    useEffect(() => {

        changeActiveTab('SERVICES')
        const getData = async () => {


            try {
setLoading(true)
                const result = await axios.get('/services?name=""')
                setSerData([...result.data])
                setLoading(false)
            }
            catch (err) {
                console.log(err);
            }


        }

        getData()


    }, [])




    const handleSubmit = async () => {

setLoading(true);

        try {

const form_data=new FormData();

fileList.forEach(file => {
    form_data.append('img', file.originFileObj);
});
form_data.append('ser_name',formdata.ser_name)
form_data.append('category',formdata.category)
const result=await axios.post('/services',form_data);
console.log(result.data);
success("Services Uploaded Successfully");

        }
        catch (err) {

            error("Unable to Upload Service")
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
                            <AdminSideBar />
                        </div>
                        <div className="main-content" style={{ marginTop: '30px' }}>

                            <div className="dashboard-container pt-3">
                                <h1>services</h1>

                                <Flex justify="end">
                                    <Button onClick={()=>setFormData((prev) => ({ ...prev, isopen: true }))}><FaPlus></FaPlus> Add New Service</Button>
                                </Flex>

                                <h3>Our Services</h3>
                                <Flex wrap gap={10} justify='center'>
                                    {
                                        serData.map((each, index) => (
                                            <AdminServicesCard key={index} data={each} />
                                        ))
                                    }
                                </Flex>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>

            <Modal open={formdata.isopen} footer={<Button type="primary" onClick={handleSubmit}>submit</Button>} onCancel={(e)=>{setFormData({ isopen: false, category: '', ser_name: '' });setFileList([])}}>
                <Spin tip="Loading..." spinning={loading}>
                    <Flex vertical gap={10} className='mt-4'>
                    <TextField variant='outlined' label='Service Name' value={formdata.ser_name} onChange={(e) => { setFormData((prev) => ({ ...prev, ser_name: e.target.value })) }} />
                    <TextField variant="outlined" label='Category' value={formdata.category} onChange={(e) => { setFormData((prev) => ({ ...prev, category: e.target.value })) }} />
                    <Upload
                        multiple
                        listType="picture"
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >

                        <Button className='mt-1 p-4'><FaUpload /> Upload</Button>
                    </Upload>
                    </Flex>
                </Spin>
            </Modal>
        </>

    )

}

export default AdminServices;