import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface PrivateRouteProps {
   component: React.FC;
   path: string;
   exact: boolean;
}
const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
   const authStore = useAuth();
   const isLoggedIn = authStore.isLoggedIn;
   return isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
};
export default PrivateRoute;
