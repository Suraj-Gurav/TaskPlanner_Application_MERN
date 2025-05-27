import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Tasks from './Components/Tasks';
import Header from './Components/Header';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/tasks' && <Header />}
      <div className='mainContainer'>
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/registration' />
          <Route element={<Tasks />} path='/tasks' />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
