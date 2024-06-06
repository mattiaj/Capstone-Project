import React, { useContext, useEffect, useState } from 'react';
import PutReview from './PutReview';
import { Button } from 'react-bootstrap';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { themeContext } from '../../Context/ThemeContextProvider';

export default function ListReviews({reviews, itemId, getReviews}) {

    const {theme} = useContext(themeContext);

    const [show, setShow] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    
    const [button, setButton] = useState(false);

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

    const showButton = () => {
      if(user == null) {
        setButton(false);
        return;
      }
      if(user._id !== reviews.owner.id) {
        setButton(false);
      } else {
        setButton(true)
      };
    };

    useEffect(() => {
      showButton();
    },[]);

  return (
    <>
      <li>Recensione di: <strong>{reviews.owner.username}</strong></li>
      <li className='border-bottom d-flex justify-content-between'>
        {reviews.review}
        {button &&
        <div>
          <Button variant='dark' className='me-2' onClick={() => setShow(true)}><FaPencilAlt /></Button>
          <Button variant={theme === "light" ? 'danger' : "outline-danger"} onClick={() => deleteReview(reviews._id)}><FaTrashCan /></Button>
        </div>
        }
      </li>
      <li className='d-flex justify-content-end py-2'>
      </li> 
        <PutReview review={reviews} itemId={itemId} getReviews={getReviews} show={show} setShow={setShow} />
    </>
  )
}
