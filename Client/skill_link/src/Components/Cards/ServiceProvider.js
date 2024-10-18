import { Avatar, Button, Card, Flex,Rate,Typography } from 'antd';
import React from 'react';
import { FaClock, FaRupeeSign,FaUser } from 'react-icons/fa';
import './card.css';
import { MdOutlineWork } from 'react-icons/md';


const ServiceProvider = props => {

    const {Title,Text}=Typography;

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
                   <Text ><FaRupeeSign className='mb-1'/> {props.data.cost}</Text>
                   <Text ><FaClock className='mb-1'/> {props.data.time+" minuetes"}</Text>
                   <Button className='bg-warning sr-card' block>Add to Cart</Button>
                  </Flex>
                </Flex>
            </Card>
        </div>
    );
};



export default ServiceProvider;