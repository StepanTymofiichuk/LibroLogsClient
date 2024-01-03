import React from 'react';
import UserTimelime from '../components/UserTimelime';
import { Container } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

const UserTimelineScreen = () => {
  return (
    <>
    <Container>
        <div className="navigation">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Timeline</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className="timeline">
            <UserTimelime />
        </div>
    </Container>
</>
  )
}

export default UserTimelineScreen