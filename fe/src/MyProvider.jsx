import { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  );

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser
  };

  return (
    <MyContext.Provider value={state}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
