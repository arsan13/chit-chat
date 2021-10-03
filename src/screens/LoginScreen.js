import React from 'react';
import {View, Text, Button} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Messages');
        }}
      />
    </View>
  );
};

export default LoginScreen;
