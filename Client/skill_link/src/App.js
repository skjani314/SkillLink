
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
import SerDashboard from './Pages/ServiceProvider/SerDashboard';
import SerMyServices from './Pages/ServiceProvider/SerMyServices';
import SerTransactions from './Pages/ServiceProvider/SerTransactions';
import SerProfile from './Pages/ServiceProvider/SerProfile';
import AgeDashboard from './Pages/Agent/AgeDashboard';
import AgeService from './Pages/Agent/AgeService';
import AgeSuppliers from './Pages/Agent/AgeSuppliers';
import AgeProfile from './Pages/Agent/AgeProfile';
import AdminDashboard from './Pages/Admin/AdminDashboard.js';
import AdminServices from './Pages/Admin/AdminServices.js'
import AdminMyAgents from './Pages/Admin/AdminMyAgents.js';
import AdminProfile from './Pages/Admin/AdminProfile.js';
import AgeTransaction from './Pages/Agent/AgeTransaction.js';
import AdminTransaction from './Pages/Admin/AdminTransaction.js';

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
const [serProData, setserProData] = useState([]);
const [search_Val,setSearchVal]=useState("");

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
  serProData,
  setserProData,
  search_Val,
  setSearchVal


}

  useEffect(()=>{
  
    setLoading(true);
    const getUser=async ()=>
      {
      try{

           const result= await axios.post(process.env.REACT_APP_API_URL+'/get-user',{},{withCredentials:true});
               if(result.data.role=='supplier'){
                const ser_pro_data=await axios.get(process.env.REACT_APP_API_URL+'/serviceproviders?id='+result.data._id);
                setUser({...result.data,...ser_pro_data.data})
               }
               else if(result.data.role=='agent'){
                const agent_data=await axios.get(process.env.REACT_APP_API_URL+'/agents?user_id='+result.data._id);
                console.log(agent_data.data)
                setUser({...result.data,...agent_data.data});

                  const agent_result = await axios.get(process.env.REACT_APP_API_URL+'/agent_serviceprovider?agent_id=' + result.data._id);
                         setserProData([...agent_result.data]);
               }
               else{
                setUser({...result.data})
                console.log('not working')
               }
console.log(user);
               return true;
        }
        catch(err)
        {
       console.log(err);
         }

      }

   
    const getData=async ()=>{
try{
 
const result=await axios.get(process.env.REACT_APP_API_URL+'/locservices?location='+currLocation.pincode);

setServicesData([...result.data]);
console.log(result);

}
catch(err){
  console.log(err);
}
    }
   
getUser();
getData();
setLoading(false);

  },[currLocation])


useEffect(()=>{
  const getOrders= async ()=>{

    

    try{
      console.log(user)
      const result=await axios.get(process.env.REACT_APP_API_URL+'/orders?customer_id='+user._id+'&status=cart')
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

const result=await axios.get(process.env.REACT_APP_API_URL+'/address?customer_id='+user._id)
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
  <userContext.Provider value={data}>

  <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/forgot/:token'element={<Forgotpass/>} />
       <Route path='/services' element={<ServicePage/>}  />
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/serviceproviders/:id/dashboard' element={user && user.role==='supplier'?<SerDashboard/>:null}/>
       <Route path='/serviceproviders/:id/myservices' element={user && user.role==='supplier' && user.verified?<SerMyServices/>:user && !user.verified?<SerDashboard/>:null}/>
       <Route path='/serviceproviders/:id/transactions' element={user && user.verified && user.role==='supplier' && user.verified?<SerTransactions/>:user && !user.verified?<SerDashboard/>:null}/>
       <Route path='/serviceproviders/:id/profile' element={user && user.role==='supplier' && user.verified?<SerProfile/>:user && !user.verified?<AgeDashboard/>:null}/>
       <Route path='/agents/:id/dashboard' element={user && user.role==='agent' && user.verified?<AgeDashboard/>:user && !user.verified?<AgeDashboard/>:null}/>
       <Route path='/agents/:id/services' element={user && user.role==='agent' && user.verified?<AgeService/>:user && !user.verified?<AgeDashboard/>:null}/>
       <Route path='/agents/:id/mysuppliers' element={user && user.role==='agent' && user.verified?<AgeSuppliers/>:user && !user.verified?<AgeDashboard/>:null}/>
       <Route path='/agents/:id/profile' element={user && user.role==='agent' && user.verified?<AgeProfile/>:user && !user.verified?<AgeDashboard/>:null}/>
       <Route path='/agents/:id/transaction' element={user && user.role==='agent' && user.verified?<AgeTransaction/>:user && !user.verified?<AgeDashboard/>:null}/>
      
       <Route path='/admins/:id/transaction' element={user && user.role==='admin'?<AdminTransaction/>:null}/>
       <Route path='/admins/:id/dashboard' element={user && user.role==='admin'?<AdminDashboard/>:null}/>
       <Route path='/admins/:id/services' element={user && user.role==='admin'?<AdminServices/>:null}/>
       <Route path='/admins/:id/myagents' element={user && user.role==='admin'?<AdminMyAgents/>:null}/>
       <Route path='/admins/:id/profile' element={user && user.role==='admin'?<AdminProfile/>:null}/>

    </Routes>
  </BrowserRouter>
  </userContext.Provider>
  
  );
}

export default App;
