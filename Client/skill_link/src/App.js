import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData,setformData]=useState({name:'',email:'',password:'',phone:'',address:'',pincode:'',role:''});

  axios.defaults.withCredentials=true;       

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const handleSubmit=()=>
{


  axios.post('http://127.0.0.1:3300/register',formData)
  .then(res=>console.log(res))
  .catch(err=>console.log(err));


}

const handleformData=(e)=>{
  const { name, value } = e.target;

  setformData(prev => ({ ...prev, [name]: value }));
}


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={<Button type='primary' onClick={handleSubmit}>Submit</Button>}> 
       <form>
       <input type='text' name='name' placeholder='name' value={formData.name} onChange={handleformData} /><br></br>
       <input type='email' name='email' placeholder='email'  value={formData.email} onChange={handleformData}/><br></br>
       <input type='password' name='password' placeholder='password'  value={formData.password} onChange={handleformData}/><br></br>
       <input type='text' name='phone' placeholder='phone'  value={formData.phone} onChange={handleformData} /><br></br>
       <input type='text' name='address' placeholder='address'  value={formData.address} onChange={handleformData} /><br></br>
       <input type='text' name='pincode' placeholder='pincode'  value={formData.pincode} onChange={handleformData}/><br></br>
       <input type='text' name='role' placeholder='role'  value={formData.role} onChange={handleformData}/><br></br>

       </form>
      </Modal>
    </>
  );
};

export default App;