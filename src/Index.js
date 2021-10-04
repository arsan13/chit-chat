import React, {useState} from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Messages"
              component={MessagesScreen}
              options={{
                headerLeft: null,
                headerRight: () => (
                  <Button
                    title="logout"
                    onPress={() => {
                      setIsLoggedIn(false);
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={({route}) => ({
                title: route.params.userName,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
