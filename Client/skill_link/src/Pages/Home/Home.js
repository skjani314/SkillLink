import React from 'react';
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import { Row, Spin, Col, Grid } from 'antd';
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';
import c1 from './images/1.jpeg';
import c2 from './images/2.png';
import c4 from './images/4.png';
import c5 from './images/5.png';
import { MdArrowForwardIos, MdArrowBackIso, MdArrowBackIos } from "react-icons/md";
import { Carousel } from 'antd';
import './Home.css';
import ServiceSlider from '../../Components/ServiceSlider/ServiceSlider';
import ServiceGrid from '../../Components/ServiceGrid/ServiceGrid';



const { useBreakpoint } = Grid;


const Home = props => {


    const data = [
       
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",

            available: 12,
            from: 500
        },
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",

            available: 12,
            from: 500
        },
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",

            available: 12,
            from: 500
        },
        {
            imgurl: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1656047929083-beff0d.jpeg",
            name: "Cleaning Bathroom",

            available: 12,
            from: 500
        },

    ]

    const { loading, contexHolder } = useContext(userContext);
    const screens = useBreakpoint();

    return (
        <>
            {contexHolder}
            <Spin tip="Loading...." size='large' spinning={loading}>
                <Nav />
                <Carousel infinite autoplay arrows className='my-5' centerMode={true} dots={false} nextArrow={<MdArrowForwardIos color='red' size='large' />} prevArrow={<MdArrowBackIos color='red' size={30} />} >

                    <div className='home-carousel px-2'>
                        <img src={c1} className='mx-3' />
                    </div>
                    <div className='home-carousel px-2'>
                        <img src={c2} className='mx-3' />
                    </div>
                    <div className='home-carousel px-2'>
                        <img src={c4} className='mx-3' />
                    </div>
                    <div className='home-carousel px-2'>
                        <img src={c5} className='mx-3' />
                    </div>
                </Carousel>
                {
                    (!screens.xs)
                        ?
                        <div className='my-5' style={{ background: '#00796B' }}>
                            <h3 className='container-fluid fs-3 p-3 text-warning'>Recommended Services</h3>
                            <div className='my-2'>

                                <ServiceSlider data={data} />
                            </div>
                        </div>
                        : <Row>
                            <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                                <ServiceGrid
                                    bgcolor="skyblue"
                                    heading={{ title: "Most Booked services", color: "#2f4f4f" }}
                                    data={data} 
                                />
                            </Col>

                        </Row>
                }
                <Row style={{ color: 'whitesmoke' }}>
                    <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                        <ServiceGrid
                            bgcolor="skyblue"
                            heading={{ title: "Most Booked services", color: "#2f4f4f" }}
                            data={data} 
                        />
                    </Col>
                    <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                        <ServiceGrid
                            bgcolor="#f2f2f2"
                            heading={{ title: "Home Services", color: "#556b2f" }}
                            data={data} 
                        />
                    </Col>
                </Row>
                {
                    (!screens.xs)
                        ?
                        <div className='my-5' style={{ background: 'whitesmoke' }}>
                            <h3 className='container-fluid fs-3 p-3 text-dark'>Trending Services</h3>
                            <div className='my-2'>

                                <ServiceSlider data={data} />
                            </div>
                        </div>
                        : <Row>
                            <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                                <ServiceGrid
                                    bgcolor="skyblue"
                                    heading={{ title: "Most Booked services", color: "#2f4f4f" }}
                                    data={data} 
                                />
                            </Col>

                        </Row>
                }

                <Row>

                    <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                        <ServiceGrid
                            bgcolor="#f4f0ff"
                            heading={{ title: "Most Booked services", color: "#4b0082" }}
                            data={data} 

                        />
                    </Col>
                    <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                        <ServiceGrid
                            bgcolor="#f9f5f1"
                            heading={{ title: "Home Services", color: "#8b4513" }}
                            data={data} 

                        />
                    </Col>


                </Row>
                <Footer />
            </Spin>
        </>
    );
};



export default Home;