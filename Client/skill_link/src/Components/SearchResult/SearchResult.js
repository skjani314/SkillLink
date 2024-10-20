import { Avatar, Row,Col, Pagination,Grid } from 'antd';
import React, { useContext } from 'react';
import ServiceCard from '../Cards/ServiceCard';
import './SearchResult.css';
import userContext from '../Login/UserContext';


const {useBreakpoint}=Grid;

const SearchResult = props => {

const {servicesData}=useContext(userContext);

const screens=useBreakpoint();

    const sdata = [
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
            name: "Home Service"
        },
        {
            imgurl: 'https://images.ctfassets.net/uwf0n1j71a7j/3Q5rRFTIW53lWJfUwscjCN/93475acc785944131b85402f5207e969/why-routine-car-servicing-must-for-vehicle.png',
            name: 'Automobile Service'
        },
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
            name: "Beauty Service"
        },
        {
            imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9MdFpRoOWq4BjHfLmw0M-v3PvUaPYcZkDg&s',
            name: 'Pest Control'
        },
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
            name: "Home Service"
        },
        {
            imgurl: 'https://images.ctfassets.net/uwf0n1j71a7j/3Q5rRFTIW53lWJfUwscjCN/93475acc785944131b85402f5207e969/why-routine-car-servicing-must-for-vehicle.png',
            name: 'Automobile Service'
        },
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
            name: "Beauty Service"
        },
        {
            imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9MdFpRoOWq4BjHfLmw0M-v3PvUaPYcZkDg&s',
            name: 'Pest Control'
        },
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1681711961404-75dfec.jpeg',
            name: "Home Service"
        },
        {
            imgurl: 'https://images.ctfassets.net/uwf0n1j71a7j/3Q5rRFTIW53lWJfUwscjCN/93475acc785944131b85402f5207e969/why-routine-car-servicing-must-for-vehicle.png',
            name: 'Automobile Service'
        },
        {
            imgurl: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg',
            name: "Beauty Service"
        },
        {
            imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9MdFpRoOWq4BjHfLmw0M-v3PvUaPYcZkDg&s',
            name: 'Pest Control'
        },

    ]

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

    return (
        <>
        <div style={{ background: "whitesmoke" }} >
            <Row>
                <Col md={{ span: 8}} className='m-1'>
                  <Row >
                    <Col span={22} offset={1} className='m-2' style={{border:'1px solid grey',background:"#f9f5f1"}}>
                    <p className='m-2 text-bold fs-4'>Select a Service<hr></hr></p>
                    <div className='d-flex'>
                        <Row>
                        {  sdata.map((each)=>(
                            <Col span={6} className='m-2'>
                                <div className='container'>
                                    <center> <Avatar size={50} shape='square' icon={<img src={each.imgurl} className='img-fluid' />} /><br></br>
                                        {each.name}</center>
                                </div>
                            </Col>))
                         }
                        </Row>
                    </div>
                    </Col>
                    <Col span={22} offset={1} className='m-2' style={{border:'1px solid grey',background:"#f9f5f1"}}>
                    <p className='m-2 text-bold fs-4'>Select a Service<hr></hr></p>
                    <div className='d-flex'>
                        <Row>
                        {  sdata.map((each)=>(
                            <Col span={6} className='m-2'>
                                <div className='container'>
                                    <center> <Avatar size={50} shape='square' icon={<img src={each.imgurl} className='img-fluid' />} /><br></br>
                                        {each.name}</center>
                                </div>
                            </Col>))
                         }
                        </Row>
                    </div>
                    </Col>
                </Row>  
                </Col>
                <Col md={{span:15}}  >

                    <Row>
              
                    {
                       servicesData.map((each)=>(
                        screens.md?
                        <Col md={{span:8}} >
                        <ServiceCard data={each} />
                        </Col>
                        : <Col sm={{span:22,offset:1}} xs={24} >
                        <ServiceCard data={each} mobile={true} />
                        </Col>
                       ))
                    }

              </Row>
                </Col>
            </Row>
        </div>
        <Pagination defaultCurrent={1} total={50} size={30} align='center' responsive className='my-3'/>
        </>
    );
};


export default SearchResult;