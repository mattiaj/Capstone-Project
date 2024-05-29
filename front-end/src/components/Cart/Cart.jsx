import React, { useEffect, useState } from 'react';
import ItemCart from './ItemCart';
import { Container } from 'react-bootstrap';

export default function Cart() {

    const [data, setData] = useState([]);

    const itemsCart = data.items;

    const getCart = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/cart`, {
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });

            if(response.ok) {
                const result = await response.json();
                setData(result);
                console.log(result);
            }
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        getCart();
    },[]);
    console.log(itemsCart)
  return (
    <>
        <Container className='mt-4'>
        <h1>Carrello:</h1>
        <div className='border border-2 rounded-top border-dark'>
            {itemsCart && itemsCart.map((el) => 
            <ItemCart key={el._id}
            itemsCart={el}
            data={data}
            getCart={getCart} />
            )}
        </div>
            <div className='border border-top-0 border-2 rounded-bottom border-dark p-2 d-flex justify-content-between align-items-center'>
            <h4>Totale Carrello:</h4>
            <h4>€{data.bill}</h4>
            </div>
        </Container>
    </>
  )
}
