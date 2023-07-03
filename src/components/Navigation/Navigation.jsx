import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../images/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {RiAccountCircleFill} from 'react-icons/ri'
import { loginContext } from '../../contexts/loginContext';

function Navigation() {
  let [currentUser,loginUser,logoutUser,userLoginStatus,loginErr]=useContext(loginContext)
  return (
    <div className='position-fixed w-100'>
      <Navbar className="mb-3" bg="success" variant="success">
        <Container fluid>
          <Navbar.Brand><img src={logo} alt="" width="50" height="50" className="logo rounded-5"/></Navbar.Brand>
          <Navbar.Toggle/>
            <div>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className='nav-link text-light' to='/'>Home</NavLink>
                <NavLink className='nav-link text-light' to='/aboutus'>About Us</NavLink>
                <NavLink className='nav-link text-light' to='/contactus'>Contact Us</NavLink>
                <NavDropdown title={<span className='text-light'>Account <RiAccountCircleFill/></span>}>
                  {userLoginStatus ?
                  <NavDropdown.Item>
                  <NavLink className='nav-link text-dark' to='/signin' onClick={logoutUser}>Signout</NavLink>
                  </NavDropdown.Item>
                  :
                  <NavDropdown.Item> 
                    <NavLink className='nav-link text-dark' to='/signin'>Signin</NavLink>
                  </NavDropdown.Item>
                  }
                  <NavDropdown.Item>
                    <NavLink className='nav-link text-dark' to='/signup'>Signup</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                    <NavLink className='nav-link text-dark' to='/support'>Support</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink className='nav-link text-light' to='/community'>Community</NavLink>
              </Nav>
            </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation