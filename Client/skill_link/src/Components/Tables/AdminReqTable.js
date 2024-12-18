import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin,Flex } from 'antd'
import userContext from '../Login/UserContext.js';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';

const AdminReqTable = props => {


    const { success, error,user } = useContext(userContext);
    const {loading,setLoading}=props;

    const handleRejectClick = async (req_id) => {

        setLoading(true);
        try {


            const result = await axios.put(process.env.REACT_APP_API_URL+'/requests?req_id=' + req_id + '&status=Reject');
             success("Rejected successfully")
             
        }
        catch (err) {
            error("Unable to Reject The Request");
            console.log(err);
        }
        setLoading(false);

    }


    const handleAcceptClick = async (req_id,req_agent_id) => {

        setLoading(true);
        try {

           const result=await axios.put(process.env.REACT_APP_API_URL+'/requests?req_id='+req_id+'&status=Accept&req_agent_id='+req_agent_id+'&verified_by='+user._id)
           console.log(result.data);

        }
        catch (err) {

            error("unable to Accept the request");
            console.log(err);
        }

setLoading(false);


    }



    return (
        <Spin tip="Loading...."
            size='large'
            spinning={loading} >
            <TableContainer component={Paper} >
                <Table 
                    size="small"
                    aria-label="a dense table" >
                    <TableHead >
                        <TableRow >
                            <TableCell align="center" > Date </TableCell>
                            <TableCell align="center" > Agent Name </TableCell>
                            <TableCell align="center" > Mobile </TableCell>
                            <TableCell align="center" > Location </TableCell>
                            {
                                !props.transaction ?
                                    <>
                                        <TableCell align="center" > Accept </TableCell>
                                        <TableCell align="center" > Reject </TableCell></>
                                    :
                                    < TableCell align="center" > Status </TableCell>

                            } </TableRow> </TableHead> <TableBody >
                        {
                            props.rowsData.map((row, index) => (<TableRow key={index}
                                sx={
                                    { '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell align="center"
                                    component="th"
                                    scope="row" > {row.date.split('T')[0]} </TableCell>
                                <TableCell align="center" > {row.name} </TableCell>
                                <TableCell align="center" > {row.mobile} </TableCell>
                                <TableCell align="center" > {row.location} </TableCell> {
                                    !props.transaction ?
                                        <>
                                            <TableCell align="center" > < Button className="bg-success"
                                                onClick={()=>handleAcceptClick(row.req_id,row.req_agent_id)} > Accept </Button></TableCell >

                                            <TableCell align="center" > < Button danger onClick={()=>handleRejectClick(row.req_id)} > Reject </Button></TableCell >
                                        </> : <
                                            TableCell align="center" > < Button className={row.status == 'Accept' ? 'bg-success' : row.status == 'Canceled' ? 'bg-danger' : 'bg-warning'} > {row.status} </Button></TableCell>
                                } </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Spin>
      
    );
};



export default AdminReqTable;