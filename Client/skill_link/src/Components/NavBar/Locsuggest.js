import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import {Typography} from 'antd';


const { Text, Link } = Typography;


const Locsuggest = props => {


const handleClick=(loc)=>{

    props.handleModalCancel();
    props.setCurrLocation(loc);
    props.setLocSearch('');


}



    return (
        <div className='border p-1' style={{cursor:'pointer'}} onClick={()=>{handleClick(props.name)}} >
        <FaLocationDot color='red' /> <Text strong >{props.name+","}{props.postcode+','}{props.state}</Text>
    </div>
    );
};



export default Locsuggest;