import React from 'react';
import { Card, Flex, Avatar,Typography ,Grid} from 'antd';
import { GrServices } from 'react-icons/gr';
import { BiSolidCategory } from "react-icons/bi";
import { useBeforeUnload } from 'react-router-dom';


const {Text}=Typography;
const {useBreakpoint}=Grid;
const AdminServicesCard = props => {

const screens =useBreakpoint();

    return (
        <div>

            <Card style={{minWidth:screens.xs?'200px':'300px'}}>

                <Flex gap={10} justify='around' vertical>
                    <Avatar icon={<img src={props.data.img} alt='service'/>} shape="square" size={screens.xs?70:100} />
                        <Text style={{fontSize:screens.xs?13:18}}><GrServices/> {props.data.name}</Text>
                        <Text style={{fontSize:screens.xs?13:18}}><BiSolidCategory /> {props.data.category}</Text>
                </Flex>
            </Card>

        </div>
    );
};



export default AdminServicesCard;