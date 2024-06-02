import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

export default function AddItem({show, setShow, getItem}) {

    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        itemImage: null
    });

    const postItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    "name": data.name,
                    "description": data.description,
                    "category": data.category,
                    "price": data.price
                })
            });

            if(response.ok) {
                const result = await response.json();

                if(data.itemImage) {
                    const formData = new FormData();
                    formData.append("itemImage", data.itemImage);
                    const patch = await fetch(`${process.env.REACT_APP_ENDPOINT}/${result._id}/image`, {
                        method: "PATCH",
                        body: formData
                    });

                    if(patch.ok) {
                        alert("Prodotto pubblicato!");
                    };
                } else {
                    alert("Prodotto pubblicato!")
                };
            }
        } catch (err) {
            console.error(err);
        };
    };

    const handlePost = () => {
        postItem();
        setShow(false);
        getItem();
    };

  return (
    <>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Pubblica prodotto</Modal.Title>
                <CloseButton onClick={() => setShow(false)} />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                        placeholder='Nome prodotto...'
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                        placeholder='Descrizione prodotto...'
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                        placeholder='Categoria...'
                        value={data.category}
                        onChange={(e) => setData({...data, category: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='number'
                        value={data.price}
                        onChange={(e) => setData({...data, price: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='file'
                        placeholder='Inserisci immagine prodotto'
                        onChange={(e) => setData({...data, itemImage: e.target.files[0]})} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handlePost()}>Conferma</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
