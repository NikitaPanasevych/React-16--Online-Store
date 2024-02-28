import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ContextConsumer from './Context.consumer';

const client = new ApolloClient({
	url: 'http://localhost:4000',
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<ContextConsumer />,
	</ApolloProvider>,
	document.getElementById('root')
);
