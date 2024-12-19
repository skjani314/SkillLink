
import React, { useContext, useEffect, useState } from 'react';
import MyServiceCard from '../Cards/MyServiceCard';
import {Flex,Spin} from 'antd';
import userContext from '../Login/UserContext';
import axios from 'axios';
const Myservices = () => {

const {success,error,user}=useContext(userContext);
const [myservice,setmyservice]=useState([]);
const [loading,setLoading]=useState(false);



useEffect(()=>{

const getMyservice=async ()=>{

try{

const result =await axios.get(process.env.REACT_APP_API_URL+'/ser_myservices?user_id='+user._id);
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

},[loading])



    return (
      <Spin tip="Loading...." size='large' spinning={loading}>

        <div className="dashboard-container pt-3">
          <h1 className='p-1 m-2'>My Services</h1>
          <Flex wrap justify="center" gap={10} >
            {myservice.map((each,index)=>(
              <MyServiceCard  key={index} setLoading={setLoading} loading={loading} data={each}/>

            ))
}
</Flex>
        </div>
        </Spin>
    );
};


export default Myservices;
