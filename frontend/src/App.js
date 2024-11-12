import { Route, Routes} from 'react-router-dom'
import Login from './pages/auth/login.js';
import Layout from './components/layout.js';
import Profile from './pages/home/profile.js';
import Calendar from './pages/home/calendar.js';
import Payroll from './pages/home/payroll.js';
import Request from './pages/home/request.js';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/salary' element={<Payroll />} />
        <Route path='/request' element={<Request />} />
      </Route>
    </Routes>
  );
}

export default App;