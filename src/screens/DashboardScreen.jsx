import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'

const DashboardScreen = () => {
  return (
    <div>
      <Container>
        <div className="dashboard-logo">
          <img src='logo.png' />
        </div>
        <div className="moto">Track, Discover, and Dive into Your Reading Journey with LibroLogs - Your Personal Book Tracking Companion</div>
        <div className="float">
        </div>

      </Container>
    </div>
  )
}

export default DashboardScreen
