import { Col, Row } from 'antd';
import React from 'react';
import CategoryCard from '../../Components/Cards/CategoryCard';
import './ServicePage.css';
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import SearchResult from '../../Components/SearchResult/SearchResult';

const ServicePage = props => {


    const data = [
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





    return (
        <>
            <Nav />
            <div className='container-fluid mt-5 pt-1'>
                <h1 >Categories</h1>
                <Row className='scroll-wrapper d-flex'>

                    <Col className='category'>
                        {
                            data.map((each) => (<CategoryCard data={each} />))
                        }
                    </Col>

                </Row>
            </div>
            <SearchResult />
            <Footer />
        </>
    );
};



export default ServicePage;