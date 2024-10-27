import  React,{useContext, useState} from 'react';
import { Card, Typography, Grid, Row, Col, Avatar, Modal, Spin } from 'antd';
import { MdPeopleAlt } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import './card.css';
import ServiceProvider from './ServiceProvider';
import userContext from '../Login/UserContext';
import axios from 'axios';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;


const ServiceCard = props => {

  
    const {loading,setLoading,success,error}=useContext(userContext);

    const screens = useBreakpoint();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ser_pro_data,setSerProData]=useState([]);
    const showModal = async () => {
        setIsModalOpen(true);
       setLoading(true);
        try{

    const data=await Promise.all(
        props.data.service_providers.map(async (each)=>{
           const {cost,time,_id}=each;
           console.log(each)
          const result=await axios.get('/serviceproviders?ser_id='+each.ser_pro);
          return {cost,time,_id,...result.data};

        })
    )        
           setSerProData([...data]);
      }catch(err)
      {
         error("something went wrong");
      }
      setLoading(false);

    }
      
const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <>
        <div className='m-1' onClick={showModal}>
            {!props.mobile ?
                <Card
                    hoverable
                    cover={<img alt="example" height={200} width={150} className='p-2' src={props.data.img} />}
                    className='my-3'
                    style={{ background: 'white' }}
                >
                    <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.name}</b> </Text> <br></br>

                    <Text className='responsive-text'> <MdPeopleAlt color='blue' className='mb-1' size={screens.xs ? 15 : screens.md ? 15 : 10} /> Available:<b>{props.data.service_providers.length}</b></Text> <br></br>
                    <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} />From :<b>{props.data.max}</b></Text>
                </Card>
                :
                <Card
                    hoverabl
                >
                    <Row className='d-flex jusify-content-around align-items-center'>

                        <Avatar size={80} shape='square' icon={<img src={props.data.img} />} />

                        <div className='d-flex flex-column justify-content-center m-3'>
                            <Text level={4} style={{ color: 'black' }} className='responsive-text'><b>{props.data.name}</b> </Text>

                            <Text className='responsive-text'> <MdPeopleAlt color='blue' className='mb-1' size={screens.xs ? 15 : screens.md ? 15 : 10} /> Available:<b>{props.data.service_providers.length}</b></Text>
                            <Text className='responsive-text'> <FaRupeeSign color='blue' size={screens.xs ? 15 : screens.md ? 15 : 10} />From :<b>{props.data.max}</b></Text>

                        </div>
                    </Row>
                </Card>

            }
        </div>
        <Modal title="Select Your Service Provider" open={isModalOpen}  onCancel={handleCancel} footer={null}>
        <Spin tip="Loading...." size='large' spinning={loading}>
        { 
            
            ser_pro_data.map((each)=>(
            <ServiceProvider data={each} agent={props.agent} key={each._id} handleCancel={handleCancel}/>
           
        ))
           }
     </Spin>
      </Modal>
        </>
    );
};



export default ServiceCard;