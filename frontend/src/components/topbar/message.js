import "../../styles/components/topbar/message.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function Message() {
    return (
        <div id='message-icon'>
            <FontAwesomeIcon icon={faComment}/>
        </div>
    );
}

export default Message;