import React from 'react';
import './Footer.css';
import { Button } from 'antd';
import {FaHandshake, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { LiaUserCogSolid } from "react-icons/lia";
import side_img from './side_image.jpeg';
import logo from './log1.png';


const Footer = props => {
    return (
        <div className='footer-wrapper bg-dark'>
            <div className='container-fluid p-3'>
                <div className='row d-flex justify-content-around'>
                    <div className='col-md-6 p-3'>
                        <p><b style={{ color: '#CC5500' }}><LiaUserCogSolid color='#CC5500' size={40} /> List Your Service Now</b> Connect to the World</p>
                        <p><FaHandshake color="#f0ad4e" size={20} /> Partner with us & get listed on SkillLink</p>
                        <div className='pt-3'><Button type='primary' size='large'>Contact Today!</Button></div>
                    </div>
                    <div className='col-md-3'>
                        <img src={side_img} className='img-fluid pt-5' />
                    </div>
                </div>
            </div>
            <div className='container fluid'>
                <div className='row'>
                    <div className='col-md-5'>
                        <hr></hr>
                    </div>
                    <div className='col-md-2'>
                        <img src={logo} className='img-fluid'></img>
                    </div>
                    <div className='col-md-5'>
                        <hr></hr>
                    </div>
                </div>
                <div className='row px-2 mt-3 d-flex justify-content-around'>

                    <div className='col-md-4 my-2'>
                        
                        <h2>Quick Links</h2>  
                            <a href="#"><p>About Us</p></a>
                            <a href="#"><p>Terms & Conditions</p></a>
                            <a href="#"><p>Privacy Policy</p></a>
                            <a href="#"><p>FAQ</p></a>
                    
                    </div>
                    <div className='col-md-4 my-2 '>
                        <h2>Follow Us On</h2>
                        <div className='d-flex  f-icon mt-2'>
                            <a href='#' className='mx-2'><FaFacebook size={30} /></a>
                            <a href='#' className='mx-2'><FaThreads size={30} /></a>
                            <a href='#' className='mx-2'><FaYoutube size={30} /></a>
                            <a href='#' className='mx-2'><FaInstagram size={30} /></a>
                        </div>

                    </div>

                    <div className='col-md-4 my-2 '>
                        <h2>Contact Us</h2>
                        <p>Phone: +91 9381116577</p>
                            <p>Email: skskjani7@gmail.com</p>
                           <p> Address:<br></br>
                            Door Number:22-3-23/B,Muslim Peta,Sattenapalli,Palnadu District,Andhra Pradesh,522 403</p>
                    </div>
                </div>
                <hr></hr>
                <div className='row text-center'>
                    <p>Copyright 2024 © SkillLink. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
};



export default Footer;