import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PutItem from './NewItem/PutItem';

export default function ItemCard({id, category, name, description, price, image, getItem}) {

    const [showPut, setShowPut] = useState(false);

    const deleteIteme = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });

            if(response.ok) {
                getItem();
                alert("Prodotto eliminato!");
            } else {
                alert("Non è stato possibile eliminare il prodotto!")
            }
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
            style={{maxHeight: "300px"}} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className='overflow-y-hidden' style={{maxHeight: "100px"}}>{description}</Card.Text>
                    <ul className='list-unstyled'>
                        <li>
                            <strong>Categoria: </strong>{category}
                        </li>
                        <li>
                            <strong>Prezzo: </strong>€{price}
                        </li>
                    </ul>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={() => setShowPut(true)}>Modifica</Button>
                        <Button variant='danger' onClick={() => deleteIteme()}>Elimina</Button>
                    </div>
            </Card.Body>
        </Card>
        <PutItem 
        id={id} 
        name={name}
        category={category}
        description={description}
        price={price}
        image={image}
        showPut={showPut}
        setShowPut={setShowPut}
        getItem={getItem} />
    </>
  )
}