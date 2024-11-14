import { Route, Routes} from 'react-router-dom'
import Login from './pages/auth/login.js';
import Layout from './components/layout.js';
import Profile from './pages/profile.js';
import Calendar from './pages/calendar.js';
import Payroll from './pages/payroll.js';
import Request from './pages/request.js';


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