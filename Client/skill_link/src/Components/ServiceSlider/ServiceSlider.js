import React from 'react';
import Slider from 'react-slick';
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { useMediaQuery } from 'react-responsive';
import ServiceCard from '../Cards/ServiceCard';


const ServiceSlider = props => {


    const isLargeScreen = useMediaQuery({ query: '(min-width: 1000px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 717px)' });
    const isSmallScreen = useMediaQuery({ query: '(min-width: 546px)' });


  
    let slidesToShow = 1;
    if (isLargeScreen) {
      slidesToShow = 5;
    } else if (isMediumScreen) {
      slidesToShow = 4;
    }
    else if(isSmallScreen){
      slidesToShow = 3;

    }
  
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      nextArrow: <MdArrowForwardIos color='red'/>,
      prevArrow: <MdArrowBackIos color='red' />,
      centerMode:true,
      centerPadding:"0",
    };

   

    return (
        <div>
    <Slider {...settings} className='container-fluid'>
     
      
       {
         
         props.data.map((each)=>(<ServiceCard data={each} color="#004D40"/>))

       }
      

    </Slider>
        </div>
    );
};


export default ServiceSlider;