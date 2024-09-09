import { Avatar,Grid } from 'antd';
import React from 'react';


const {useBreakpoint} =Grid;

const CategoryCard = props => {

const screens=useBreakpoint();

    return (
        <div className='container'>
         <center> <Avatar size={screens.xs?70:screens.sm?80:100} icon={<img src={props.data.imgurl} className='img-fluid'/>} /><br></br>
            {props.data.name}</center>
        </div>
    );
};



export default CategoryCard;