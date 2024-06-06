import React, { useContext } from 'react';
import SingleItem from '../components/Item/SingleItem/SingleItem';
import { themeContext } from '../Context/ThemeContextProvider';

export default function ItemPage() {

  const {theme} = useContext(themeContext);

  return (
    <>
      <main className={theme === "dark" ? "bg-dark" : ""}>
        <SingleItem />
      </main>
    </>
  )
}
