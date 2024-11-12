import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InputField } from '../InputField';
import axios from "axios";
import { ErrorMessage } from '../ErrorMessage'; 


export const SignUpPage = () => {

    const backend_url = import.meta.env.VITE_BASE_URL;   
    const [errMessage, setErrMessage] = useState<string>('')

    type SignUpValues = {
        email: string,
        first_name: string,
        last_name: string
        password: string
    }

    const signUpValues: SignUpValues = {
        email: '',
        password: '',
        first_name: '',
        last_name: '', 
    };

    const [signUpForm , setSignUpForm] = useState<SignUpValues>(signUpValues); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm({
            ...signUpForm, 
            [name]: value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: `${backend_url}/auth/signup`,
                data: {
                    email: signUpForm.email,
                    password: signUpForm.password
                }

            })
        if (response) {
            console.log(response)
        }
        else {
            throw Error("No response")
        }
        }
        catch (err: any ) {
            console.error(err);
            setErrMessage(err.response.data.error)
        }
    }

   
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
                Sign up for an account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                
                
                <InputField 
                    label="First Name"
                    name="first_name"
                    type="first_name"
                    value={signUpForm.first_name}
                    onChange={handleInputChange}
                /> 
                <InputField 
                    label="Last Name"
                    name="last_name"
                    type="last_name"
                    value={signUpForm.last_name}
                    onChange={handleInputChange}
                /> 
                <InputField 
                        label="Email Address"
                        name="email"
                        type="email"
                        value={signUpForm.email}
                        onChange={handleInputChange}
                    /> 
                <InputField 
                    label="Password"
                    name="password"
                    type="password"
                    value={signUpForm.password}
                    onChange={handleInputChange}
                /> 
                <ErrorMessage message={errMessage}/>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign up
                </button>
                </div>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{' '}
                <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
                </Link> 
            </p>
            </form>
            </div>
      </div>
    </>
    )
}

export default SignUpPage;