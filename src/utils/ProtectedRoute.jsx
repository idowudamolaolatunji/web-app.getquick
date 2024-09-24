import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import DashboardBase from '../ui/DashboardBase';


function ProtectedRoute({ children }) {
    // let { user } = useAuthContext();
    const user = 'Idowu'

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <DashboardBase>
            <Outlet />
        </DashboardBase>
    );
}

export default ProtectedRoute;