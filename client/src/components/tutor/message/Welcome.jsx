import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    async function fetchData()
    {
      setUserName(
        await JSON.parse(
          localStorage.getItem("user")
        ).firstName
      );
    }
    fetchData();

  },
  
  []);

  return (
    <Container>
      {/* <img src={Robot} alt="demo" /> */}
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a tutor to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0,0,0);
  flex-direction: column;
  img {
    height: 5rem;
  }
  span {
    color: rgb(119,136,153);
  }
`;
