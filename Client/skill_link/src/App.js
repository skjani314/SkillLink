
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
import ServiceProvider from './Pages/ServiceProvider/ServiceProvider';


function App() {


const [messageApi, contextHolder] = message.useMessage();
const [currLocation,setCurrLocation]=useState({name:'Ongole',pincode:523002});
const [servicesData,setServicesData]=useState([]);
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(false);
const [orders,setOrders]=useState([]);
const [address,setAddress]=useState([]);
const [total_cost, setTotalCost] = useState(0);
const [activeTab,setActiveTab]=useState('DASHBOARD');

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


const changeActiveTab=(tabId)=>{
  setActiveTab(tabId);
}

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
  setServicesData,
  orders,
  setOrders,
  address,
  setAddress,
  total_cost,
  setTotalCost,
  activeTab,
  changeActiveTab:changeActiveTab,


}

  useEffect(()=>{
  
    setLoading(true);
    const getUser=async ()=>
      {
      try{

           const result= await axios.post('/get-user');
               setUser(result.data);
               flag=true;
               return true;
        }
        catch(err)
        {
       console.log(err);
         }

      }

   
    const getData=async ()=>{
try{
 
const result=await axios.get('/locservices?location='+currLocation.pincode);

setServicesData([...result.data]);
console.log(result);

}
catch(err){
  console.log(err);
}
    }
   
  if(!flag){
getUser();
getData();
}
setLoading(false);

  return ()=>{flag=true;}
  },[currLocation])


useEffect(()=>{
  const getOrders= async ()=>{

    

    try{
      console.log(user)
      const result=await axios.get('/orders?customer_id='+user._id+'&status=cart')
      console.log(result.data);
       setOrders([...result.data.data]);
       setTotalCost(result.data.x);
    }
  catch(err)
  {
      console.log(err)
  }

   }


   const getaddresses= async ()=>{

try{

const result=await axios.get('/address?customer_id='+user._id)
console.log(result);
setAddress([...result.data]);

}
catch(err)
{
  console.log(err);
  console.log('unable to get addresses');
}

   }

 if(user!=null){  
getaddresses();
getOrders();

 }
let x=0;
for(let i=0;i<orders.length;i++)
    {
       x=x+orders[i].cost 
    }
setTotalCost(x);



},[user]);  

  return (
  <>
  <userContext.Provider value={data}>

  <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/forgot/:token'element={<Forgotpass/>} />
       <Route path='/services' element={<ServicePage/>}  />
       <Route path='/cart' element={<Cart/>}/>
       {user && user.role=='supplier'?<>
       <Route path='/serviceproviders/' element={<ServiceProvider/>}/>

       </>
       :null
      }
    </Routes>
  </BrowserRouter>
  </userContext.Provider>
  </>
  );
}

export default App;
