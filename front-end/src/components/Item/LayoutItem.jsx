import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { themeContext } from '../../Context/ThemeContextProvider';
import { BsCart4 } from "react-icons/bs";

export default function LayoutItem({category, price, image, name, description, author, id}) {

    const navigate = useNavigate();

    const {theme} = useContext(themeContext);

    const postCart = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/cart`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    "items":{
                        "itemId": id,
                        "name": name,
                        "quantity": 1,
                        "price": price
                    }
                })
            });

            if(response.ok) {
                alert("Prodotto aggiunto al carrello");
            } else {
                alert("Non è stato possibile aggiungere il prodotto al carrello!");
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>
        <Card className={theme === "light" ? 'col-lg-3 col-md-4 col-12 p-0 mt-3 d-flex flex-column align-items-center' : 'col-lg-3 col-md-4 col-12 p-0 mt-3 d-flex flex-column align-items-center bg-secondary text-light'} style={{width: "18rem"}} >
            <Card.Img variant='top'
            src={image ? image : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"}
            className='img-fluid mt-2'
            onClick={() => navigate(`item/details/${id}`)}
            style={{maxHeight: "200px", maxWidth: "120px"}} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title onClick={() => navigate(`item/details/${id}`)}>{name}</Card.Title>
                <Card.Text className='overflow-y-hidden' style={{maxHeight: "100px"}}>{description}</Card.Text>
                <div>
                    <ul className='list-unstyled'>
                        <li>
                            <strong>Autore: </strong>{author}
                        </li>
                        <li>
                            <strong>Categoria: </strong>{category}
                        </li>
                        <li>
                            <strong>Prezzo: </strong>€{price}
                        </li>

                    </ul>
                    <div className='d-flex justify-content-center'>
                        <Button variant={theme === "light" ? 'warning' : "outline-warning"} onClick={() => postCart()}><strong><BsCart4 /> Aggiungi al carrello</strong></Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </>
  )
}
