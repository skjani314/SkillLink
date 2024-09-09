import  React,{useState} from 'react';
import { Card, Typography, Grid, Row, Col, Avatar, Modal } from 'antd';
import { MdPeopleAlt } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import './card.css';
import ServiceProvider from './ServiceProvider';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;


const ServiceCard = props => {

    const data=[
        {
            name:'sadik',
            profession:'mechanic',
            rate:3.5,
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
             price:200,
        },
        {
            name:'sadik',
            profession:'mechanic',
            rate:2.5,
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
             price:200,
        },
        {
            name:'sadik',
            profession:'mechanic',
            rate:1.5,
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
             price:200,
        },{
            name:'sadik',
            profession:'mechanic',
            rate:5,
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
             price:200,
        },
    ]

    const screens = useBreakpoint();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return (
        <>
        <div className='m-1' onClick={showModal}>
            {!props.mobile ?
                <Card
                    hoverable
                    cover={<img alt="example" height={200} width={150} className='p-2' src={props.data.imgurl} />}
                    className='my-3'
                    style={{ background: 'white' }}
                >
                    <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.name}</b> </Text> <br></br>

                    <Text className='responsive-text'> <MdPeopleAlt color='blue' className='mb-1' size={screens.xs ? 15 : screens.md ? 15 : 10} /> Available:<b>{props.data.available}</b></Text> <br></br>
                    <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} />From :<b>{props.data.from}</b></Text>
                </Card>
                :
                <Card
                    hoverabl
                >
                    <Row className='d-flex jusify-content-around align-items-center'>

                        <Avatar size={80} shape='square' icon={<img src={props.data.imgurl} />} />

                        <div className='d-flex flex-column justify-content-center m-3'>
                            <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.name}</b> </Text>

                            <Text className='responsive-text'> <MdPeopleAlt color='blue' className='mb-1' size={screens.xs ? 15 : screens.md ? 15 : 10} /> Available:<b>{props.data.available}</b></Text>
                            <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} />From :<b>{props.data.from}</b></Text>

                        </div>
                    </Row>
                </Card>

            }
        </div>
        <Modal title="Select Your Service Provider" open={isModalOpen}  onCancel={handleCancel} footer={null}>
           { 
            
            data.map((each)=>(
            <ServiceProvider data={each}/>
           
        ))
           }

      </Modal>
        </>
    );
};



export default ServiceCard;