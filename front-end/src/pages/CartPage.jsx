import React, { useContext } from 'react';
import Cart from '../components/Cart/Cart';
import { themeContext } from '../Context/ThemeContextProvider';

export default function CartPage() {

  const {theme} = useContext(themeContext);

  return (
    <>
      <main className={theme === "dark" ? "bg-dark" : ""} style={{height: "100vh"}}>
        <Cart />
      </main>
    </>
  )
}
