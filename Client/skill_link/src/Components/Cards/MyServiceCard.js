import React, { useContext, useState } from 'react';
import { Flex, Avatar, Typography,Card,Grid,Button ,Modal,Spin} from 'antd';
import { FaLocationPin, FaRupeeSign } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa';
import userContext from '../Login/UserContext';
import { TextField } from '@mui/material';
import axios from 'axios';


const { Text } = Typography;
const { useBreakpoint } = Grid;
const MyServiceCard = props => {

    const screens = useBreakpoint();
    const [isModalOpen,setModalOpan]=useState(false);
    const {error,success}=useContext(userContext);
    const [form_data,setForm_Data]=useState({cost:props.data.cost,time:props.data.time});
    const {loading,setLoading}=props;



const handleSubmission=async ()=>{

try{

setLoading(true);



const result =await axios.put('/locservices?cost='+form_data.cost+"&time="+form_data.time+"&id="+props.data.id);
setModalOpan(false); 
success('Srvice details updated successfully');

}
catch(err)
{
    error("unable to update");
    console.log(err);
}
setLoading(false);
}


    return (
        <div>
            <Card hoverable style={{height:screens.md?'230px':screens.sm?'230px':'40vh',width:screens.md?'550px':screens.sm?'500px':'90vw'}}>
            <Flex gap={10}>
                <Avatar shape='square' icon={<img src={props.data.img} />} size={screens.xs?100:130} />
                <Flex vertical gap={5}>
                    <Text><b style={{fontSize:screens.xs?18:31}}>{props.data.name}</b></Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaRupeeSign color='blue' size={17}/> {props.data.cost}</Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaClock color='blue' size={17}/> {props.data.time}</Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaLocationPin color='blue'size={17} /> {props.data.location}</Text>
                </Flex>

            </Flex>
            <Flex justify='end'>
            <Button className='bg-warning' onClick={()=>{setModalOpan(true)}}> Edit</Button>
            </Flex>
            </Card>
            <Modal open={isModalOpen} onCancel={()=>{setModalOpan(false)}} footer={null}>
            <Spin tip="Loading...." size='large' spinning={loading}>
                <h1>Edit Your Services</h1>
                 <Flex gap={10} justify='around' wrap>
                 <TextField variant='outlined' label="Cost" placeholder='cost' value={form_data.cost} onChange={(e)=>{setForm_Data((prev)=>({...prev,cost:e.target.value}))}} />
                 <TextField variant='outlined' label="Time" placeholder='time' value={form_data.time} onChange={(e)=>{setForm_Data((prev)=>({...prev,time:e.target.value}))}}/>
                 </Flex>
                 <Flex justify='end' gap={10} align='around'>
                    <Button onClick={handleSubmission} type='primary'>submit</Button>
                    </Flex>
                </Spin>
            </Modal>
        </div>
    );
};



export default MyServiceCard;