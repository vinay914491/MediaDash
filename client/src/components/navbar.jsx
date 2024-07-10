import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useNavigate} from 'react-router-dom';


function Navb() {
  return (
    <>
      
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Media Dash</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="./dashboard">Home</Nav.Link>
            <Nav.Link href="./">Signout</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
    </>
  );
}

export default Navb;