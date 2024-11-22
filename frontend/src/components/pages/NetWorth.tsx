import { useAuth } from "../AuthProvider";
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from "../Nav";


export const NetWorth = () => {

    const { user } = useAuth(); 
    const navigate = useNavigate(); 

    return (
        <div className="block">
            <Nav/> 
                <header className="bg-white shadow">
                <div className="flex justify-between mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Net Worth</h1>
                    
                </div>
                </header>
                <main>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 items-end justify-end">
                    <button className="rounded-md text-s font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 outline-none">
                            + Add Net Worth
                    </button>
                </div>
                </main>
        </div>
    )
}