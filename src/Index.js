import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import MessageStack from './navigation/MessageStack';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const setLogin = (val = null) => {
    setEmail(val);
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack setLog={setLogin} />
      ) : (
        <MessageStack setLog={setLogin} emailId={email} />
      )}
    </NavigationContainer>
  );
};

export default Index;
