import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserItem from './UserItem';
import PutProfile from './PutProfile';
import DeleteProfile from './DeleteProfile';

export default function Profile() {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);


    const getProfile = async () => {
      if(localStorage.getItem("token") !== null) {
        try {
          const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/profile`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
          });
  
          if(response.ok) {
            const result = await response.json();
            setData(result);
            console.log(data);
          }
        } catch (err) {
          console.error(err);
        };
      } else {
        alert("Devi fare il login!");
        navigate("/login")
      };
    };

    useEffect(() => {
      getProfile();
    },[]);

    

  return (
    <>
      <PutProfile 
      id={data._id}
      name={data.name}
      surname={data.surname}
      username={data.username}
      userPicture={data.userPicture}
      email={data.email}
      password={data.password}
      getProfile={getProfile}
      show={show}
      setShow={setShow} />
      {data && 
        <Container className='mt-5 border-bottom pb-3'>
            <Row className='justify-content-md-between justify-content-center'>
              <Col lg={4} md={3} xs={12}>
                <img src={data.userPicture ? data.userPicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"} className='border border-2 rounded-pill' style={{maxWidth: "350px"}} />
              </Col>
              <Col lg={8} md={5} xs={8}>
                <h1>{data.name} {data.surname}</h1>
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <Button className='me-2' onClick={() => setShow(true)}>Modifica</Button>
                <DeleteProfile id={data._id} />
              </Col>
            </Row>
            <Row>
              <UserItem />
            </Row>
        </Container>
      }
    </>
  )
}
