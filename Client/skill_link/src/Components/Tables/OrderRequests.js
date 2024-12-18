import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button,Spin} from 'antd'
import userContext from '../Login/UserContext.js';
import axios from 'axios';
import {useContext} from 'react';

const OrderRequests = props => {

const {loading,setLoading,success,error}=useContext(userContext);
const handleAcceptClick=async (id)=>{
setLoading(true);
try{

const result=await axios.put(process.env.REACT_APP_API_URL+'/orders?order_id='+id+'&status=Accept')
console.log(result.data);

}
catch(err){
console.log(err);
error("unable to accept order");
}

setLoading(false);

}


const handleRejectClick=async (id)=>{
    setLoading(true);
    try{
    
    const result=await axios.put(process.env.REACT_APP_API_URL+'/orders?order_id='+id+'&status=Canceled')
    console.log(result.data);
    
    }
    catch(err){
    console.log(err);
    error("unable to Delete order");
    }
    
    setLoading(false);
    
    }
    



    return (
        <Spin tip="Loading...." size='large' spinning={loading}>
        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Customer Name </TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Service Name</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Address</TableCell>
              {!props.transaction?
              <>
              <TableCell align="center">Accept</TableCell>
              <TableCell align="center">Reject</TableCell></>
                 :<TableCell align="center">Status</TableCell>

            }
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rowsData.map((row,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.date.split('T')[0]}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.ser_name}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                {!props.transaction?
                  <>
                <TableCell align="center"><Button className="bg-success" onClick={()=>{handleAcceptClick(row.order_id)}}>Accept</Button></TableCell>
                <TableCell align="center"><Button danger  onClick={()=>{handleRejectClick(row.order_id)}}>Reject</Button></TableCell>
                </>:                <TableCell align="center"><Button className={row.status=='Accept'?'bg-success':row.status=='Canceled'?'bg-danger':'bg-warning'}>{row.status}</Button></TableCell>


                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Spin>
    );
};



export default OrderRequests;