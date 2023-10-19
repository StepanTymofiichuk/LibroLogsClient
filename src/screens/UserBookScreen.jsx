import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import BookGoals from '../components/BookGoals';
import { Container } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

const UserBookScreen = () => {
    const location = useLocation();
    let { id, goals } = useParams();

    //console.log(location.state.goals);

    return (
        <>
            <Container>
                <div className="navigation">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>{location.state.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <h1>{location.state.title}</h1>
                <BookGoals _id={location.state._id} />
            </Container>
        </>
    )
}

export default UserBookScreen