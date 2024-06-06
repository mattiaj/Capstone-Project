import React, { useContext } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { themeContext } from '../../../Context/ThemeContextProvider';
import { BsCart4 } from "react-icons/bs";

export default function ItemContainer({data}) {

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
        <img className='col-md-5 col-sm-12 border border-2 rounded p-0 mt-md-1 mx-md-1'
        src={data.itemImage ? data.itemImage : "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png"}
        style={{maxHeight: "500px", maxWidth: "420px"}} />
        <Col md={7} sm={12}>
            <Row className='flex-column justify-content-between h-100 ms-2'>
                <div>
                    <h2 className='mb-4 mt-md-0 mt-3'>{data.name}</h2>
                    <div>
                        <h5>Descrizione prodotto:</h5>
                        <p className='overflow-y-scroll' style={{maxHeight: "310px"}}>{data.description}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between  align-items-end'>
                    <ul className={theme === "dark" ? "list-unstyled border-top border-light" : "list-unstyled"}>
                        <li><strong>Autore: </strong>{data.author}</li>
                        <li><strong>Categoria: </strong>{data.category}</li>
                        <li><strong>Prezzo: </strong>€{data.price}</li>
                    </ul>
                    <div className=' mb-3'>
                        <Button variant={theme === "light" ? "warning" : "outline-warning"} className='border border-2  rounded-pill' onClick={() => postCart()}><strong><BsCart4 /> Aggiungi al Carrello</strong></Button>
                    </div>
                </div>
            </Row>
        </Col>
    </>
  )
}
