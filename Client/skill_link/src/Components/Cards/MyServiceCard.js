import React from 'react';
import { Flex, Avatar, Typography,Card,Grid,Button } from 'antd';
import { FaLocationPin, FaRupeeSign } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa';

const { Text } = Typography;
const { useBreakpoint } = Grid;
const MyServiceCard = props => {

    const screens = useBreakpoint();


    return (
        <div>
            <Card hoverable style={{height:screens.md?'230px':screens.sm?'230px':'45vh',width:screens.md?'550px':screens.sm?'500px':'90vw'}}>
            <Flex gap={10}>
                <Avatar shape='square' icon={<img src={props.data.img} />} size={screens.xs?100:130} />
                <Flex vertical gap={5}>
                    <Text><b style={{fontSize:screens.xs?18:31}}>{props.data.name}</b></Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaRupeeSign color='blue' size={17}/> {props.data.cost}</Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaClock color='blue' size={17}/> {props.data.time}</Text>
                    <Text style={{fontSize:screens.xs?10:17}}><FaLocationPin color='blue'size={17} /> {props.data.location}</Text>
                    <Button className='bg-warning'> Edit</Button>
                </Flex>

            </Flex>
            </Card>
        </div>
    );
};



export default MyServiceCard;