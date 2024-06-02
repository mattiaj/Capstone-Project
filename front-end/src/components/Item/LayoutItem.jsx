import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function LayoutItem({category, price, image, name, description, id}) {

    const navigate = useNavigate();

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
        <Card className='col-lg-3 col-md-4 col-12 p-0' style={{width: "18rem"}} >
            <Card.Img variant='top'
            src={image ? image : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"}
            className='img-fluid'
            onClick={() => navigate(`item/details/${id}`)}
            style={{maxHeight: "300px"}} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title onClick={() => navigate(`item/details/${id}`)}>{name}</Card.Title>
                <Card.Text className='overflow-y-hidden' style={{maxHeight: "100px"}}>{description}</Card.Text>
                <div>
                    <ul className='list-unstyled'>
                        <li>
                            <strong>Categoria: </strong>{category}
                        </li>
                        <li>
                            <strong>Prezzo: </strong>€{price}
                        </li>

                    </ul>
                    <Button variant='warning' onClick={() => postCart()}><strong>Aggiungi al carrello</strong></Button>
                </div>
            </Card.Body>
        </Card>
    </>
  )
}
