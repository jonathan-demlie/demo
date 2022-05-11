import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Logo from "../public/logo192.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  useEffect(() => {
    async function fetchJsonData() {
      const data = await JSON.parse(
        localStorage.getItem("user")
      );
      setCurrentUserName(data.firstName);
      setCurrentUserImage(data.avatarImage);
    }


    fetchJsonData();
  }, []);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && currentUserName && (
        <Container>
          <div className="brand">
            <h3>Freinds</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact.id}
                  className={`contact ${index === currentSelected ?  "selected" : ""
                    }
                  `

                  }
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <Image
                    // src={Logo}
                    alt="avater"
                  >
                  </Image>
                 

                      <div className={`selected-username ${index === currentSelected ?  "selected" : "unselecetd-username"
                    }
                  `

                  } >
                       <h3> {contact.firstName}</h3>
                      </div>
           
 
                  
                   </div>
              );
            })}
          </div>
          <CurrentUser>
            
          <UserImg 
              
                // src={Logo}
                alt="avatar"
              >

              </UserImg>
            
            <FirstName >
            {currentUserName}
            </FirstName>
          </CurrentUser>
        </Container>
      )}
    </>
  );
} 


const FirstName= styled.div`
color: rgb(0,0,0);

`
const CurrentUser=styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 2rem;
`
const UserImg =styled.img`
vertical-align: middle;
width: 60px;
height: 60px;
border-radius: 70%;
background-color:rgb(223,227,238);
background-size:cover;
object-fit:cover;
`
const Image = styled.img`
width:40px;
height:40px;
border-radius: 50%;
background-size:cover;
object-fit: cover;
`
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: rgb(223,227,238);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    
    h3 {
      color: rgb(10,10,10);
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgb(10,10,10);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color:rgb(245,245,245);
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.1s ease-in-out; 
      
     
    }
    .selected {
      background-color: rgb(139,157,195);
      .unselecetd-username{
        h3{
          color: rgb(10,10,10)
        }
      }
.selected-username{
  h3{
    color: rgb(255,255,255);

  }

}
     
    }
  }  
`;
