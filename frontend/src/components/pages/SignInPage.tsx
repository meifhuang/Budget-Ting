import { Link } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage.tsx'; 
import { useState } from "react"; 
import { InputField } from '../InputField.tsx';
import { auth } from "../../config/firebaseConfig.ts";
import { signInWithEmailAndPassword } from 'firebase/auth'
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthProvider.tsx";



export const SignInPage = () => {

    type SignInValues = {
        email: string,
        password: string
    }

    const signInValues: SignInValues = {
        email: '',
        password: ''
    }

    const navigate = useNavigate(); 
    const [errMessage, setErrMessage] = useState<string>('')
    const [signInForm , setSignInForm] = useState<SignInValues>(signInValues); 
    const {user, setUser} = useAuth(); 
 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInForm({
            ...signInForm, 
            [name]: value
        })
    } 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const userData = await signInWithEmailAndPassword(auth, signInForm.email, signInForm.password)
            const userInfo = { 
                authId: userData.user.uid,
                email: userData.user.email,
            }
            setUser(userInfo);
            navigate('/dashboard');
            
        }
        catch (err: any) {
            console.error("Error signing in", err);
            setErrMessage("Incorrect email/password. Please try again.");
        }

    }
    
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
                Sign in to your account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
               
                <InputField 
                        label="Email Address"
                        name="email"
                        type="email"
                        value={signInForm.email}
                        onChange={handleInputChange}
                    /> 
                <InputField 
                    label="Password"
                    name="password"
                    type="password"
                    value={signInForm.password}
                    onChange={handleInputChange}
                /> 

                <ErrorMessage message={errMessage}/>

                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    
                >
                    Sign in
                </button>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign up
                </Link> 
            </p>
            </div>
      </div>
    </>
    )
}