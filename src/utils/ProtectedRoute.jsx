import { Outlet, Navigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';


function ProtectedRoute({ children }) {
    // let { user } = useAuthContext();
    const user = 'Idowu'
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children ? children : <Outlet />;
    
}

export default ProtectedRoute;