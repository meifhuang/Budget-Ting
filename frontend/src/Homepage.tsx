import { Link } from 'react-router-dom';

export const Homepage: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Link to="/signin"> Sign in </Link>
            <Link to="/signup"> Sign up</Link>
        </>
    )
}
