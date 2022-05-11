import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MessageInput from "./MessageInput";
// import Logo from "../public/logo192.png";

import { v4 as uuidv4 } from "uuid";
import socket  from "socket.io-client";
import axios from "axios";
import {sendMessageRoute, recieveMessageRoute } from "../../../messageRoutes/MessageRoutes";

export default function MessageContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);


  
  useEffect( () => {
 const getCurrentMessage=async()=>{
 
    const data = await JSON.parse(
      localStorage.getItem("user")
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data.id,
      to: currentChat.id,
    });
    setMessages(response.data);

  };
  getCurrentMessage();

  },
  
  [currentChat]);

  

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("user")
        ).id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("user")
    );
    socket.current.emit("send-msg", {
      to: currentChat.id,
      from: data.id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data.id,
      to: currentChat.id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  return (
    <Container>
      <ChatHeader className="chat-header">
        <UserDetail className="user-details">
          <Avater className="avatar">
            <Image
            //   src= {Logo} 
              alt="profile"
            />
          </Avater>
          <FirstName className="username">
            <h3>{currentChat.firstName}</h3>
          </FirstName>
        </UserDetail>
      
      </ChatHeader>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className={`content ${message.fromSelf ? "sended-msg" : "recieved-msg"}`}  >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
const ChatHeader =styled.header`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;
  `
 const UserDetail =styled.div`
  display: flex;
      align-items: center;
      gap: 1rem;
  `
  const Avater=styled.div`
  
  `
  const Image=styled.img`
  height: 3rem;
  height:40px;
  width:40px;
  border-radius: 50%;
  
  `

  const FirstName =styled.h3`
  color: rgb(0,0,0);
  `

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
 

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color:rgb(0,0,0);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
       
       
        
       
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(230,230,250);
        .sended-msg{
          color: rgb(10,10,10)
        }
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(30,144,255);
        
      }
      .recieved-msg{
        color: rgb(255,255,255);
      }
    }
  }
`;
