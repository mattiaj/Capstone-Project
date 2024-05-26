import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ItemContainer({data}) {

    console.log(data)

  return (
    <>
        <img className='col-md-5 col-sm-12 border border-2 rounded' src={data.itemImage ? data.itemImage : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"} />
        <Col md={7} sm={12}>
            <Row className='flex-column justify-content-between h-100 ms-2'>
                <div>
                    <h2 className='mb-4'>{data.name}</h2>
                    <div>
                        <h5>Descrizione prodotto:</h5>
                        <p>{data.description}</p>
                    </div>
                </div>
                <ul className='list-unstyled'>
                    <li><strong>Categoria: </strong>{data.category}</li>
                    <li><strong>Prezzo: </strong>€{data.price}</li>
                </ul>
            </Row>
        </Col>
        {/* Reviews */}
    </>
  )
}
