import './sidebar.css'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faUser, faCalendar, faSackDollar} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return (
        <div className='sidebar-container'>
            <nav>
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    to="/">
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faHome}/>
                        <span className='icon-label'> Home</span>
                    </div>
                </NavLink>

                <NavLink 
                    exact="true"
                    activeclassname="active"
                    to="/profile">
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faUser}/>
                        <span className='icon-label'> Profile</span>
                    </div>
                </NavLink>

                <NavLink 
                    exact="true"
                    activeclassname="active"
                    to="/calendar">
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <span className='icon-label'> Calendar</span>
                    </div>
                </NavLink>

                <NavLink 
                    exact="true"
                    activeclassname="active"
                    to="/salary">
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faSackDollar}/>
                        <span className='icon-label'> Payroll</span>
                    </div>
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;