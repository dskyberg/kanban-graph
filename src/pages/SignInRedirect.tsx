import React from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import isEmpty from '../util/isEmpty';


const SignInRedirect: React.FC = () => {
   const location = useLocation();
   const history = useHistory();
   const authStore = useAuth();
   const [done, setDone] = React.useState(false);

   React.useEffect( () => {
      console.log('SignInRedirect location:', location);
      if (!isEmpty(location.search)) {
         const parsed: object = queryString.parse(location.search);
         if ('code' in parsed) {
            authStore.completeLogin(`${location.pathname}${location.search}`)
         } else if ('error' in parsed) {
            // Figure out where to put the errors
            console.log('Login returned an error:', parsed);
         }
      }
      if (!isEmpty(location.hash)) {
         // Looks like an error occurred
         const parsed: object = queryString.parse(location.hash);
         console.log('Login returned an unexpected error:', parsed);
      }
      history.push('/');
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   return null;
};
export default SignInRedirect;
