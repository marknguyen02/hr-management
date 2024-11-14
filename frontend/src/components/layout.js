import { Outlet } from 'react-router-dom';
import '../styles/components/layout.css'
import Sidebar from './sidebar/sidebar';
import Topbar from './topbar/topbar'



function Layout() {
    return (
        <div>
            <Topbar />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Layout;