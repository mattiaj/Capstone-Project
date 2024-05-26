import React, { useEffect, useState } from 'react';
import ListReviews from './ListReviews';

export default function AllReviews({id}) {

    const [data, setData] = useState([]);
    // console.log(id)
    
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
        {data && data.map((reviews) => 
            <ListReviews key={reviews._id}
            reviews={reviews} />
        )}
    </>
  )
}
