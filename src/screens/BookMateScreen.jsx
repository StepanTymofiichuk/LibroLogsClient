import React from 'react';
import { useLocation } from 'react-router-dom';
import BookMateBooks from '../components/BookMateBooks';
import { Container } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

const BookMatesScreen = () => {

    const location = useLocation();

    return (
        <Container>
            <div className="navigation">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="/bookmates">Bookmates</Breadcrumb.Item>
                    <Breadcrumb.Item active>{location.state.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <h1>{location.state.name}</h1>
            <BookMateBooks _id={location.state._id} />
        </Container>
    )
}

export default BookMatesScreen