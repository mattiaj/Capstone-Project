import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { themeContext } from '../../../Context/ThemeContextProvider';
import { MdSend } from "react-icons/md";


export default function PutItem({id, name, description, category, price, image, showPut, setShowPut, getItem}) {

    const [data, setData] = useState({
        name: name,
        description: description,
        category: category,
        price: price,
        itemImage: image
    });

    const {theme} = useContext(themeContext);

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
            <Modal.Header className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Modal.Title>Modifica il prodotto</Modal.Title>
                <CloseButton variant={theme === "dark" ? "white" : ""} onClick={() => setShowPut(false)} />
            </Modal.Header>
            <Modal.Body className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Form>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        placeholder='Nome prodotto...'
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        placeholder='Descrizione prodotto...'
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='text'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        placeholder='Categoria...'
                        value={data.category}
                        onChange={(e) => setData({...data, category: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='number'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        value={data.price}
                        onChange={(e) => setData({...data, price: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control type='file'
                        className={theme === "dark" ? "bg-secondary" : ""}
                        placeholder='Inserisci immagine prodotto'
                        onChange={(e) => setData({...data, itemImage: e.target.files[0]})} />
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
