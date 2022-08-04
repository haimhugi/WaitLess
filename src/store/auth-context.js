import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    isAdmin: false,
    login: () => { },
    logout: () => { }
});

export default AuthContext;