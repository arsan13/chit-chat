import React from 'react';
import {Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const MessageStack = ({navigation, setLog, emailId}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={({navigation}) => (
          <MessagesScreen navigation={navigation} emailId={emailId} />
        )}
        options={{
          headerRight: () => <Button title="logout" onPress={setLog} />,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={({navigation, route}) => (
          <ChatScreen navigation={navigation} route={route} emailId={emailId} />
        )}
        options={({route}) => ({
          title: route.params.chatId.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
