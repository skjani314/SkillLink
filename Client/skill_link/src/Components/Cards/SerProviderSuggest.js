import React from 'react';
import { Card, Avatar, Flex ,Typography} from 'antd';

const {Text}=Typography;

const SerProviderSuggest = props => {


    const handleServiceSuggestClick=()=>{


        props.setserProSuggestData([])
        props.setIsOpen((prev)=>({...prev,ser_pro:props.data.name,ser_pro_id:props.data.ser_pro_id}))
    
    }
    
    return (
        <div onClick={handleServiceSuggestClick}>
                <Flex gap={5} style={{background:'white'}} className='m-1'>
                    <Avatar icon={<img src={props.data.img} alt='sugestion' />} size={40} className='m-1' shape='square' />
                    <Flex vertical>
                       <Text className='fs-5'>{props.data.name}</Text>
                       <Text style={{fontSize:'13px'}}>{props.data.proffision}</Text>
                    </Flex>
                </Flex>



                </div>
    );
};



export default SerProviderSuggest;