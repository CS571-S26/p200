import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

function NavBar({ compareCount, favCount }) {
  const location = useLocation()
  const active = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)

  return (
    <Navbar expand="lg" className="site-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          🏠 Rate My Dorm
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" role="navigation" aria-label="Main navigation">
            <Nav.Link as={Link} to="/" className={active('/') ? 'nav-link-active' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dorms" className={active('/dorms') ? 'nav-link-active' : ''}>
              Browse Dorms
            </Nav.Link>
            <Nav.Link as={Link} to="/match" className={active('/match') ? 'nav-link-active' : ''}>
                      Match Quiz
            </Nav.Link>
            <Nav.Link as={Link} to="/map" className={active('/map') ? 'nav-link-active' : ''}>
              Map
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className={active('/favorites') ? 'nav-link-active' : ''}>
              Saved {favCount > 0 && <Badge className="nav-badge">{favCount}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/compare" className={active('/compare') ? 'nav-link-active' : ''}>
              Compare {compareCount > 0 && <Badge className="nav-badge">{compareCount}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={active('/about') ? 'nav-link-active' : ''}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar