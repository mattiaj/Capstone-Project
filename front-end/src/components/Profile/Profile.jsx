import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';
import UserItem from './UserItem';
import PutProfile from './PutProfile';
import DeleteProfile from './DeleteProfile';
import { FaUserCog } from "react-icons/fa";

export default function Profile() {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const {theme} = useContext(themeContext);


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
        <Container className='py-md-5 border-bottom pb-4' style={{minHeight: "100vh"}}>
            <Row className={theme === "light" ? 'align-items-center flex-md-row flex-column justify-content-center justify-content-md-start' : 'align-items-center flex-md-row flex-column justify-content-center justify-content-md-start border rounded text-light bg-secondary py-4'}>
                <img src={data.userPicture ? data.userPicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"}
                className='rounded-pill mt-5 ms-md-4 col-lg-3 col-md-4 col-xs-12'
                style={{maxWidth: "350px"}} />
              <Col lg={8} md={5} xs={8}>
                <h1>{data.name} {data.surname}</h1>
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <div className='d-flex'>
                  <Button variant="dark" className='me-2' onClick={() => setShow(true)}><FaUserCog /> Modifica</Button>
                  <DeleteProfile id={data._id} />
                </div>
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
