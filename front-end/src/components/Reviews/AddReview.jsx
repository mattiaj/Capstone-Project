import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';
import { MdSend } from "react-icons/md";

export default function AddReview({id, getReviews}) {

    const [review, setReview] = useState("");

    const {theme} = useContext(themeContext);

    const postReview = async (review) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({"review": review})
            });

            if(response.ok) {
                const result = await response.json();
                console.log(result)
                getReviews();
                setReview("");
            } else {
                
                alert("Errore nell'invio del commento!")
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>
        <Form style={{width: "75%"}}>
            <InputGroup>
                <Form.Control type='text'
                placeholder='Inserisci un commento...'
                aria-describedby="basic-addon2"
                value={review}
                onChange={(e) => setReview(e.target.value)} />
                <Button variant="dark" id='basic-addon2' onClick={() => postReview(review)} ><MdSend /></Button>
            </InputGroup>
        </Form>
    </>
  )
}
