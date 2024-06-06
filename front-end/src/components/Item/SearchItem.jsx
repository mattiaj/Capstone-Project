import React, { useContext } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { themeContext } from '../../Context/ThemeContextProvider';

export default function SearchItem({input, setInput}) {

  const {theme} = useContext(themeContext)

  return (
    <>
        <InputGroup className='w-50'>
            <Form.Control type='text'
            className={theme === "light" ? 'border border-2 border-black rounded-pill' : "border border-2 rounded-pill"}
            placeholder='Cerca...'
            aria-describedby='basic-addon2'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
            {/* <Button id='basic-addon2' onClick={() => handleSearch()}>Cerca</Button> */}
        </InputGroup>
    </>
  )
}
