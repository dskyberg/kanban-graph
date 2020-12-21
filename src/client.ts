import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import isEmpty from './util/isEmpty';
import { AuthContext } from './auth/AuthContext';

const httpLink = createHttpLink({
   uri: process.env.REACT_APP_GRAPHQL_URI,
});

export const useApolloClient = (auth: AuthContext | undefined): ApolloClient<NormalizedCacheObject> => {
   const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
   //console.log('Apollo Client authorization:', auth?.user?.access_token);
      let authHeader = {};
      if (!isEmpty(auth?.user?.access_token)) {
         authHeader = { authrization: `Bearer ${auth?.user?.access_token}` };
      }
      // return the headers to the context so httpLink can read them
      return {
         headers: {
            ...headers,
            ...authHeader,
         },
      };
   });

   return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
   });
}
