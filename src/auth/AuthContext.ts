/* eslint-disable @typescript-eslint/camelcase */
import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import Oidc, { UserManager, User } from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

type ClaimType = { [key: string]: string | null };

type ClaimsParameter = {
   id_token?: ClaimType | undefined;
   userinfo?: ClaimType | undefined;
};

/**
 * If there is a valid ID_TOKEN in sesionStorage, get it and parse it.
 *
 * @returns {User | null} A new User if the stored token exists, or null.
 */
const loadUserFromStorage = (): User | null => {
   const oidcStorage = sessionStorage.getItem(
      `oidc.user:${process.env.REACT_APP_AUTHORITY}:${process.env.REACT_APP_CLIENT_ID}`,
   );
   console.log('Got the following from storage:', oidcStorage);
   if (typeof oidcStorage === 'string') {
      return new User(JSON.parse(oidcStorage));
   }
   return null;
};

// These are not observable, and set at compile time
const authority = process.env.REACT_APP_AUTHORITY; //'http://localhost:3082';
const client_id = process.env.REACT_APP_CLIENT_ID; //'test_app';
const redirect_uri = process.env.REACT_APP_REDIRECT_URI; //'http://localhost:3000/login/response';
const post_logout_redirect_uri = process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI;
const response_type = 'code';
const scope = 'openid profile roles address';
const loadUserInfo = true;
const revokeAccessTokenOnSignout = true;
const useClaimsParam = true;
const claimsParameter: ClaimsParameter = {
   userinfo: {
      given_name: null,
      family_name: null,
      email: null,
      roles: null,
   },
   id_token: {
      given_name: null,
      family_name: null,
      email: null,
   },
};

/**
 * Establishes and manages access and id tokens delivered from the OIDC OP
 */
export class AuthContext {
   manager: UserManager;
   /**
    * Observable state
    */
   user: User | null = null;
   error: any | null = null;

   constructor() {
      makeObservable(this, {
         user: observable,
         error: observable,
         isLoggedIn: computed,
         login: action,
         completeLogin: action,
         logout: action,
         completeLogout: action,
         _handleError: action,
         _setUser: action,
      });

      this.manager = new UserManager(this.makeConfig());
      this.manager.events.addUserLoaded((user: User): void => {
         console.log('AuthProvider - loaded user from event');
         runInAction(() => {
            this._setUser(user ?? null);
         });
      });
      this.manager.events.addUserUnloaded((): void => {
         console.log('AuthProvider - unloaded user from event');
      });
      // Clear out any leftover or stale state
      this.manager.clearStaleState();

      // Because the UserManager.getUser function is async, we need to pull
      // the stored user if there is one. We can then do authentication checks.
      this._setUser(loadUserFromStorage());
   }

   /**
    *  Internal function to set the observable user object.
    * @param { User } user
    */
   _setUser = (user: User | null): void => {
      this.user = user;
   };

   /**
    * Internal helper function.
    * @param error
    */
   _handleError = (error: any): void => {
      this.error = error;
      console.error('Problem with authentication endpoint: ', error);
   };

   /**
    * Create the client config
    * */
   makeConfig(): Oidc.UserManagerSettings {
      //! Make sure the env variables are set.
      if (authority === undefined) throw new Error('REACT_APP_AUTHORITY must be defined. Missing .env file?');
      if (client_id === undefined) throw new Error('REACT_APP_CLIENT_ID must be defined. Missing .env file?');
      if (redirect_uri === undefined) throw new Error('REACT_APP_REDIRECT_URI must be defined. Missing .env file?');
      if (post_logout_redirect_uri === undefined)
         throw new Error('REACT_APP_POST_LOGOUT_REDIRECT_URI must be defined. Missing .env file?');

      const config = {
         authority,
         client_id,
         redirect_uri,
         post_logout_redirect_uri,
         response_type,
         scope,
         loadUserInfo,
         revokeAccessTokenOnSignout,
      };
      if (useClaimsParam) {
         const extraQueryParams = { claims: JSON.stringify(claimsParameter) };
         return { ...config, extraQueryParams };
      }
      return config;
   }

   /**
    * Returns true if there is a valid access_token that has not expired
    */
   get isLoggedIn(): boolean {
      return (this.user !== null && !this?.user?.expired) ?? false;
   }

   /**
    * Returns the current access_token, if there is one
    */
   get accessToken(): string | null {
      return this.user?.access_token ?? null;
   }

   /**
    * Begins the async login process by sending the user to the OIDC Provider for
    * authentication.  The OIDC Provider will redirect the user back to the
    * REACT_APP_REDIRECT_URI defined above.  The redirect_uri also needs to be
    * set in the OP's client settings.
    */
   login = (): Promise<void> => {
      return this.manager.signinRedirect().catch((error) => {
         this._handleError(error);
      });
   };

   /**
    * This is called by the page identified by the REACT_APP_REDIRECT_URI above.
    * Once the OP completes authentication, the user is redirected back to this
    * page.  The page then calls completeLogin with the provided url params.
    * @param {string} url The query params provided on the URL
    */
   completeLogin = async (url?: string): Promise<User | void> => {
      try {
         const user = await this.manager.signinRedirectCallback(url);
         console.log('Setting the user from completeLogin:', user);
         this.user = user;
         return user;
      } catch (error) {
         this._handleError(error);
      }
   };

   /**
    * Begins the async logout process by ending the user to the OIDC Provider for
    * session termination.  The OIDC Provider will redirect the user back to the
    * REACT_APP_POST_LOGOUT_REDIRECT_URI defined above.  The redirect_uri also
    * needs to be set in the OP's client settings.
    */
   logout = async (): Promise<void> => {
      await this.manager!.removeUser();
      this.user = null;
      //return this.manager.signoutRedirect().catch((error) => this._handleError(error));
   };

   /**
    * This is called by the page identified by the REACT_APP_POST_LOGOUT_REDIRECT_URI
    * above. Once the OP completes logout, the user is redirected back to this
    * page.  The page then calls completeLogout.
    * @param {string} url The query params provided on the URL
    */
   completeLogout = async (): Promise<void> => {
      try {
         await this.manager.signoutRedirectCallback();
         this.manager.removeUser();
         this.user = null;
      } catch (error) {
         this._handleError(error);
      }
   };
}




