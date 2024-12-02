import { useAuth } from "../AuthProvider";
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from "../Nav";


export const Dashboard = () => {

    const { user } = useAuth(); 
    const navigate = useNavigate(); 

    return (
        <div className="block">
            <Nav/> 
                <header className="bg-white shadow">
                <div className="flex justify-between mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    
                </div>
                </header>
                <main>
                </main>
        </div>
    )
}