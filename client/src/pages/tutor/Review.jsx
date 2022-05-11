import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Review() {
    const [review, setReview] = useState([])
    const { user } = useSelector((state) => state.auth)

    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/review/${user.data.id}`);
        if (res.status == 200) {
            setReview(res.data.data)
        }
    }, [])
    console.log(review)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell align="right">Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {review.map((rev, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{rev.rate}</TableCell>
                                <TableCell align="right">{rev.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
