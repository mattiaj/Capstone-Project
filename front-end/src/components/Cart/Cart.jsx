import React, { useContext, useEffect, useState } from 'react';
import ItemCart from './ItemCart';
import { Container } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';

export default function Cart() {

    const [data, setData] = useState([]);

    const {theme} = useContext(themeContext);

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
    console.log(data)
  return (
    <>
        <Container className='pt-4'>
            <h1 className={theme === "light" ? "" : "text-light"}>Carrello:</h1>
            {data.length !== 0 ?
            <div className={theme === "light" ? 'border border-2 rounded-top border-dark' : 'border border-2 rounded-top border-light bg-secondary'}>
                {itemsCart && itemsCart.map((el) => 
                <ItemCart key={el._id}
                itemsCart={el}
                data={data}
                getCart={getCart} />
                )}
            </div> :
            <div className={theme === "light" ? 'border border-2 rounded-top border-dark p-3' : 'border border-2 rounded-top border-light bg-secondary p-3'}>
                <h2>Nessun articolo nel carrello</h2>
            </div> }
            <div className={theme === "light" ? 'border border-top-0 border-2 rounded-bottom border-dark p-2 d-flex justify-content-between align-items-center' :
                'border border-top-0 border-2 rounded-bottom border-light bg-secondary p-2 d-flex justify-content-between align-items-center'
            }>
            <h4>Totale Carrello:</h4>
            <h4>€{data.bill}</h4>
            </div>
        </Container>
    </>
  )
}
