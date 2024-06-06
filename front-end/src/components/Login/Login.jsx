import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap"
import { themeContext } from '../../Context/ThemeContextProvider';
import { GrLogin } from "react-icons/gr";

export default function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const {theme} = useContext(themeContext);

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
        <main className='background-img d-flex justify-content-center'>
            <Container className='row justify-content-center pt-5'>
                <main className={theme === "light" ? 'border border-2 rounded p-3 mt-5 bg-light col-10 col-md-4 ' : 'rounded p-3 mt-5 bg-dark text-light col-10 col-md-4 '} style={{maxHeight: "270px"}} >
                    <h1>Accedi</h1>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Control type='email'
                            className={theme === "dark" ? "bg-secondary" : ""}
                            placeholder='Inserisci la tua email...'
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type='password'
                            className={theme === "dark" ? "bg-secondary" : ""}
                            placeholder='Inserisci la tua password'
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})} />
                        </Form.Group>
                        <div className='d-flex justify-content-between'>
                            <Button variant='link' onClick={() => navigate("/registration")} >Non sei registrato? Clicca qui!</Button>
                            <Button variant={theme === "light" ? "dark" : "secondary"} onClick={() => handleLogin()} >Accedi<GrLogin className='ms-2 mb-1' /></Button>
                        </div>
                    </Form>
                </main>
            </Container>
        </main>
    </>
  )
}
