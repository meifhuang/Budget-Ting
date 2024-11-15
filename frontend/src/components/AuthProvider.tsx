import { useContext, createContext, useState, useEffect} from 'react';
import { User } from "../types/user";
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';



type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try { 
                console.log("CURRENT USER", currentUser);
                const userData = await axios.get(`http://localhost:8080/auth/signin/${currentUser.uid}`);
                console.log(userData.data);
                setUser(userData.data);
                }
                catch (err) {
                    console.error(err);
                    setUser(null); 
                }
            }
            else {
                setUser(null); 
            }
        })
        return () => unsubscribe();
    },[])

    return (
        <AuthContext.Provider value={{user, setUser}}> 
            {children} 
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
   const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("Error")
    }
    return context
}