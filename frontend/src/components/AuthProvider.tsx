import { useContext, createContext, useState, useEffect} from 'react';
import { User } from "../types/user";
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";


type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

async function fetchUserData (authId: string): Promise<User | null>  {
    const response = await fetch(`/api/users/${authId}`)
    if (response) {
        return await response.json()
    }
    return null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await fetchUserData(currentUser.uid); 
                console.log(userData)
                setUser(userData);
            }
            else {
                setUser(null); 
            }
        })
        return () => unsubscribe()
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