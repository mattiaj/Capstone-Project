import React, { useContext } from 'react';
import AllItems from '../components/Item/AllItems';
import { themeContext } from '../Context/ThemeContextProvider';

export default function HomePage() {

  const {theme} = useContext(themeContext);

  return (
    <>
      <main className={theme === "dark" ? "bg-dark" : ""}>
        <AllItems />
      </main>
    </>
  )
}
