import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { FaTrashCan } from "react-icons/fa6";


export default function ItemCart({itemsCart, getCart}) {
console.log(itemsCart)

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/cart`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            });

            if(response.ok) {
                getCart();
                alert("Prodotto eliminato dal carrello!");
            } else {
                alert("Non è stato possibile eliminare il prodotto")
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>     
        <Row className=' mt-3 justify-content-between align-items-baseline p-3'>
            <h3 className='m-0 col-md-8'>{itemsCart.name}</h3>
            <p className='m-0 col-md-2'><strong>Quantità: </strong>{itemsCart.quantity}</p>
            <div className='d-flex align-items-baseline justify-content-between col-md-2'>
                <p className='mb-0 me-2'><strong>Prezzo: </strong>€{itemsCart.price}</p>
                <Button variant='danger' size='sm' onClick={() => deleteItem(itemsCart.itemId)}><FaTrashCan /></Button>
            </div>
        </Row>
        
    </>
  )
}
