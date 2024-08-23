import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ResetPass = props => {

const {token}=useParams();
const [load,setLoad]=useState(true);
const [verified,setverified]=useState(false);
const [formData,setFormdata]=useState({Password:''});
let ismount=true;


useEffect(
()=>{
const fun=async ()=>
{

const result=await axios.post('/forget/verify',{token:token})
                        .then(res=>{
                            if(res.data.verified){
                                setverified(true);
                            }
                        })
                         .catch(err=>console.log(err));


}
if(ismount){
fun();}
setLoad(false);
return ()=>{ismount=false;}

    },[]);

const hanldesubmit=async (e)=>
{
e.preventDefault();
await axios.post('/passchange',{token:token,Password:formData.Password})
     .then(res=>{console.log(res)}) 
     .catch(err=>console.log(err));
}


if(load)
{
    return (
        <div>
    <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    );
}
else
{

if(verified)
{
return (
<div>
<form method='POST' onSubmit={hanldesubmit}>
<input type='password' name='password' value={formData.Password} onChange={(e)=>{setFormdata(e.target.value)}} />
<input type='submit'/>
</form>
</div>
);
}
else{
    return(<h1>token Expired</h1>);
}

}

};



export default ResetPass;