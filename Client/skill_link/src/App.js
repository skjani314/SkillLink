
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



function App() {


const [messageApi, contextHolder] = message.useMessage();

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


const [user,setUser]=useState(null);
const [loading,setLoading]=useState(false);

let flag=false;

const data={user,setUser,loading,setLoading,success,error,contextHolder}

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
  if(!flag){
  getUser();}
  return ()=>{flag=true;}
  },[])


  return (
  <>
  <userContext.Provider value={data}>
  <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/forgot/:token'element={<Forgotpass/>} />
    </Routes>
  </BrowserRouter>
  </userContext.Provider>
  </>
  );
}

export default App;
