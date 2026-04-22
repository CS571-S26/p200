import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
 
function NavBar() {
  const location = useLocation()
 
  return (
    <Navbar expand="lg" className="site-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          🏠 Rate My Dorm
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link-active' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dorms" className={location.pathname.startsWith('/dorms') ? 'nav-link-active' : ''}>
              Browse Dorms
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === '/about' ? 'nav-link-active' : ''}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
 
export default NavBar
 