import { Row, Col, Card, Button, Typography,Grid } from 'antd';
import React from 'react';
import CartCard from '../../Components/Cards/CartCard';
import Nav from '../../Components/NavBar/Nav';
import { Footer } from 'antd/es/layout/layout';
import { IoAdd } from "react-icons/io5";
import { FaRupeeSign } from 'react-icons/fa';


const { Text } = Typography;
const {useBreakpoint}=Grid;
const Cart = props => {

const screens=useBreakpoint();

    const data = [

        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",
            provider: "sadik",
            price: 500,
            rate: 3.5,
            time: "40 minutes"
        },

        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",
            provider: "sadik",
            price: 500,
            rate: 3.5,
            time: "40 minutes"
        },
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",
            provider: "sadik",
            price: 500,
            rate: 3.5,
            time: "40 minutes"
        },
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",
            provider: "sadik",
            price: 500,
            rate: 3.5,
            time: "40 minutes"
        },
    ]


    return (
        <>
            <Nav></Nav>
            <div className='mt-5 mx-2'>
                <h1 className='m-2'>Cart List</h1>
                <Row className='' style={{ background: "whitesmoke" }}>
                    <Col md={{ span: 14, offset: 1 }} sm={{span:22,offset:1}} xs={{ span: 22, offset: 1 }} className='mb-5 pb-3'>
                        <Row>
                            {

                                data.map((each) => (
                                    <Col span={24} className='m-1'>
                                        <CartCard data={each} />
                                    </Col>
                                ))

                            }
                        </Row>


                    </Col>
                    <Col md={{ span: 8, offset: 1 }} sm={{span:22,offset:1}} xs={{span:22,offset:1}} className='mb-5 pb-3' >
                        <Row>

                            <Col span={22} className='m-1'>
                                <Card
                                    title="Address"
                                >
                                    <div className='d-flex flex-column justify-content-around' style={{ gap: "10px" }}>
                                        <Row >
                                            <Col span={2} className='d-flex flex-column justify-content-center'>
                                                <input type='radio' />
                                            </Col>
                                            <Col span={22} style={{ border: "1px solid grey", borderRadius: "10px" }} className='p-1'>
                                                <Text >
                                                    skjani,22-23-3,muslimpeta,sattenapalli
                                                    skjani,22-23-3,muslimpeta,sattenapalli
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col span={2} className='d-flex flex-column justify-content-center'>
                                                <input type='radio' />
                                            </Col>
                                            <Col span={22} style={{ border: "1px solid grey", borderRadius: "10px" }} className='p-1'>
                                                <Text >
                                                    skjani,22-23-3,muslimpeta,sattenapalli
                                                    skjani,22-23-3,muslimpeta,sattenapalli
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Button><IoAdd color='blue' /> Add Address</Button>

                                    </div>
                                </Card>
                            </Col>
                            <Col span={22} className='m-1'>
                                <Card
                                    title="price Details"
                                >
                                    <div className='d-flex flex-column' style={{ gap: "5px" }}>
                                        {data.map((each) => (

                                            <div className='d-flex justify-content-between'><Text>{each.name}</Text> <Text><FaRupeeSign /> {each.price}</Text></div>

                                        ))
                                        }
                                        <div className='d-flex justify-content-between'><Text>Platform Fee</Text> <Text><FaRupeeSign /> 5</Text></div>
                                        <hr></hr>
                                        <div className='d-flex justify-content-between'><Text><b>Total</b></Text> <Text><FaRupeeSign /> <b>5000</b></Text></div>


                                    </div>
                                </Card>

                            </Col>

                        </Row>
                    </Col>
                    <Col md={{span:22,offset:1}} xs={{span:23}}
                    style={{position:'fixed',bottom:'0%',width:'100%'}}
                    
                    >
                    <Card style={{backgroundColor:'#2f4f4f'}} >
                        <div className='d-flex justify-content-between align-items-center' >
                         <Text type='success' className='fs-3'><b>Total:<FaRupeeSign/> 5000</b></Text>
                         <Button type='primary' size={screens.xs?'medium':screens.md?'large':'medium'}>Get Service</Button>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};



export default Cart;