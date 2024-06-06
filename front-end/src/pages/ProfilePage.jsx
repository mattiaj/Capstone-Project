import React, { useContext } from 'react';
import Profile from '../components/Profile/Profile';
import { themeContext } from '../Context/ThemeContextProvider';

export default function ProfilePage() {

  const {theme} = useContext(themeContext);

  return (
    <>
      <main className={theme === "dark" ? "bg-dark" : ""}>
        <Profile />
      </main>
    </>
  )
}
