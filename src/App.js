import logo from './logo.svg';
import './App.css';
import { LoginSignup } from './Components/Assets/LoginSignup/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin } from './Components/Assets/AdminDashboard/Admin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginSignup/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
