import { createContext } from 'react';

const LoggedInContext = createContext({
    isLoggedIn: false
});

export default LoggedInContext;