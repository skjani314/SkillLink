import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Spin,Modal,Flex } from 'antd'
import userContext from '../Login/UserContext.js';
import axios from 'axios';
import { useContext } from 'react';
import { TextField } from '@mui/material';
import { useState } from 'react';


const RequestTable = props => {

    const { success, error,user } = useContext(userContext);
    const [isOpen,setIsOpen]=useState({modal:false,rating:''});
    const {loading,setLoading}=props;

    const handleRejectClick = async (req_id) => {

        setLoading(true);
        try {


            const result = await axios.put('/requests?req_id=' + req_id + '&status=Reject');
             success("Rejected successfully")
             
        }
        catch (err) {
            error("Unable to Reject The Request");
            console.log(err);
        }
        setLoading(false);

    }


    const handleAcceptClick = async () => {

        setLoading(true);
        try {

            const result = await axios.put('/requests?req_id=' + isOpen.req_id + '&status=Accept&rating='+isOpen.rating+'&verified_by='+user._id+'&req_ser_pro_id='+isOpen.req_ser_pro_id)

             console.log(result.data);
             setIsOpen({modal:false,rating:''})

        }
        catch (err) {

            error("unable to Accept the request");
            console.log(err);
        }

setLoading(false);


    }



    return (
        <>
            <Spin tip="Loading...."
                size='large'
                spinning={loading} >
                <TableContainer component={Paper} >
                    <Table sx={
                        { minWidth: 650 }}
                        size="small"
                        aria-label="a dense table" >
                        <TableHead >
                            <TableRow >
                                <TableCell align="center" > Date </TableCell>
                                <TableCell align="center" > Supplier Name </TableCell>
                                <TableCell align="center" > Mobile </TableCell>
                                <TableCell align="center" > Proffision </TableCell>
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
                                    <TableCell align="center" > {row.proffision} </TableCell>
                                    <TableCell align="center" > {row.location} </TableCell> {
                                        !props.transaction ?
                                            <>
                                                <TableCell align="center" > < Button className="bg-success"
                                                    onClick={
                                                        () => { setIsOpen((prev)=>({...prev,modal:true,req_id:row.req_id,req_ser_pro_id:row.req_ser_pro_id})) }} > Accept </Button></TableCell >

                                                <TableCell align="center" > < Button danger onClick={
                                                    () => { handleRejectClick(row.req_id,row.req_ser_pro_id) }} > Reject </Button></TableCell >
                                            </> : <
                                                TableCell align="center" > < Button className={row.status == 'Accept' ? 'bg-success' : row.status == 'Canceled' ? 'bg-danger' : 'bg-warning'} > {row.status} </Button></TableCell>
                                    } </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Spin>
            <Modal open={isOpen.modal} footer={null} onCancel={()=>setIsOpen((prev)=>({...prev,modal:false}))}>
            <Spin tip="Loading...."
                size='large'
                spinning={loading} >
                <h1>Enter The Rating</h1>
                <TextField variant='outlined' label="Rating" onChange={(e)=>setIsOpen((prev)=>({...prev,rating:e.target.value}))}/>
                <Flex justify="end">
                     <Button onClick={handleAcceptClick} type='primary'>submit</Button>
                </Flex>
                </Spin>
                </Modal>
        </>
    );
};


export default RequestTable;