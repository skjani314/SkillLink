import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Typography } from 'antd';


const { Text, Link } = Typography;


const Locsuggest = props => {


    const handleClick = (loc,pincode) => {

        props.handleModalCancel();
        props.setCurrLocation((prev) => ({name: loc,pincode }));
        props.setLocSearch('');


    }



    return (
        <>
        {
            (props.postcode) != null ?
                <div className='border p-1' style={{ cursor: 'pointer' }} onClick={() => { handleClick(props.name,props.postcode) }} >
                    <FaLocationDot color='red' /> <Text strong >{props.name + ","}{props.postcode + ','}{props.state}</Text>
                </div>
                : null
        }
        </>
    );
};



export default Locsuggest;