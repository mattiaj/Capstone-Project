import React from 'react';
import PutReview from './PutReview';
import { Button } from 'react-bootstrap';

export default function ListReviews({reviews, itemId, getReviews}) {

    console.log(reviews)

    const deleteReview = async (reviewId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/item/${itemId}/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "Application/json"
          }
        });

        if(response.ok) {
          getReviews();
          alert("Recensione eliminata!")
        } else {
          alert("Si è verificato un errore!")
        }
      } catch (err) {
        console.error(err);
      };
    };

  return (
    <>
      <li>Recensione di: <strong>{reviews.owner.username}</strong></li>
      <li className='border-bottom'>{reviews.review}</li>
      <li>
        <PutReview review={reviews} itemId={itemId} getReviews={getReviews} />
        <Button variant='danger' onClick={() => deleteReview(reviews._id)}>Elimina</Button>
      </li> 
    </>
  )
}
