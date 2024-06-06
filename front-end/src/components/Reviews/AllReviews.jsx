import React, { useContext, useEffect, useState } from 'react';
import { themeContext } from '../../Context/ThemeContextProvider';
import ListReviews from './ListReviews';
import AddReview from './AddReview';

export default function AllReviews({id}) {

    const [data, setData] = useState([]);

    const {theme} = useContext(themeContext);
    
    const getReviews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${id}/reviews`);
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
        getReviews();
    },[]);

    

  return (
    <>
    <div className={theme === "light" ? 'mt-4 d-flex flex-column align-items-center pb-4 rounded' : 'mt-4 d-flex flex-column align-items-center bg-secondary pb-4 rounded'} style={{width: "70%"}}>
        <h2>Recensioni:</h2>
        <ul className='list-unstyled mt-4 border border-2 rounded px-3 w-75 overflow-y-scroll' style={{maxHeight: "320px"}}>
            {data && data.map((reviews) => 
                <ListReviews key={reviews._id}
                reviews={reviews}
                itemId={id}
                getReviews={getReviews} />
            )}
        </ul>
        <AddReview id={id} getReviews={getReviews} />
    </div>
    </>
  )
}
