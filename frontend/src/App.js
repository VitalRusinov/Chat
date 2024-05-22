import Login from './components/Login';
import SignUp from './components/SignUp.jsx';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import AuthButton from './components/AuthButton';

import AuthProvider from './context/AuthProvider.js';
import authContext from './context/AuthContext.js';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useContext(authContext);

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};
// проблема с расположением бренда, кнопки Log In, и положением формы для авторизации(из-за body)
function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar bg="white" expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className='container'>
              <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
              <AuthButton />
            </div>
          </Navbar>
          <Routes>
            <Route 
              path="/"
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
