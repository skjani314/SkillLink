import { Avatar,Grid } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const {useBreakpoint} =Grid;

const CategoryCard = props => {

const screens=useBreakpoint();

    return (
        <Link  className="Link" to={"/services?name="+props.data.category}>
        <div className='container'>
         <center> <Avatar size={screens.xs?70:screens.sm?80:100} icon={<img src={props.data.img} className='img-fluid'/>} /><br></br>
            {props.data.category}</center>
        </div></Link>
    );
};



export default CategoryCard;