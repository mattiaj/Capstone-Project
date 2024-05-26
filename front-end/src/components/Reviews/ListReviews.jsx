import React from 'react';

export default function ListReviews({reviews}) {

    console.log(reviews)

  return (
    <>
        <ul className='list-unstyled mt-4 border border-2 rounded px-3'>
            <li>Recensione di: <strong>{reviews.owner.username}</strong></li>
            <li className='border-bottom'>{reviews.review}</li>
        </ul>
    </>
  )
}
