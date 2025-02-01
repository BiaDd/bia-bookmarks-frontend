import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: any) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <p>Loading...</p>
    }

    return (
        <>{session ? <>{children}</> : <Navigate to="/signup" />}</>
    )
}

export default PrivateRoute