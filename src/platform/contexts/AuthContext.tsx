import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
    currentUser: User | null;
    isGuest: boolean;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    loginAsGuest: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(() => sessionStorage.getItem('isGuest') === 'true');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                // If real user logs in, remove guest status
                setIsGuest(false);
                sessionStorage.removeItem('isGuest');
            }
        });

        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const loginAsGuest = () => {
        setIsGuest(true);
        sessionStorage.setItem('isGuest', 'true');
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            setIsGuest(false);
            sessionStorage.removeItem('isGuest');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const value = {
        currentUser,
        isGuest,
        loading,
        signInWithGoogle,
        loginAsGuest,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">Initializing OS...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
