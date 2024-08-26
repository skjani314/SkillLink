import React from 'react';
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import { Spin } from 'antd';
import userContext from '../../Components/Login/UserContext';
import { useContext } from 'react';

const Home = props => {

    const {loading,contexHolder}=useContext(userContext);
   

    return (
        <>
                {contexHolder}
        <Spin tip="Loading...." size='large' spinning={loading}>
             <Nav/>
             <Footer/>
        </Spin>
        </>
    );
};



export default Home;