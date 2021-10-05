import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import MessageStack from './navigation/MessageStack';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack setLog={setLogin} />
      ) : (
        <MessageStack setLog={setLogin} />
      )}
    </NavigationContainer>
  );
};

export default Index;
