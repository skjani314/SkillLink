import { Row, Col, Card, Button, Typography, Grid, Spin, Modal, Flex } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import CartCard from '../../Components/Cards/CartCard';
import Nav from '../../Components/NavBar/Nav';
import { IoAdd } from "react-icons/io5";
import { FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';
import userContext from '../../Components/Login/UserContext';
import TextField from '@mui/material/TextField';
import Footer from '../../Components/Footer/Footer';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;
const { useBreakpoint } = Grid;
const Cart = props => {

    const screens = useBreakpoint();

    const { user, setUser, error, success, setSearchVal,loading, setLoading, orders, setOrders, address, setAddress, total_cost, setTotalCost, contextHolder } = useContext(userContext);
    const [isopen, setisopen] = useState(false);
    const [formData, setFormData] = useState({ pincode: '', addr: '' })
    const [address_id, setAddrId] = useState('');

   
    const handleAddAddress = async () => {


        setLoading(true);
        try {
            const form_data = new FormData();
            form_data.append('pincode', formData.pincode);
            form_data.append('addr', formData.addr);
            form_data.append('customer_id', user._id);

            const result = await axios.post(process.env.REACT_APP_API_URL+'/address', form_data);
            setUser((prev) => ({ ...prev }));
            setisopen(false);
            setFormData({ pincode: '', addr: '', })
            success("Address Added successfully")

        }
        catch (err) {
            error("Unable to Add Address");
        }

        setLoading(false);
    }


    const handleGetServicesClick = async () => {
        try {

            for (let i = 0; i < orders.length; i++) {
                if (orders[i].location != address_id.pincode) {
                    error("Unable to Deliver to That location");
                    return;
                }
            }


            const result = await Promise.all(
                orders.map(async (each) => {


                    const up_data = await axios.put(process.env.REACT_APP_API_URL+'/orders?order_id=' + each.id + '&status=Request&address=' + address_id._id)

                    console.log(up_data.data);

                })
            )

            setUser((prev) => ({ ...prev }))
             success('order placed')

        }
        catch (err) {
            error("Unable to Place Order");
            console.log(err);

        }


    }



    return (
        <>
            {contextHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>

                <Nav></Nav>

                <div className='mt-5 mx-2'>
                    <h1 className='m-2'>Cart List</h1>
                    {orders.length ?
                        <Row className='' style={{ background: "whitesmoke" }}>
                            <Col md={{ span: 14, offset: 1 }} sm={{ span: 22, offset: 1 }} xs={{ span: 22, offset: 1 }} className='mb-5 pb-3'>
                                <Row>
                                    {

                                        orders.map((each, index) => (
                                            <Col span={24} className='m-1' key={index}>
                                                <CartCard data={each} key={each._id} />
                                            </Col>
                                        ))

                                    }
                                </Row>
 

                            </Col>
                            <Col md={{ span: 8, offset: 1 }} sm={{ span: 22, offset: 1 }} xs={{ span: 22, offset: 1 }} className='mb-5 pb-3' >
                                <Row>

                                    <Col span={22} className='m-1'>
                                        <Card
                                            title="Address"
                                        >
                                            <div className='d-flex flex-column justify-content-around' style={{ gap: "10px" }}>
                                                {
                                                    address.map((each, index) => {

                                                        return <Row key={index}>
                                                            <Col span={2} className='d-flex flex-column justify-content-center'>
                                                                <input type='radio' name='addr' onChange={() => { setAddrId(each) }} />
                                                            </Col>
                                                            <Col span={22} style={{ border: "1px solid grey", borderRadius: "10px" }} className='p-1'>
                                                                <Text >
                                                                    {each.address}
                                                                    ,pincod:{each.pincode}
                                                                </Text>
                                                            </Col>
                                                        </Row>
                                                    })
                                                }
                                                <Button onClick={() => { setisopen(true) }}><IoAdd color='blue' /> Add Address</Button>

                                            </div>
                                        </Card>
                                    </Col>
                                    <Col span={22} className='m-1'>
                                        <Card
                                            title="price Details"
                                        >
                                            <div className='d-flex flex-column' style={{ gap: "5px" }}>
                                                {

                                                    orders.map((each, index) => {
                                                        return <div key={index} className='d-flex justify-content-between'><Text>{each.ser_name}</Text> <Text><FaRupeeSign /> {each.cost}</Text></div>

                                                    })}
                                                <div className='d-flex justify-content-between'><Text>Platform Fee</Text> <Text><FaRupeeSign /> 5</Text></div>
                                                <hr></hr>
                                                <div className='d-flex justify-content-between'><Text><b>Total</b></Text> <Text><FaRupeeSign /> <b>{total_cost + 5}</b></Text></div>


                                            </div>
                                        </Card>

                                    </Col>

                                </Row>
                            </Col>

                            <Col md={{ span: 22, offset: 1 }} xs={{ span: 23 }}
                                style={{ position: 'fixed', bottom: '0%', width: '100%' }}

                            >
                                <Card style={{ backgroundColor: '#2f4f4f' }} >
                                    <div className='d-flex justify-content-between align-items-center' >
                                        <Text type='success' className='fs-3'><b>Total:<FaRupeeSign /> {total_cost + 5}</b></Text>
                                        <Button type='primary' size={screens.xs ? 'medium' : screens.md ? 'large' : 'medium'} onClick={handleGetServicesClick}>Get Service</Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row> :
                        <>
                        <Flex justify='center' align='center' style={{ minHeight: '70vh', background: 'whitesmoke' }}>
                            <h1>Cart Is Empty</h1>
                        </Flex>
                        </>
                    }
                </div>
             {orders.length>0?null:<Footer/>}

        </Spin >


            <Modal open={isopen} footer={<Button type='primary' size='large' onClick={handleAddAddress}>Add</Button>} onCancel={() => { setisopen(false) }} >
                <Spin tip="Loading...." size='large' spinning={loading}>
                    <h1>Add New Address</h1>
                    <Flex vertical gap={10}>
                        <TextField label="Address" variant="outlined" value={formData.addr} onChange={(e) => setFormData((prev) => ({ ...prev, addr: e.target.value }))} />
                        <TextField label="Pincode" variant="outlined" value={formData.pincode} onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))} />
                    </Flex>

                </Spin>
            </Modal>
        </>
    );
};



export default Cart;