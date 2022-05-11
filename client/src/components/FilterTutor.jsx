import { Card, CardContent } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const Title = styled.h6`
font-size:20px;
text-align:center;
padding-bottom:30px;
`
const Container = styled.div`
display:flex;
padding:30px;
`
export default function FilterTutor() {
    return (
        <div style={{ padding: '50px' }}>
            <Title>Filter Tutors</Title>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="price Above 150/hr" />
                            <FormControlLabel control={<Checkbox />} label="price Below 150/hr" />
                            <FormControlLabel control={<Checkbox />} label="CGPA  Above 3.0" />
                            <FormControlLabel control={<Checkbox />} label="CGPA  Below 3.0" />
                        </FormGroup>
                        <Container>
                            <Button variant='contained'>Search</Button>
                        </Container>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}
