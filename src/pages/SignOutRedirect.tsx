import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const SignOutRedirect: React.FC = () => {
   const history = useHistory();
   const authStore = useAuth();

   React.useEffect(() => {
      authStore.completeLogout();
      history.push('/');
   });

   return null;
};
export default SignOutRedirect;
