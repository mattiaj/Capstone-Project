import React, { useEffect, useState } from 'react';
import ListReviews from './ListReviews';
import AddReview from './AddReview';

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
    <div className='mt-4 d-flex flex-column align-items-center' style={{width: "70%"}}>
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
