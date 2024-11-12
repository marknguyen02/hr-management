import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './notification.css'

function Notification() {
    return (
        <div id='notification-container'>
            <FontAwesomeIcon icon={faBell}/>
        </div>
    );
}

export default Notification;