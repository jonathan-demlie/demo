import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:100vw;
height:40vh;
background-color:rgb(32,129,229);
justify-content:space-between;
`
const Container = styled.div`
margin:20px 15vw;
display:flex;
justify-content:space-between;
`
const Block = styled.div`
padding-top:20px;
padding-left:30px;
flex:1;
`
const Title = styled.h2`
padding-bottom:10px;
color:white;
font-size:17px;
`
const Items = styled.div`
display:flex;
flex-direction:column;
`
const Item = styled(Link)`
font-family: "Times New Roman", Times, serif;
color:white;
text-decoration:none;
font-size:19px;
padding-top:7px;
&:hover{
    text-decoration: underline;
}
`
const Row = styled.div`
display:flex;
align-items:center;
`
const Content = styled.p`
font-family: Arial; 
font-size:17px;
color:white;
`
const PhoneIcon = styled(LocalPhoneIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const Email = styled(EmailIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const Location = styled(LocationOnIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const CopyrightContainer=styled.div`
padding-bottom:20px;
display:flex;
justify-content:center;
align-items:end;
`
const Copyright=styled.div`
font-size:20px;
color:white;
`
export default function Footer() {
    return (
        <div>
            <Wrapper>
                <Container>
                    <Block>
                        <Title>About</Title>
                        <Content>We provide 1-on-1 online tutoring for students and knowledge seekers.There are also comapnies which provides language and relegious tutors for multiple learners.</Content>
                    </Block>
                    <Block>
                        <Title>Tutors</Title>
                        <Items>
                            <Item to='/'>Biology Tutor</Item>
                            <Item to='/'>Mathematics Tutor</Item>
                            <Item to='/'>Physics Tutor</Item>
                            <Item to='/'>English Tutor</Item>
                            <Item to='/'>Marketing Tutor</Item>
                        </Items>
                    </Block>
                    <Block>
                        <Title>Top Subjects</Title>
                        <Items>
                            <Item to='/'>Math</Item>
                            <Item to='/'>Foreign languages</Item>
                            <Item to='/'>Programming</Item>
                            <Item to='/'>Software Engineering</Item>
                            <Item to='/'>Marketing</Item>
                            <Item to='/'>Sales</Item>
                            <Item to='/'>History</Item>
                            <Item to='/'>Relegion</Item>
                        </Items>
                    </Block>
                    <Block>
                        <Title>Contact Us</Title>
                        <Items>
                            <Row>
                                <PhoneIcon />
                                <Item to='/'>0920202020</Item>
                            </Row>
                            <Row>
                                <Email></Email>
                                <Item to='/'>tutor@gmail.com</Item>
                            </Row>
                            <Row>
                                <Location></Location>
                                <Item to='/'>Ethiopia, Addis Ababa</Item>
                            </Row>
                        </Items>
                    </Block>
                </Container>
                <CopyrightContainer>
                    <Copyright>© 2022 Yegna Software Solutions.</Copyright>
                </CopyrightContainer>
            </Wrapper>
        </div>
    )
}
