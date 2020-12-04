import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { authStore } from './auth/AuthProvider';
import isEmpty from './util/isEmpty';

const httpLink = createHttpLink({
   uri: 'http://localhost:9000/graphql',
});

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   console.log('Apollo Client authorization:', authStore?.user?.access_token);
   let authToken = {};
   if (!isEmpty(authStore?.user?.access_token)) {
      authToken = { authrization: `Bearer ${authStore?.user?.access_token}` };
   }
   // return the headers to the context so httpLink can read them
   return {
      headers: {
         ...headers,
         ...authToken,
      },
   };
});

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
   connectToDevTools: true,
});
export default client;
