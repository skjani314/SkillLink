
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Home from './Pages/Home/Home';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userContext from './Components/Login/UserContext';
import {message} from 'antd';
import Forgotpass from './Components/Login/Forgotpass';
import ServicePage from './Pages/Service/ServicePage';
import Cart from './Pages/Cart/Cart';


function App() {


const [messageApi, contextHolder] = message.useMessage();
const [currLocation,setCurrLocation]=useState({name:'Ongole',pincode:523001});
const [servicesData,setServicesData]=useState([]);
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(false);

let flag=false;




const success = (msg) => {
  messageApi.open({
    type: 'success',
    content: msg,
  });
};
const error = (msg) => {
  messageApi.open({
    type: 'error',
    content: msg,
  });
};


const data={
  user,
  setUser,
  loading,
  setLoading,
  success,
  error,
  contextHolder,
  currLocation,
  setCurrLocation,
  servicesData,
  setServicesData

}

  useEffect(()=>{
  
    const getUser=async ()=>
      {
      try{

           const result= await axios.post('/get-user');
               setUser(result.data);
               flag=true;
        }
        catch(err)
        {
          return null;
        }

      }

   
    const getData=async ()=>{
try{
 
    const result=await axios.get('/locservices?location=522403');
    console.log(result);
}
catch(err){
  error("something went wrong");
}
    }

  if(!flag){
  getUser();
getData();
}
  return ()=>{flag=true;}
  },[currLocation])


  return (
  <>
  <userContext.Provider value={data}>

  <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/forgot/:token'element={<Forgotpass/>} />
       <Route path='/services' element={<ServicePage/>}  />
       <Route path='/cart' element={<Cart/>}/>
    </Routes>
  </BrowserRouter>
  </userContext.Provider>
  </>
  );
}

export default App;
