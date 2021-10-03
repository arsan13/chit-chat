import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({route}) => ({
            title: route.params.userName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
