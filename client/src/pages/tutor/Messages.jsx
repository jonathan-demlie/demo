import axios from 'axios';
import React, { useEffect, useState, useRef} from 'react'
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom'
import Contacts from '../../components/tutor/message/Contacts';
import Welcome from '../../components/tutor/message/Welcome';
import MessageContainer from '../../components/tutor/message/MessageContainer';
import { allUsersRoute, host } from '../../messageRoutes/MessageRoutes';
import styled from 'styled-components';

export default function Messages() {
  const navigate=useNavigate();
  const socket=useRef();
  const [contacts, setContacts]=useState([]);
  const [currentMessage, setCurrentMessage]=useState(undefined);
  const [currentUser, setCurrentUser]=useState(undefined);
  useEffect(()=>{
    async function getNavigateData(){
      if(
        !localStorage.getItem("user")){
navigate("/login");
      }
else{
  setCurrentUser(
    await JSON.parse(
      localStorage.getItem("user")
     )
   );
        }      
    }
    getNavigateData();

  },[]);
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser.id);
    }
  },[currentUser]);
  
  useEffect(()=>{
    async function getCurrentUser(){
      if(currentUser){
        const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
        setContacts(data.data)
      }
    }
    getCurrentUser();
  },[currentUser]);
  const handleMessageChange=(message)=>{
    setCurrentMessage(message);
  };

  return (
    <>
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} handleChange={handleMessageChange}/>
        {currentMessage===undefined?( 
          <Welcome/>

        ):(
          <MessageContainer currentMessage={currentMessage} socket={socket}/>
        )}
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(255,255,255);
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgb(247,247,240);
    display: grid;
    grid-template-columns: 25% 75%;
   
  }
`;