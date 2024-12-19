import React from 'react';
import {Avatar, Card, Flex,Typography,Grid} from 'antd';
import { FaMobile, FaUser } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';



const {Text}=Typography;
const {useBreakpoint}=Grid;
const AgentCard = props => {
    const screens=useBreakpoint();
    return (
        <Card>
            <Flex gap={10} justify='around' wrap>
                <Avatar icon={<img src={props.data.img}/>} size={screens.xs?80:100} shape='square'/>
                <Flex gap={10} vertical className='mt-2'> 
                  <Text><FaUser/> {props.data.name}</Text>
                  <Text><FaMobile/> {props.data.mobile}</Text>
                  <Text><FaLocationPin/> {props.data.location}</Text>
                </Flex>
                </Flex>
        </Card>
    );
};



export default AgentCard;