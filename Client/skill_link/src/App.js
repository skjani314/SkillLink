import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData,setformData]=useState({name:'',email:'',password:'',phone:'',address:'',pincode:'',role:''});




  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const handleSubmit=()=>
{


axios.post('/login',formData,{withCredentials:true})
  .then(res=>console.log(res))
  .catch(err=>console.log(err));


}

const handleLogout=()=>{ 

axios.post('/logout')
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
       <input type='email' name='email' placeholder='email'  value={formData.email} onChange={handleformData}/><br></br>
       <input type='password' name='password' placeholder='password'  value={formData.password} onChange={handleformData}/><br></br>
       </form>
      </Modal>
      <Button onClick={handleLogout}>Log Out</Button>
    </>
  );
};

export default App;