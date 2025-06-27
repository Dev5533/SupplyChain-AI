import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SavedNews from './pages/SavedNews';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Analytics from './pages/Analytics'; 
import { isLoggedIn, removeToken } from './utils/auth';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">SupplyChain AI</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Live News</Nav.Link>
              <Nav.Link as={Link} to="/saved">Saved News</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {!isLoggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
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

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedNews />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
