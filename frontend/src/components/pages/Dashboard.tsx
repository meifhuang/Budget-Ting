import { useAuth } from "../AuthProvider";

export const Dashboard = () => {

    const { user } = useAuth(); 

    return (
        <>
        <h1> Welcome {user?.first_name} {user?.last_name} </h1>
        </>
    )
}