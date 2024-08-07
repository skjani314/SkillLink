import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen}  onCancel={handleCancel} footer={null}> 
       
      </Modal>
    </>
  );
};

export default App;