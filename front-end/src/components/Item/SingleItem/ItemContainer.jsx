import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

export default function ItemContainer({data}) {

    console.log(data)

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
                        "itemId": data._id,
                        "name": data.name,
                        "quantity": 1,
                        "price": data.price
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
        <img className='col-md-5 col-sm-12 border border-2 rounded p-0'
        src={data.itemImage ? data.itemImage : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"}
        style={{maxHeight: "500px"}} />
        <Col md={7} sm={12}>
            <Row className='flex-column justify-content-between h-100 ms-2'>
                <div>
                    <h2 className='mb-4'>{data.name}</h2>
                    <div>
                        <h5>Descrizione prodotto:</h5>
                        <p className='overflow-y-scroll' style={{maxHeight: "310px"}}>{data.description}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <ul className='list-unstyled'>
                        <li><strong>Categoria: </strong>{data.category}</li>
                        <li><strong>Prezzo: </strong>€{data.price}</li>
                    </ul>
                    <div>
                        <Button variant='warning' className='border border-2 border-black rounded-pill' onClick={() => postCart()}><strong>Aggiungi al Carrello</strong></Button>
                    </div>
                </div>
            </Row>
        </Col>
    </>
  )
}
