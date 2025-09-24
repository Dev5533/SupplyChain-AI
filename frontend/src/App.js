import React from 'react';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SavedNews from './pages/SavedNews';
import Analytics from './pages/Analytics';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { isLoggedIn, removeToken } from './utils/auth';


const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">SupplyChain AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Live News</Nav.Link>
            <Nav.Link as={Link} to="/saved" active={location.pathname === '/saved'}>Saved News</Nav.Link>
            <Nav.Link as={Link} to="/analytics" active={location.pathname === '/analytics'}>Analytics</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!isLoggedIn() ? (
              <>
                <Nav.Link as={Link} to="/login" active={location.pathname === '/login'}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" active={location.pathname === '/register'}>Register</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => { removeToken(); window.location.href = '/'; }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// function App() {
//   return (
//     <Router>
//       <NavigationBar />
//       <Container className="mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/saved" element={<SavedNews />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// }

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <PrivateRoute>
                <SavedNews />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
