import React, { useContext, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { themeContext } from '../../../Context/ThemeContextProvider';
import { MdSend } from "react-icons/md";

export default function AddItem({show, setShow, getItem}) {

    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        author: "",
        price: 0,
        itemImage: null
    });

    const {theme} = useContext(themeContext);

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
                    "price": data.price,
                    "author": data.author
                })
            });

            if(response.ok) {
                const result = await response.json();

                if(data.itemImage) {
                    const formData = new FormData();
                    formData.append("itemImage", data.itemImage);
                    const patch = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${result._id}/image`, {
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
        setData({
            name: "",
            description: "",
            category: "",
            author: "",
            price: 0,
            itemImage: null
        })
    };

  return (
    <>
        <Modal show={show}>
            <Modal.Header className={theme === "dark" ? "bg-dark text-light" : ""}>
                <Modal.Title>Pubblica prodotto</Modal.Title>
                <CloseButton variant={theme === "dark" ? "white" : ""} onClick={() => setShow(false)} />
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
                        placeholder='Nome autore...'
                        value={data.author}
                        onChange={(e) => setData({...data, author: e.target.value})} />
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
                <Button variant={theme === "light" ? "dark" : "secondary"} onClick={() => handlePost()}><MdSend /></Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
