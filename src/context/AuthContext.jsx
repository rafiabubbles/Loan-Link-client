import React, { createContext, useState, useContext, useEffect } from 'react';
// You'll need to install firebase if you're using a real authentication system
// import { auth } from '../firebase/firebaseConfig'; 
// import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This useEffect simulates the real-time listener for authentication state
    // In a real application, you would use a service like Firebase's onAuthStateChanged
    useEffect(() => {
        // Simulating checking user session from local storage or token validation
        const storedUser = localStorage.getItem('quick_loans_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);

        // Cleanup function for the effect (important for real auth listeners)
        return () => { };
    }, []);

    // Simulated Login function
    const login = (userData) => {
        // In a real app, this would involve API calls or Firebase sign-in
        const dummyUser = {
            uid: '12345',
            displayName: userData.email.split('@')[0] || 'Demo User',
            email: userData.email,
            photoURL: 'https://via.placeholder.com/40'
        };
        setUser(dummyUser);
        localStorage.setItem('quick_loans_user', JSON.stringify(dummyUser));
        console.log("User Logged In:", dummyUser.displayName);
    };

    // Simulated Logout function
    const logout = () => {
        // In a real app, this would involve API calls or Firebase sign-out
        setUser(null);
        localStorage.removeItem('quick_loans_user');
        console.log("User Logged Out");
    };

    // The value that will be exposed to consumers
    const value = {
        user,
        loading,
        login, // Include login for your login page
        logout,
        // You can add more auth-related functions here (e.g., register, resetPassword)
    };

    // Show a loading screen while checking auth state
    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Export the Context
export default AuthContext;