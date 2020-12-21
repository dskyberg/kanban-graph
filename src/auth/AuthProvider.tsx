/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { AuthContext } from './AuthContext';

const _hasCodeInUrl = (location: Location): boolean => {
   const searchParams = new URLSearchParams(location.search);
   const hashParams = new URLSearchParams(location.hash.replace('#', '?'));

   return Boolean(
      searchParams.get('code') ||
         searchParams.get('id_token') ||
         searchParams.get('session_state') ||
         hashParams.get('code') ||
         hashParams.get('id_token') ||
         hashParams.get('session_state'),
   );
};
interface AuthProviderProps {
   location?: Location;
}
const authContext = new AuthContext();

/**
 * Standard pattern for establishing a React context.  This provides the HOC
 * for class components and the hook for function components.  Since this is a
 * single instance store, it is created once, and then provided to both the
 * createContext, for the hook and to the Context.Provider for the HOC.
 */
export const context = React.createContext<AuthContext | null>(null);
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, location = window.location }) => {
   React.useEffect(() => {
      console.log('AuthProvider is loading');
      const getUser = async (): Promise<void> => {
         console.log('AuthProvider: Testing url:', location);
         if (_hasCodeInUrl(location)) {
            console.log('AuthProvider: This location has codes');
            await authContext.completeLogin();
            window.location.assign('http://localhost:3000/');
         }
      };
      getUser();
   }, [location]);
   return <context.Provider value={authContext}>{children}</context.Provider>;
};

export const useAuth = (): AuthContext => {
   const cxt = React.useContext(context);
   if (cxt === null) {
      throw new Error('useAuth must be used within AuthProvider');
   }
   return cxt;
};

export interface AuthContextProps {
   auth: AuthContext;
}

export function withAuth<P extends AuthContextProps>(
   Component: React.ComponentType<P>,
): React.ComponentType<Omit<P, keyof AuthContextProps>> {
   const displayName = `withAuth(${Component.displayName || Component.name})`;
   const C: React.FC<Omit<P, keyof AuthContextProps>> = (props) => {
      const auth = useAuth();
      return <Component {...(props as P)} {...auth} />;
   };

   C.displayName = displayName;

   return C;
}
