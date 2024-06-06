import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { themeContext } from '../../Context/ThemeContextProvider';
import { MdSend } from "react-icons/md";

export default function PutProfile({id, name, surname, username, email, userPicture, password, getProfile, show, setShow}) {

    const [data, setData] = useState({
        name: name,
        surname: surname,
        username: username,
        email: email,
        userPicture: userPicture,
        password: password
    });

    const {theme} = useContext(themeContext);


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
            <Modal.Header className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Modal.Title>Modifica il tuo profilo</Modal.Title>
                <CloseButton variant={theme === "dark" ? "white" : ""} onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Form>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data.name}
                        placeholder='Nome...'
                        onChange={(e) => setData({...data, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data.surname}
                        placeholder='Cognome...'
                        onChange={(e) => setData({...data, surname: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data.username}
                        placeholder='Username...'
                        onChange={(e) => setData({...data, username: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='email'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data.email}
                        placeholder='Email...'
                        onChange={(e) => setData({...data, email: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='file'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        onChange={(e) => setData({...data, userPicture: e.target.files[0]})} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer  className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Button variant={theme === "light" ? "dark" : "secondary"} onClick={() => handlePut()}><MdSend /></Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
