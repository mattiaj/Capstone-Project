import React, { useContext, useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import AddItem from './NewItem/AddItem';
import { Row, Button } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';


export default function UserItem() {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const {theme} = useContext(themeContext);

    const getItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/item`, {
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });

            if(response.ok) {
                const result = await response.json();
                setData(result);
                console.log(data);
            }
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        getItem();
    },[]);

  return (
    <>
        <main className='mt-5'>
            <div className='d-flex justify-content-between'>
                <h1 className={theme === "dark" ? "text-light" : ""}>Articoli Pubblicati:</h1>
                <Button variant={theme === "light" ? "warning" : "outline-warning"} onClick={() => setShow(true)}>Aggiungi prodotti</Button>
            </div>
            <Row className='justify-content-around mt-4'>
                {data && data.map((item) => <ItemCard key={item._id}
                id={item._id}
                category={item.category}
                image={item.itemImage}
                price={item.price}
                name={item.name}
                author={item.author}
                description={item.description}
                getItem={getItem} /> )}
            </Row>
            <AddItem show={show} setShow={setShow} getItem={getItem} />
        </main>
    </>
  )
}
