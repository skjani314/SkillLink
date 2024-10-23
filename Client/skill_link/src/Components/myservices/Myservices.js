
import React, { useContext, useEffect, useState } from 'react';
import MyServiceCard from '../Cards/MyServiceCard';
import {Flex,Spin} from 'antd';
import userContext from '../Login/UserContext';
import axios from 'axios';
const Myservices = () => {

const {success,error,loading,setLoading,user}=useContext(userContext);
const [myservice,setmyservice]=useState([]);




useEffect(()=>{

const getMyservice=async ()=>{

try{

const result =await axios.get('/ser_myservices?user_id='+user._id);
console.log(result.data);
setmyservice([...result.data])

}
catch(err)
{
  console.log(err);
  error("unable to fetch Services");
  
}


}

if(user){
getMyservice();}

},[])



    return (
      <Spin tip="Loading...." size='large' spinning={loading}>

        <div className="dashboard-container pt-3">
          <h1 className='p-1 m-2'>My Services</h1>
          <Flex wrap justify="center" gap={10} >
            {myservice.map((each,index)=>(
              <MyServiceCard  key={index} data={each}/>

            ))
}
</Flex>
        </div>
        </Spin>
    );
};


export default Myservices;
