import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

export default function PutReview({review, itemId, getReviews, show, setShow}) {

    const [data, setData] = useState(review.review);

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
            <Modal.Header>
                <Modal.Title>Modifica il commento</Modal.Title>
                <CloseButton onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                        value={data}
                        onChange={(e) => setData(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handlePut()}>Invia</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
