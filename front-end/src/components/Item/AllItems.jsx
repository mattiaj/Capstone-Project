import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import LayoutItem from './LayoutItem';


export default function AllItems() {

    const [data, setData] = useState([]);

    const getItems = async () => {

        try {
            
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item`);

            if(response.ok) {
                const result = await response.json();
                // console.log(result);
                setData(result);
            }
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        getItems();
        // console.log(data)
    },[]);


  return (
    <>
        <Container className='mt-5'>
            <Row className='justify-content-around'>
                {data &&
                data.map((item) => <LayoutItem key={item._id}
                id={item._id}
                category={item.category}
                image={item.itemImage}
                price={item.price}
                name={item.name}
                description={item.description} />)}
            </Row>
        </Container>
    </>
  )
}
