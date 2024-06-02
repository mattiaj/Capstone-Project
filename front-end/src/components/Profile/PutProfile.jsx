import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

export default function PutProfile({id, name, surname, username, email, userPicture, password, getProfile, show, setShow}) {

    const [data, setData] = useState({
        name: name,
        surname: surname,
        username: username,
        email: email,
        userPicture: userPicture,
        password: password
    });


    const putProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    "name": data.name,
                    "surname": data.surname,
                    "username": data.username,
                    "email": data.email,
                    "password": data.password
                })
            });

            if(response.ok) {
                
                if(data.userPicture) {
                    const formData = new FormData();
                    formData.append("userPicture", data.userPicture);
                    const patch = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/${id}/picture`, {
                        method: "PATCH",
                        body: formData
                    });
                };

                getProfile();
                alert("Profilo modificato!");
            } else {
                alert("Errore nel modificare il profilo!");
            }
        } catch (err) {
            console.error(err);
        };
    };

    const handlePut = () => {
        putProfile();
        setShow(false);
    };



  return (
    <>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Modifica il tuo profilo</Modal.Title>
                <CloseButton onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                        value={data.name}
                        placeholder='Nome...'
                        onChange={(e) => setData({...data, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                        value={data.surname}
                        placeholder='Cognome...'
                        onChange={(e) => setData({...data, surname: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                        value={data.username}
                        placeholder='Username...'
                        onChange={(e) => setData({...data, username: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='email'
                        value={data.email}
                        placeholder='Email...'
                        onChange={(e) => setData({...data, email: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='file'
                        onChange={(e) => setData({...data, userPicture: e.target.files[0]})} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handlePut()}>Conferma</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
