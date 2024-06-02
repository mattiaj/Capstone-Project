import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';


export default function PutItem({id, name, description, category, price, image, showPut, setShowPut, getItem}) {

    const [data, setData] = useState({
        name: name,
        description: description,
        category: category,
        price: price,
        itemImage: image
    });

    const putItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${id}`, {
                method: "PUT",
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

                if(data.itemImage) {
                    const formData = new FormData();
                    formData.append("itemImage", data.itemImage);
                    const patch = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${id}/image`, {
                        method: "PATCH",
                        body: formData
                    });

                };
                getItem();
                alert("Prodotto modificato!");
            } else {
                alert("Errore nel modificare il prodotto!");
            };
        } catch (err) {
            console.error(err);
        };
    };

    const handlePut = () => {
        putItem();
        setShowPut(false);
        getItem();
    }

  return (
    <>
        <Modal show={showPut}>
            <Modal.Header>
                <Modal.Title>Modifica il prodotto</Modal.Title>
                <CloseButton onClick={() => setShowPut(false)} />
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
                <Button onClick={() => handlePut()}>Conferma</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
