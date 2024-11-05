import { Col, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import CategoryCard from '../../Components/Cards/CategoryCard';
import './ServicePage.css';
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import SearchResult from '../../Components/SearchResult/SearchResult';
import userContext from '../../Components/Login/UserContext';
import { useLocation, useParams } from 'react-router-dom';

const ServicePage = props => {


const [categorydata,setCategoryData]=useState([])
const {servicesData,loading,setLoading,user,setSearchVal}=useContext(userContext);
const location=useLocation();
const query = new URLSearchParams(location.search);
const [resultdata,setResultdata]=useState([]);



useEffect(()=>{



    const uniqueData = Array.from(
        new Map(servicesData.map(item => [item.category, item])).values()
      );

      setCategoryData(uniqueData)


},[])



    return (
        <>
            <Nav />
            <div className='container-fluid mt-5 pt-1'>
                <h1 >Categories</h1>
                <Row className='scroll-wrapper d-flex'>

                    <Col className='category'>
                        {
                            categorydata.map((each,index) => (<CategoryCard key={index} data={each} />))
                        }
                    </Col>

                </Row>
            </div>
            <SearchResult query={query.get('name')} resultdata={resultdata} setResultdata={setResultdata} />
            <Footer />
        </>
    );
};



export default ServicePage;