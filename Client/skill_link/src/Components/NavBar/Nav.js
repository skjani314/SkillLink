import { AiFillHome } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { Button, Col, Input, Row,Drawer,Modal } from 'antd';
import { MdHomeRepairService } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import './Nav.css';
import { MdOutlineMenu } from "react-icons/md";
import { FaUser,FaUserPlus,FaClipboardList } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { useState ,useContext} from "react";
import logo from './log1.png';
import SigninReg from '../Login/Login.js';
import userContext from "../Login/UserContext.js";
import axios from "axios";


const { Search } = Input;

function Nav() {


const [searchVisible,setsearchVisible]=useState('none');
const [drawerVisible,setDrawervisible]=useState(false);
const [isModalOpen,setModalOpen]=useState(false);
const [isLoginOpen,setLoginOpen]=useState(false);
const {user,setUser,loading,setLoading,success,error,contextHolder}=useContext(userContext);
const [otpform,setOtpform]=useState(false);

const showDrawer=()=>
{
setDrawervisible(true);
}
const closeDrawer=()=>{

  setDrawervisible(false);
}

const handleSearchVisible=()=>{

  if(searchVisible=='none')
    {
      setsearchVisible('block');
    }
    else{
      setsearchVisible('none');
    }

}
const handleModalCancel=()=>{
  setModalOpen(false);
  setLoginOpen(false);
  setOtpform(false);
}

const handleLocation=()=>{

setModalOpen(true);  

}
const handleLogin=()=>{
    setLoginOpen(true);
    closeDrawer();
}

const handleLogout=async ()=>{
setLoading(true);
closeDrawer();
try{

  await axios.post('/logout')
   success("logged out successfully");
   setUser(null);
   setLoading(false);

}
catch{
error("something went wrong")
setLoading(false);
}

}



  return (
    <>

    <div className="nav-wrapper ">
      <nav className="container-fluid  pt-2">
        <Row>
          <Col lg={3} md={3} sm={4} xs={10}>
            <a><img src={logo} className="img-fluid" /></a>
          </Col>
          <Col className="d-block d-sm-none mt-1" xs={{span:3,offset:5}}>
          <FaSearch onClick={handleSearchVisible} className="fs-2 mt-2"/>
          </Col>
          <Col className="d-block d-sm-none mt-1" xs={{span:3,offset:0}}>
          <FaCartShopping className="fs-2 mt-2" />
           </Col>
          <Col className="d-block d-sm-none mt-1" xs={{span:2,offset:0}}>
          <MdOutlineMenu className="fs-2 mt-2" onClick={showDrawer}/>
           </Col>

          <Col lg={1}></Col>
          <Col className="mt-1 original-search-bar-nav" lg={7}>
            <Search
              allowClear
              enterButton="Search"
              size="large"
              placeholder="Search..."

            />
          </Col>

          <Col className="mt-2 d-flex  p-0" lg={2} onClick={handleLocation} style={{cursor:'pointer'}}>

            <IoLocation className="original-search-bar-nav" fontSize="30px" color="red" />
            <p className="mt-2 original-search-bar-nav me-2">Ongole</p>
            <IoIosArrowDown className="mt-2 original-search-bar-nav" fontSize="20px"/>

          </Col>

          <Col className="mt-2 d-none d-sm-block menu-bar-nav" lg={{span:10,offset:1}} md={{span:15,offset:6}} sm={{span:21,offset:0}} >

            <ul type="none" className="d-flex justify-content-around">
              <li  className="mt-1" ><AiFillHome className="mb-1 " /> Home</li>
              <li className="mt-1" ><MdHomeRepairService className="mb-1 " /> Services</li>
              <li className="mt-1" ><IoChatbubbleEllipsesSharp className="mb-1 " /> Contact us</li>
              <li className="mt-1 search-bar-nav" onClick={handleSearchVisible} ><FaSearch className="mb-1 fs-5" /> </li>
             {
              (!user)?<li className="mt-1"><Button type="primary" size="small" onClick={handleLogin}><FaUser/> Log In</Button></li>
                   :<><li className="mt-1"><FaUser/>{" "+user.name.slice(0,5)}</li>
                    <li className="mt-1"><Button type="primary" size="small" onClick={handleLogout}>Log Out</Button></li></>
              }
              <li className="fs-4"><FaCartShopping /></li>
            </ul>

          </Col>


        </Row>
        <Row className="mt-2" style={{display:searchVisible}}>
          <Row>
            <Col className="" span={24}>
              <Search
                allowClear
                enterButton="Search"
                size="large"
                placeholder="search..."

              />
            </Col>
            <Row>
              <Col className="mt-1 d-flex p-0" span={24} onClick={handleLocation}>

                <IoLocation fontSize="30px" color="red" />
                <p className="mt-2  me-2">Ongole</p>
                <IoIosArrowDown className="mt-2 " fontSize="20px"/>

              </Col>
            </Row>
          </Row>
        </Row>
        <Drawer 
        visible={drawerVisible}
        onClose={closeDrawer}
        placement="right"
        title="Menu"
        width="70%"
        style={{background:'#e3f2fd'}}
        >
   <div className="container">
   <ul type="none" className="d-flex flex-column">
              <hr></hr>
              {
              (!user)?<li className="mt-1"><Button type="primary" size="small" onClick={handleLogin}><FaUser/> Log In</Button></li>
                   :<><li className="mt-1"><FaUser/>{" "+user.name.slice(0,5)}</li>
                    <li className="mt-1"><Button type="primary" size="small" onClick={handleLogout}>Log Out</Button></li></>
              }              <hr></hr>

              <li  className="my-1" ><AiFillHome className="mb-1 " /> Home</li>
              <hr></hr>

              <li className="my-1" ><MdHomeRepairService className="mb-1 " /> Services</li>
              <hr></hr>
              <li className="my-1" ><FaClipboardList className="mb-1 " /> My Orders</li>
              <hr></hr>
              <li className="my-1" ><IoChatbubbleEllipsesSharp className="mb-1 " /> Contact us</li>
                           <hr></hr>

            </ul>
   </div>
        </Drawer>
      </nav>
      </div>
      <div className='container-fluid py-md-4 py-sm-5 py-4'></div>
      <Modal open={isModalOpen} onCancel={handleModalCancel} footer={null}>
        <Row>
           <Col offset={2} span={20}>
           <Search allowClear size="medium" enterButton />
          <p className="mt-2 text-primary"> <TbCurrentLocation className="fs-3"/> Use Current Location</p>
           </Col>
        </Row>

      </Modal>
      <Modal open={isLoginOpen} onCancel={handleModalCancel} footer={null}>
      <SigninReg  handleModalCancel={handleModalCancel} otpform={otpform} setOtpform={setOtpform} />
      </Modal>
      
    </>
  )
}
export default Nav;