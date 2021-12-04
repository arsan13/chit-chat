import React from 'react';
import {LogBox} from 'react-native';
import Index from './src/Index';

LogBox.ignoreAllLogs();

const App = () => {
  return <Index />;
};

export default App;
