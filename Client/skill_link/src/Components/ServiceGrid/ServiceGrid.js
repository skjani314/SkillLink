import React from 'react';
import {Row,Col} from 'antd';
import ServiceCard from '../Cards/ServiceCard';
import { IoIosArrowDroprightCircle } from "react-icons/io";


const ServiceGrid = props => {

   

    return (
        <>
        <div style={{backgroundColor:props.bgcolor}} className='m-2 p-1'>
        <Row>
         <Col span={20} > 
        <h4 style={{color:props.heading.color}} className='m-3'>{props.heading.title}</h4>
        </Col>  
        <Col md={{span:2,offset:2}} xs={{span:4}}>
        <IoIosArrowDroprightCircle size={35} color='black' className='m-2 p-1'/>
        </Col>
        </Row>
       <Row  >
 {props.data.map((each)=>(<Col span={11} offset={1}><ServiceCard data={each} /></Col>))

}
       </Row>
       </div>
       </>
    );
};



export default ServiceGrid;