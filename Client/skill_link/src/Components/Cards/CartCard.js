import * as React from 'react';
import { Card, Typography, Grid, Row,Button, Avatar, Rate } from 'antd';
import { IoTime } from "react-icons/io5";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import userContext from '../Login/UserContext';
import './card.css';
import axios from 'axios';
import { FaLocationPin } from 'react-icons/fa6';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CartCard = props => {

    const screens = useBreakpoint();

const {error,success,loading,setLoading,setUser}=React.useContext(userContext);
const handleDelete=async ()=>{

setLoading(true);
try{


const result=await axios.delete('/orders?id='+props.data.id)

console.log(result.data);

success("Deleted Successfylly");
setUser(prev=>({...prev}))


}    
catch(err)
{
    console.log(err);
    
    error("Unable to delete Service from Cart");
}
setLoading(false);


}


    return (
        <div>
            <Card
                    hoverable
                >
                    <Row className='d-flex jusify-content-around align-items-center'>

                     <Avatar size={100} shape='square' className='mx-3' icon={<img src={props.data.img} />} />

                        <div className='d-flex flex-column justify-content-center m-3'>
                            <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.ser_name}</b> </Text>
                             <Text className='responsive-text'>by <b>{props.data.ser_pro_name}({props.data.proffision})</b> </Text>
                             <Rate value={props.data.rating} allowHalf size={screens.xs?10:50} />
                             <Text className='responsive-text'><IoTime color='blue' size={20} /> completed in<b> {props.data.time}</b></Text>
                             <Text className='responsive-text'><FaLocationPin color='blue' size={20} />{props.data.location}</Text>
                            <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} /> <b>{props.data.cost}</b></Text>
                        </div>
                    </Row>
                    <hr></hr>

<center><Button danger onClick={handleDelete}><FaTrash/> Remove</Button></center>
                </Card>
        </div>
    );
};



export default CartCard;