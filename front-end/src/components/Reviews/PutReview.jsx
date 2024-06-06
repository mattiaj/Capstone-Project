import React, { useContext, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { themeContext } from '../../Context/ThemeContextProvider';
import { MdSend } from "react-icons/md";

export default function PutReview({review, itemId, getReviews, show, setShow}) {

    const [data, setData] = useState(review.review);

    const {theme} = useContext(themeContext);

    const putReview = async (comment) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${itemId}/reviews/${review._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({"review": comment})
            });
            if(response.ok) {
                const result = await response.json();
                getReviews();
                alert("commento modificato con successo");
            } else {
                alert("C'è stato un errore nella modifica del commento!");
            };
        } catch (err) {
            console.error(err);
        };
    };

    const handlePut = () => {
        putReview(data);
        setShow(false);
    }

  return (
    <>
        <Modal show={show}>
            <Modal.Header className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Modal.Title>Modifica il commento</Modal.Title>
                <CloseButton onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data}
                        onChange={(e) => setData(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Button variant={theme === "light" ? "dark" : "secondary"} onClick={() => handlePut()}><MdSend /></Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
