import { Avatar, Button, Card, Flex,Rate,Typography } from 'antd';
import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import './card.css';


const ServiceProvider = props => {

    const {Title,Text}=Typography;

    return (
        <div>
            <Card
            
            style={{width:'100%'}}
            >
                <Flex gap={20} wrap >
                 <Avatar size={100} shape='square' className='p-0' icon={<img src={props.data.imgurl} alt='service_provider' className='img-fluid'/>} />
                  <Flex vertical justify='center' gap={5}>
                   <Text className='fs-5'><b>{props.data.name}</b></Text>
                   <Text className='fs-5'><b>{props.data.profession}</b></Text>
                   <Rate value={props.data.rate} allowHalf className='container'></Rate>
                   <Text className='fs-4'><FaRupeeSign className='mb-1'/> {props.data.price}</Text>
                   <Button className='bg-warning sr-card' block>Add to Cart</Button>
                  </Flex>
                </Flex>
            </Card>
        </div>
    );
};



export default ServiceProvider;