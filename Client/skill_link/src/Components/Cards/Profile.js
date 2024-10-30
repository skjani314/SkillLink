import { Flex, Avatar, Typography, Card, Button, Modal, Rate, Upload, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import { FaNetworkWired, FaPhone, FaUser, FaUpload } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail, MdOutlineWorkOutline } from 'react-icons/md';
import { TextField } from '@mui/material';
import userContext from '../Login/UserContext';
import axios from 'axios';

const { Text } = Typography;
const Profile = props => {
    const { proffision, location, rating } = props.data;
    const [editData, setEditData] = useState({ isopen: false, mobile: props.data.mobile, name: props.data.name })
    const [fileList, setFileList] = useState([]);
    const { loading, setLoading, error, success, user, setUser } = useContext(userContext);
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };


    const handleSubmit = async () => {

        setLoading(true)

        try {

            const form_data = new FormData();
            form_data.append('name', editData.name);
            form_data.append('mobile', editData.mobile);
            form_data.append('id', user._id)
            fileList.forEach(file => {
                form_data.append('img', file.originFileObj);
            });
            const result = axios.post('/profile', form_data)
            console.log(result)
            success("Updated Successfully")
            setUser((prev) => ({ ...prev }))
        }
        catch (err) {
            console.log(err);
            error('Unable to Edit Profile');
        }



        setLoading(false)

    }


    return (
        <div>

            <h1>Profile</h1>
            <Card hoverable>
                <Flex vertical gap={10}>
                    <Avatar icon={<img src={props.data.img} />} size={150} shape="square" />
                    <Text><FaUser /> Name : {props.data.name}</Text>
                    <Text><FaPhone /> Mobile : {props.data.mobile}</Text>
                    <Text><MdEmail /> Email : {props.data.email}</Text>
                    <Text><FaNetworkWired /> Role : {props.data.role} </Text>
                    {proffision ? <Text><MdOutlineWorkOutline /> Profession :{proffision}</Text> : null}
                    {
                        location ? <Text><FaLocationDot /> Location : {location}</Text> : null
                    }
                    {
                        rating ? <Rate value={props.data.rating} allowHalf className='container px-0'></Rate>
                            : null
                    }

                </Flex>
            </Card>
            <center><Button type='primary' onClick={() => setEditData((prev) => ({ ...prev, isopen: true }))}>Edit</Button> </center>


            <Modal open={editData.isopen} footer={<Button type='primary' onClick={handleSubmit}>Update</Button>} onCancel={() => setEditData({ isopen: false, mobile: props.data.mobile, img: props.data.img, name: props.data.name })}>
                <Spin tip={'....Loading'} spinning={loading}>

                    <Flex vertical gap={10}>
                        <h1> Edit Profile</h1>
                        <TextField variant='outlined' value={editData.name} label='Name' onChange={(e) => { setEditData((prev) => ({ ...prev, name: e.target.value })) }} />
                        <TextField variant='outlined' value={editData.mobile} label='Name' onChange={(e) => { setEditData((prev) => ({ ...prev, mobile: e.target.value })) }} />

                        <p>Upload Profile Image</p>
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

        </div>
    );
};



export default Profile;