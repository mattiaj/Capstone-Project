import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';



export default function Registration() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        surname: "",
        username: "",
        userPicture: null,
        email: "",
        password: ""
    });

    const handleRegistration = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/registration`, {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify({
                    "name": data.name,
                    "surname": data.surname,
                    "username": data.username,
                    "email": data.email,
                    "password": data.password
                })
            });
            if(response.ok) {
                const result = await response.json();

                if(data.userPicture) {
                    const formData = new FormData();
                    formData.append("userPicture", data.userPicture);
                    const patch = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/${result.user._id}/picture`, {
                        method: "PATCH",
                        body: formData
                    });

                    if(patch.ok) {
                        const newUser = await patch.json();
                        localStorage.setItem("user", JSON.stringify(result.user));
                        localStorage.setItem("token", result.token);
                        console.log(newUser);
                        navigate("/login");
                    };
                } else {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("token", JSON.stringify(result.token));
                    console.log(result);
                    navigate("/login");
                };
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>
        <Container className='d-flex justify-content-center mt-5'>
            <main className='border border-2 rounded p-3' style={{width: "30%"}}>
                <h1>Accedi</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Inserisci il tuo nome:</Form.Label>
                        <Form.Control type='text'
                        placeholder='Nome...'
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inserisci il tuo cognome:</Form.Label>
                        <Form.Control type='text'
                        placeholder='Cognome...'
                        value={data.surname}
                        onChange={(e) => setData({...data, surname: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inserisci un'username</Form.Label>
                        <Form.Control type='text'
                        placeholder='Username...'
                        value={data.username}
                        onChange={(e) => setData({...data, username: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inserisci la tua Email</Form.Label>
                        <Form.Control type='email'
                        placeholder='Email...'
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inserisci una Password</Form.Label>
                        <Form.Control type='password'
                        placeholder='Password...'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inserisci un'immagine profilo</Form.Label>
                        <Form.Control type='file'
                        placeholder='Inserisci una foto'
                        onChange={(e) => setData({...data, userPicture: e.target.files[0]})} />
                    </Form.Group>
                    <div className='d-flex justify-content-between'>
                        <Button variant='link' onClick={() => navigate("/login")} >Sei già registrato? Clicca qui!</Button>
                        <Button variant='primary' onClick={() => handleRegistration()} >Registrati</Button>
                    </div>
                </Form>
            </main>
        </Container>
    </>
  )
}
