import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './message.css'

function Message() {
    return (
        <div id='message-icon'>
            <FontAwesomeIcon icon={faComment}/>
        </div>
    );
}

export default Message;