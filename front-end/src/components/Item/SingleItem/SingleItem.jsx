import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { themeContext } from '../../../Context/ThemeContextProvider';
import ItemContainer from './ItemContainer';
import AllReviews from '../../Reviews/AllReviews';

export default function SingleItem() {

    const params = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState({});

    const {theme} = useContext(themeContext);

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
        <Container className='py-5'>
            <Row className={theme === "light" ? 'justify-content-center' : "border bg-secondary text-light rounded"}>
                {data.length !== 0 &&
                    <ItemContainer key={data._id}
                    data={data} />
                }
            </Row>
            <Row className='justify-content-center'>
                <AllReviews id={params.id} />
            </Row>
        </Container>
    </>
  )
}
