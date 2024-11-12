import './topbar.css';
import {useLocation} from 'react-router-dom';
import Notification from './notification';
import Message from './message';
import Account from './account';

function Topbar() {
    const location = useLocation();
    const lastSegment = location.pathname.split('/').pop();
    let pageName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    if (pageName === "") {
        pageName = "Home";
    }
    return (
        <div className="topbar-container">
            <p id='page-name'> {pageName}</p>
            <div>
                <Message/>
                <Notification/>
                <Account/>
            </div>
        </div>
    );
}

export default Topbar;