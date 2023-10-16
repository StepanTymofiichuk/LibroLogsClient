import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";


const Hero = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);
  return (
    <Container className='justify-content-md-center mt-5'>
      <div className="logo">
        <img src='logo.png' />
      </div>
      <h2>Track, Discover, and Dive into Your Reading Journey with LibroLogs - Your Personal Book Tracking Companion</h2>
      <div className='mt-3' style={{display: "flex", justifyContent: "center"}}>
        <LinkContainer to="/login">
          <Button variant='primary' className='me-3'>
            Sign In
          </Button>
        </LinkContainer>
        <LinkContainer to="/register">
          <Button variant='secondary' href='/register'>
            Register
          </Button>
        </LinkContainer>
      </div>
    </Container>
  )
};

export default Hero;