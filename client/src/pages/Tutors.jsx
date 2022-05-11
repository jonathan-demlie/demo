import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Tutor from '../components/Tutor'
import Pagination from '@mui/material/Pagination';
import usePagination from '../components/MyPagination'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import FilterTutor from '../components/FilterTutor'

const Center = styled.div`
padding:30px 0;
display:flex;
justify-content:center;
`
const Title = styled.h5`
padding:30px 0;
font-size:24px;
text-align:center;
`
export default function Tutors() {
    const [tutors, setTutors] = useState([])

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/api/tutors');
        if (res.status == 200) {
            setTutors(res.data.data)
        }
    }, [])

    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(tutors.length / PER_PAGE);
    const _DATA = usePagination(tutors, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    console.log(tutors)
    return (
        <div >
            <Navbar />
            <Title>Find Your Tutor Here</Title>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <FilterTutor/>
                </Grid>
                <Grid item lg={5}>
                    <div style={{ padding: "30px" }}>{
                        _DATA.currentData().map((tutor) => (
                            <Tutor key={tutor.id} tutor={tutor} />
                        ))
                    }</div>
                    <Center>
                        <Pagination
                            count={count}
                            size="large"
                            page={page}
                            onChange={handleChange}
                            color="primary"
                        />
                    </Center>
                </Grid>
                <Grid item lg={3}>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
