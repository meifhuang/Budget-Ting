import { Link } from 'react-router-dom';

export const Homepage: React.FC = () => {
    return (
        <div className="h-screen outline-double flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold">
                Welcome
            </h1>
            <div className="flex p-4">
                <Link to="/signin" className='outline-1 outline-white p-2'> Sign in </Link>
                <Link to="/signup" className='outline-1 outline-white p-2'> Sign up </Link>
            </div>
        </div>
    )
}
