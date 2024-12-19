import { Avatar, Button, Card, Flex,Rate,Typography } from 'antd';
import React, { useContext } from 'react';
import { FaClock, FaRupeeSign,FaUser } from 'react-icons/fa';
import './card.css';
import { MdOutlineWork } from 'react-icons/md';
import userContext from '../Login/UserContext.js';
import axios from 'axios';
import { FaPhone } from 'react-icons/fa6';

const ServiceProvider = props => {

    const {Title,Text}=Typography;
   const {error,loading,setLoading,success,user, setUser}=useContext(userContext);

const handleAddCartClick=async ()=>{

setLoading(true);
try{

if(user==null || user.role!='customer')
{
props.handleCancel();
error('Log in as Customer First Before Ordering');
}
else
{
    const form_data=new FormData();
    form_data.append('customer_id',user._id);
    form_data.append('ser_pro_cost',props.data._id);

    const result=await axios.post(process.env.REACT_APP_API_URL+'/orders',form_data);
    console.log(result);
    success("Service Added to cart succesfully");
    setUser(prev=>({...prev}));
    props.handleCancel();
}

}
catch(err)
{
    error(err.response.data.message);
    console.log(err);
}

setLoading(false);

}





    return (
        <div>
            <Card
            
            style={{width:'100%'}}
            >
                <Flex gap={20} wrap >
                 <Avatar size={120} shape='square' className='p-0' icon={<img src={props.data.img} alt='service_provider' className='img-fluid'/>} />
                  <Flex vertical justify='center' gap={5}>
                   <Text className='fs-5'><b>{props.data.name}</b></Text>
                   <Rate value={props.data.rating} allowHalf className='container px-0'></Rate>

                   <Text ><MdOutlineWork/> {props.data.proffision}</Text>
{!props.agent?
                   <Text ><FaRupeeSign className='mb-1'/> {props.data.cost}</Text>
                   :<Text><FaPhone className='mb-1'/>  {props.data.mobile}</Text>
}
                   <Text ><FaClock className='mb-1'/> {props.data.time+" minuetes"}</Text>
                   {!props.agent?<Button className='bg-warning sr-card' block onClick={handleAddCartClick}>Add to Cart</Button>:null}
                  </Flex>
                </Flex>
            </Card>
        </div>
    );
};



export default ServiceProvider;