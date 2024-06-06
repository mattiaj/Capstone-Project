import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';
import LayoutItem from './LayoutItem';
import SearchItem from './SearchItem';


export default function AllItems() {

    const [data, setData] = useState([]);
    
    const [input, setInput] = useState("");
    const [search, setSearch] = useState(data);

    const {theme} = useContext(themeContext);

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

    useEffect(() => {
        const filteredSearch = data.filter((el) => el.name.toLowerCase().includes(input.toLowerCase()) || el.author.toLowerCase().includes(input.toLowerCase())) ;
        setSearch(filteredSearch);
    },[input, data])

  return (
    <>
        <Row className={theme === "light" ? 'py-4 justify-content-center border-bottom shadow' : "py-4 justify-content-center  bg-dark"}>
            <SearchItem input={input} setInput={setInput} />
        </Row>
        <Container>
            <Row className='justify-content-around mt-5'>
                {search &&
                search.map((item) => <LayoutItem key={item._id}
                id={item._id}
                category={item.category}
                image={item.itemImage}
                price={item.price}
                name={item.name}
                description={item.description}
                author={item.author} />)}
            </Row>
        </Container>
    </>
  )
}
