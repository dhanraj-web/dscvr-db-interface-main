import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    localStorage.removeItem('accessToken');
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem('accessToken');
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});

  let data = {
    userLoggedIn: isLogin,
    userData,
    userLogIn: (type, data, userDeatils) => {
      if (type) {
        setSession(data);
        setIsLogin(type);
        setUserData(userDeatils);
      } else {
        setSession(data);
        setIsLogin(type);
      }
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
