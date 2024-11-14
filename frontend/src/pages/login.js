import '../styles/pages/login.css'
import { login } from '../api.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import laptopIllustration from '../assets/images/website-overview-laptop.svg';
import chplay from '../assets/images/chplay.svg';
import appstore from '../assets/images/appstore.svg';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const data = await login(username, password);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không chính xác');
        }
    };


    const [activeSection, setActiveSection] = useState('Introduction')

    const renderSection = () => {
        switch (activeSection) {
            case "Introduction":
                return <Introduction />;
            case "AboutUs":
                return <AboutUs />;
            case "Contact":
                return <Contact />;
            default:
                return <Introduction />;
        }
    }
    
    

    return (
        <div id='login-page'>
            <div id='login-panel'>
                <h1 id='website-name'>OfficeLite</h1>
                <input id='username-input-box' onChange={e => setUsername(e.target.value)} placeholder='Tên đăng nhập'></input>
                <input id='password-input-box' onChange={e => setPassword(e.target.value)} type='password' placeholder='Mật khẩu'></input>
                <div id='password-error-message'>
                    {error && <p id='error-message'>{error}</p>}
                    <p id='forgot-password'>Quên mật khẩu?</p>
                </div>

                <button id='signin-button' onClick={handleSignIn}>Đăng nhập</button>
                <div id="horizontal-line"></div>
                <p>Cài đặt ứng dụng trên điện thoại</p>
                <div id='mobile-store-logo'>
                    <a target='_blank' rel="noopener noreferrer" href='https://play.google.com/store/apps'>
                        <img src={chplay} alt='chplay'/>
                    </a>
                    <a target='_blank' rel="noopener noreferrer" href='https://www.apple.com/app-store/'>
                        <img src={appstore} alt='appstore'/>
                    </a>
                </div>
            </div>

            <div id='content-panel'>
                <div id='section-menu'>
                    <p onClick={() => setActiveSection('Introduction')}>Tổng quan</p>
                    <p onClick={() => setActiveSection('AboutUs')}>Nhà phát triển</p>
                    <p onClick={() => setActiveSection('Contact')}>Liên hệ</p>
                </div>

                <div id="section-content">
                    {renderSection(activeSection)}
                    <img src={laptopIllustration} alt='laptop illustration' id="login-laptop-svg"/>
                </div>
            </div>
        </div>        
    );
}

function Introduction() {
    return (
        <p id='introduction-content'>OfficeLite là phần mềm quản lý nhân sự hiệu quả dành cho các doanh nghiệp được phát triển bởi sinh viên Trường Đại Học Khoa Học Nhiên - Đại Học Quốc Gia Hà Nội.</p>
    );
}

function AboutUs() {
    return (
        <div id='aboutus-content'>
            <p>
            Chúng tôi là những sinh viên trường Đại học Khoa học Tự nhiên - Đại học Quốc gia Hà Nội, là những người phát triển nên trang web này. Với kiến thức tích lũy được từ quá trình học tập và niềm đam mê với công nghệ, chúng tôi hy vọng trang web sẽ mang đến những giá trị hữu ích cho người dùng.
            </p>
            <p>
            Dù còn nhiều điều cần học hỏi và cải thiện, chúng tôi luôn nỗ lực hết mình để tạo ra sản phẩm tốt nhất có thể. Đây là một dự án nhỏ mà chúng tôi tâm huyết và hy vọng sẽ là bước đệm để tiếp tục phát triển trong tương lai.
            </p>
        </div>
    );}

function Contact() {
    return (
        <div id='contact-content'>
            <p>Mọi yêu cầu hỗ trợ hoặc hợp tác công việc xin vui lòng liên hệ:</p>
            <div>
                <FontAwesomeIcon icon={faPhone} />
                <p>+84356788002</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>dungnguyen.workspace@gmail.com</p>
            </div>
        </div>
        
    );}

export default Login;