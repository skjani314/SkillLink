import * as React from 'react';
import { Card, Typography, Grid, Row,Button, Avatar, Rate } from 'antd';
import { IoTime } from "react-icons/io5";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import './card.css';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CartCard = props => {

    const screens = useBreakpoint();



    return (
        <div>
            <Card
                    hoverabl
                >
                    <Row className='d-flex jusify-content-around align-items-center'>

                     <Avatar size={100} shape='square' className='mx-3' icon={<img src={props.data.imgurl} />} />

                        <div className='d-flex flex-column justify-content-center m-3'>
                            <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.name}</b> </Text>
                             <Text className='responsive-text'>by <b>{props.data.provider}</b> </Text>
                             <Rate value={props.data.rate} allowHalf size={screens.xs?10:50} />
                             <Text className='responsive-text'><IoTime color='blue' size={20} /> completed in<b> {props.data.time}</b></Text>
                            <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} /> <b>{props.data.price}</b></Text>
                        </div>
                    </Row>
                    <hr></hr>

<center><Button danger><FaTrash/> Remove</Button></center>
                </Card>
        </div>
    );
};



export default CartCard;