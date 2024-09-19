import { Outlet, Navigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';


function ProtectedRoute() {
    let { user } = useAuthContext();
    
    return(
        !user ? <Navigate to="/login" /> : <Outlet/>
    );
}

export default ProtectedRoute;