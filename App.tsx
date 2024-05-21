import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from "styled-components/native";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import store from './store';
import AppInnerForRedux from './AppInnerForRedux';

import { Text, TextInput } from 'react-native';

//안드로이드 Text 확대 방지 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;



const ViewBox = styled.View`
  flex:1; background-color: #FFFFFF; align-items: center; justify-content: center;
`

const TextBox = styled.Text`

`

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

