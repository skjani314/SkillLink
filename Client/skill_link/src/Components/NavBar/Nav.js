import { AiFillHome } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { Button, Col, Input, Row, Drawer, Modal, Card,Grid,Flex, Skeleton, Dropdown, Avatar, Typography } from 'antd';
import { MdHomeRepairService } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaLaptopHouse, FaSearch } from "react-icons/fa";
import './Nav.css';
import { MdOutlineMenu } from "react-icons/md";
import { FaUser, FaUserPlus, FaClipboardList } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import logo from './log1.png';
import SigninReg from '../Login/Login.js';
import userContext from "../Login/UserContext.js";
import axios from "axios";
import Locsuggest from "./Locsuggest.js";
import { Link, useNavigate } from 'react-router-dom';
import Profile from "../Cards/Profile.js";
import CartCard from "../Cards/CartCard.js";
import { GrWheelchairActive } from "react-icons/gr";

const { Search } = Input;
const { Text } = Typography;
const {useBreakpoint}=Grid;
function Nav(props) {

  const navigate = useNavigate();
  const [searchVisible, setsearchVisible] = useState('none');
  const [drawerVisible, setDrawervisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { user, setUser, loading, setLoading, success, error,search_Val,setSearchVal, servicesData, contextHolder, currLocation, setCurrLocation } = useContext(userContext);
  const [otpform, setOtpform] = useState(false);
  const [locsuggest, setLocSuggest] = useState([]);
  const [locSearch, setLocSearch] = useState('');
  const [locSkeleton, setLocSkeleton] = useState(false);
  const [openprofile, setOpenProfile] = useState(false);
  const [myoredrs, setMyOrders] = useState(false);
  const [myordersdata, setMyorderData] = useState([]);
  const [searchresult, setSearchResult] = useState([]);

  const screens=useBreakpoint();
  const showDrawer = () => {
    setDrawervisible(true);
  }
  const closeDrawer = () => {

    setDrawervisible(false);
  }

  const handleSearchVisible = () => {

    if (searchVisible == 'none') {
      setsearchVisible('block');
    }
    else {
      setsearchVisible('none');
    }

  }
  const handleModalCancel = () => {
    setModalOpen(false);
    setLoginOpen(false);
    setOtpform(false);
  }




  useEffect(() => {


    const getMyOredrs = async () => {



      try {
        console.log(user)
        const result = await axios.get(process.env.REACT_APP_API_URL+'/orders?customer_id=' + user._id)
        console.log(result.data);
        setMyorderData([...result.data]);
      }
      catch (err) {
        console.log(err)
      }



    }




    getMyOredrs();


  }, [props.query])


  const handleSearch =(e) => {

      setSearchVal(e.target.value);

      if (e.target.value != "") {
        const result = servicesData.filter((each) => (
          each.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          each.category.toLowerCase().includes(e.target.value.toLowerCase())
        )
        )
        console.log(result);
        setSearchResult([...result]);
      }
else{
  setSearchResult([])
}

    
    

  }



  const handleLocSearch = async (e) => {
    setLocSearch(e.target.value);
    setLocSkeleton(true);
    const response = await axios.get(`https://photon.komoot.io/api/?q=${locSearch}`);
    const arrData = response.data.features.filter((each) => {

      const { properties } = each;
      if (properties.country == "India") {
        return properties;
      }


    })
    setLocSkeleton(false);
    setLocSuggest(prev => ([...arrData]));

  }


  const handleLocation = async () => {

    setModalOpen(true);


  }
  const handleLogin = () => {
    setLoginOpen(true);
    closeDrawer();
  }

  const handleLogout = async () => {
    setLoading(true);
    closeDrawer();
    try {

      await axios.post(process.env.REACT_APP_API_URL+'/logout')
      success("logged out successfully");
      setUser(null);
      setLoading(false);
      navigate('/')

    }
    catch {
      error("something went wrong")
      setLoading(false);
    }

  }


const handleSearchClick=(x)=>{

navigate('/services?name='+x);
setSearchResult([]);


}



  const items = [
    {
      key: '1',
      label: (
        <Text onClick={() => { setOpenProfile(true) }}>
          {user ? <Avatar shape="square" icon={<img src={user.img} />} size={29} /> : null} Profile
        </Text>
      ),
    },
    {
      key: '2',
      label: (
        user && user.role == 'customer' ?
          <Text onClick={() => { setMyOrders(true) }}>
            <Text><FaClipboardList /> My Orders</Text>
          </Text> : null

      ),
    },
  ];
console.log(search_Val)
  return (
    <>

      <div className="nav-wrapper ">
        <nav className="container-fluid  pt-2">
          <Row>
            <Col lg={3} md={3} sm={4} xs={10}>
              <Link to='/' className="Link"><img src={logo} className="img-fluid" /></Link>
            </Col>
            <Col className="d-block d-sm-none mt-1" xs={{ span: 3, offset: 5 }}>
              <FaSearch onClick={handleSearchVisible} className="fs-2 mt-2" />
            </Col>

            <>
              {
                user && user.role == 'customer' ?
                  <Col className="d-block d-sm-none mt-1" xs={{ span: 3, offset: 0 }}>
                    <Link to='/cart' className="Link" ><FaCartShopping className="fs-2 mt-2" /></Link>
                  </Col>
                  :
                  <Col className="d-block d-sm-none mt-1" xs={{ span: 3, offset: 0 }}>
                    <FaCartShopping className="fs-2 mt-2" onClick={handleLogin} />
                  </Col>
              }
            </>


            <Col className="d-block d-sm-none mt-1" xs={{ span: 2, offset: 0 }}>
              <MdOutlineMenu className="fs-2 mt-2" onClick={showDrawer} />
            </Col>

            <Col lg={1}></Col>
            <Col className="mt-1 original-search-bar-nav" lg={7}>
              <Search
                allowClear
                enterButton="Search"
                size="large"
                placeholder="Search..."
                value={search_Val}
                onChange={handleSearch}
                onSearch={()=>{setSearchResult([]);navigate('/services?name='+search_Val)}}

              />
              <Col lg={7} className="w-100" style={{ position: 'fixed', top: '55px', background: 'whitesmoke', }}>
             {
              searchresult.map((each,index)=>(

              <div style={{background:"white"}} className="m-1"  key={index} onClick={()=>handleSearchClick(each.name)}>
                <Flex justify='between' gap={5}>
                    <Avatar shape="square" icon={<img src={each.img} alt="service" />} size={35} />
                    <Flex vertical>
                      <Text style={{fontSize:13}}>
                        {each.name}
                        </Text>
                        <Text style={{fontSize:10}}>
                        {each.category}
                        </Text>
                      </Flex>
                  </Flex>
                  </div>
              ))
             }
              </Col>
            </Col>

            <Col className="mt-2 d-flex  p-0" lg={3} onClick={handleLocation} style={{ cursor: 'pointer' }}>

              <IoLocation className="original-search-bar-nav" fontSize="30px" color="red" />
              <div className="mt-2 original-search-bar-nav me-2 d-flex">
                <p className="original-search-bar-nav">{currLocation.name}</p>
                <IoIosArrowDown className="original-search-bar-nav" fontSize="20px" />
              </div>

            </Col>

            <Col className="mt-2 d-none d-sm-block menu-bar-nav" lg={{ span: 10, offset: 0 }} md={{ span: 15, offset: 6 }} sm={{ span: 21, offset: 0 }} >

              <ul type="none" className="d-flex justify-content-around">
                <li className="mt-1" ><Link to='/' className="Link"><AiFillHome className="mb-1 " /> Home</Link></li>
                <li className="mt-1" ><Link to='/services' className="Link" ><MdHomeRepairService className="mb-0 " /> Services</Link></li>
                <li className="mt-1" >
                  {user && user.role !== 'customer' ?

                    <Link to={user && user.role == 'supplier' ? '/serviceproviders/' + user._id + '/dashboard' : user && user.role == 'agent' ? '/agents/' + user._id + '/dashboard' : user ? '/admins/' + user._id + '/dashboard' : null} className="Link"><FaLaptopHouse style={{ fontSize: 20 }} className="mb-1 " /> Staff</Link>
                    : <Link to='/contactus' className="Link"><IoChatbubbleEllipsesSharp className="mb-1 " /> Contact us</Link>

                  }
                </li>
                <li className="mt-1 search-bar-nav" onClick={handleSearchVisible} ><FaSearch className="mb-1 fs-5" /> </li>
                {
                  (!user) ? <li className="mt-1"><Button type="primary" size="small" onClick={handleLogin}><FaUser /> Log In</Button></li>
                    : <>
                      <Dropdown onClick={(e) => e.preventDefault()} menu={{ items }}><li className="mt-1" style={{cursor:"pointer"}}><FaUser className="mb-1" />{" " + user.name.slice(0, 5)}</li></Dropdown>
                      <li className="mt-1" ><Button type="primary" size="small" onClick={handleLogout}>Log Out</Button></li></>
                }
                <li className="fs-4">
                  {user && user.role == 'customer' ?
                    <Link to='/cart' className="Link"><FaCartShopping /></Link>
                    : <FaCartShopping onClick={handleLogin} />

                  }
                </li>
              </ul>

            </Col>


          </Row>
          <Row className="mt-2" style={{ display: searchVisible }}>
            <Row>
              <Col className="" span={24}>
                <Search
                  allowClear
                  enterButton="Search"
                  size="large"
                  placeholder="search..."
                  value={search_Val}
                onChange={handleSearch}
                onSearch={()=>{navigate('/services?name='+search_Val)}}

                />
              </Col>
              <Col span={24} className="w-100" style={{ position: 'sticky', background: 'whitesmoke', }}>
             {
              searchresult.map((each,index)=>(

                <div style={{background:"white"}} className="m-1" key={index} onClick={()=>handleSearchClick(each.name)}>
                <Flex justify='between' gap={5}>
                    <Avatar shape="square" icon={<img src={each.img} alt="service" />} size={35} />
                    <Flex vertical>
                      <Text style={{fontSize:13}}>
                        {each.name}
                        </Text>
                        <Text style={{fontSize:10}}>
                        {each.category}
                        </Text>
                      </Flex>
                  </Flex>
                  </div>
              ))
             }
              </Col>
              <Row>
                <Col className="mt-1 d-flex p-0" span={24} onClick={handleLocation}>

                  <IoLocation fontSize="30px" color="red" />
                  <p className="mt-2  me-2">{currLocation.name}</p>
                  <IoIosArrowDown className="mt-2 " fontSize="20px" />

                </Col>
              </Row>
            </Row>
          </Row>
          <Drawer
            open={drawerVisible}
            onClose={closeDrawer}
            placement="right"
            title="Menu"
            width="70%"
            style={{ background: '#e3f2fd' }}
          >
            <div className="container">
              <ul type="none" className="d-flex flex-column">
                <hr></hr>
                {
                  (!user) ? <li className="mt-1"><Button type="primary" size="small" onClick={handleLogin}><FaUser /> Log In</Button></li>
                    : <><li className="mt-1" style={{cursor:"pointer"}}><FaUser />{" " + user.name.slice(0, 5)}</li>
                      <li className="mt-1"><Button type="primary" size="small" onClick={handleLogout}>Log Out</Button></li></>
                }              <hr></hr>

                <li className="my-1" ><Link to='/' className="Link"><AiFillHome className="mb-1 " /> Home</Link></li>
                <hr></hr>

                <li className="my-1" ><Link to='/services' className="Link"><MdHomeRepairService className="mb-1 " /> Services</Link> </li>
                <hr></hr>
                <li className="my-1" ><Link to='' className="Link"><FaClipboardList className="mb-1 " /> My Orders</Link></li>
                <hr></hr>
                <li className="my-1" >
                  {user && user.role !== 'customer' ?
                    <Link to={user && user.role == 'supplier' ? '/serviceproviders/' + user._id + '/dashboard' : user && user.role == 'agent' ? '/agents/' + user._id + '/dashboard' : user && user.role == 'admin' ? '/admins/' + user._id + '/dashboard' : null} className="Link"><FaLaptopHouse style={{ fontSize: 20 }} className="mb-1 " /> Staff</Link>
                    : <Link to='/contactus' className="Link"><IoChatbubbleEllipsesSharp className="mb-1 " /> Contact Us</Link>

                  }
                </li>
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
            <Search allowClear size="medium" enterButton value={locSearch} onChange={handleLocSearch} />
            <p className="mt-2 text-primary"> <TbCurrentLocation className="fs-3" /> Use Current Location</p>
            <div className="d-flex flex-column" style={{ background: 'whitesmoke' }} >
              {
                locSearch ?
                  <>

                    {!locSkeleton ?

                      locsuggest.map((each, indedx) => (

                        <Locsuggest key={indedx} name={each.properties.name} state={each.properties.state} postcode={each.properties.postcode}
                          handleModalCancel={handleModalCancel}
                          setCurrLocation={setCurrLocation}
                          setLocSearch={setLocSearch}
                        />
                      )) : <Skeleton rows={2} size="small" active />}
                  </>

                  : null

              }
            </div>
          </Col>
        </Row>

      </Modal>
      <Modal open={isLoginOpen} onCancel={handleModalCancel} footer={null}>
        <SigninReg handleModalCancel={handleModalCancel} otpform={otpform} setOtpform={setOtpform} />
      </Modal>

      <Modal open={openprofile} onCancel={() => { setOpenProfile(false) }} footer={null}>
        <Profile data={user} />
      </Modal>
      <Modal open={myoredrs} footer={null} onCancel={() => { setMyOrders(false) }}>
        <Row>
          {
            myordersdata.length > 0 ?
              <>
                <h1>Your Orders</h1>
                {myordersdata.map((each, index) => (
                  <Col span={24} className='m-1' key={index}>
                    <CartCard data={each} key={each._id} myorder />
                  </Col>
                ))}
              </> :
              <Text className="mt-5">No Orders</Text>
          }
        </Row>
      </Modal>
    </>
  )
}
export default Nav;