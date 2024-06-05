import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store';
import AppInnerForRedux from './AppInnerForRedux';

import { Text, TextInput } from 'react-native';

//안드로이드 Text 확대 방지 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='dark' />
        <AppInnerForRedux />
      </QueryClientProvider>
    </Provider>
  );
}

