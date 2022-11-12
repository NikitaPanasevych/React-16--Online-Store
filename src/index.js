import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  url: 'http://localhost:4000',
  cache: new InMemoryCache(),
});


ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);
