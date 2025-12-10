import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Path to the file above

/**
 * Custom hook to consume the authentication context.
 * Provides easy access to user, loading state, login, and logout functions.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

