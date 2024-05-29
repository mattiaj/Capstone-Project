import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function PutReview({review, itemId, getReviews}) {

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
                alert("commento modificato con successo")
            } else {
                alert("C'è stato un errore nella modifica del commento!")
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>
        <Form>
            <Row>
                <Col md={8} className='pe-0'>
                    <Form.Group>
                        <Form.Control type='text'
                        value={data}
                        onChange={(e) => setData(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={3} className='px-0'>
                    <Button onClick={() => putReview(data)}>Invia</Button>
                </Col>
            </Row>
        </Form>
    </>
  )
}
