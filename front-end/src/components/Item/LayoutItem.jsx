import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function LayoutItem({category, price, image, name, description, id}) {

    const navigate = useNavigate();

  return (
    <>
        <Card className='col-lg-3 col-md-4 col-12' style={{width: "18rem"}} onClick={() => navigate(`item/details/${id}`)} >
            <Card.Img variant='top' src={image ? image : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"}  className='img-fluid' />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <ul className='list-unstyled'>
                    <li>
                        <strong>Categoria: </strong>{category}
                    </li>
                    <li>
                        <strong>Prezzo: </strong>€{price}
                    </li>

                </ul>
                <Button variant='warning'><strong>Aggiungi al carrello</strong></Button>
            </Card.Body>
        </Card>
    </>
  )
}
