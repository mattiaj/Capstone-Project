import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ItemContainer from './ItemContainer';
import AllReviews from '../../Reviews/AllReviews';

export default function SingleItem() {

    const params = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState({});

    const endpoint = `${process.env.REACT_APP_ENDPOINT}/item/${params.id}`;

    const getItem = async () => {
        try {
            const response = await fetch(endpoint);

            if(response.ok) {
                const result = await response.json();
                setData(result);
                console.log(data);
            } else {
                alert("Non abbiamo trovato il prodotto!");
                navigate("/")
            }
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        getItem();
        // console.log(data)
    },[]);

  return (
    <>
        <Container className='mt-5'>
            <Row>
                {data.length !== 0 &&
                    <ItemContainer key={data._id}
                    data={data} />
                }
            </Row>
            <AllReviews id={params.id} />
        </Container>
    </>
  )
}
