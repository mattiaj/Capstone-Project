import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function DeleteProfile({id}) {

    const navigate = useNavigate();

    const deleteProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/auth/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });

            if(response.ok) {
                alert("Profilo eliminato!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/");

            } else {
                alert("Errore nel cancellare il profilo!");
            };
        } catch (err) {
            console.error(err);
        };
    };

  return (
    <>
        <Button variant='danger' onClick={() => deleteProfile()}>Elimina Profilo</Button>
    </>
  )
}
