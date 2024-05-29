import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap"

export default function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify({
                    "email": data.email,
                    "password": data.password
                })
            });

            if(response.ok) {
                const result = await response.json();
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", result.token);
                navigate("/");
                console.log(result);
            } else {
                alert("Email o Password errate, Riprova!");
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
                    <Form.Group className='mb-3'>
                        <Form.Control type='email'
                        placeholder='Inserisci la tua email...'
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='password'
                        placeholder='Inserisci la tua password'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})} />
                    </Form.Group>
                    <div className='d-flex justify-content-between'>
                        <Button variant='link' onClick={() => navigate("/registration")} >Non sei registrato? Clicca qui!</Button>
                        <Button variant='primary' onClick={() => handleLogin()} >Accedi</Button>
                    </div>
                </Form>
            </main>
        </Container>
    </>
  )
}
