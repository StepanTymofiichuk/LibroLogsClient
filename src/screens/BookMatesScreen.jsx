import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookMatesList from '../components/BookMatesList';
import { Container } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

const BookMatesScreen = () => {

  const { bookMates } = useSelector((state) => state.bookMates);
  const { bookMatesBooks } = useSelector((state) => state.bookMatesBooks);


  useEffect(() => {

  }, []);

  return (
    <Container>
      <div className="navigation">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>Bookmates</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      { bookMates !== null && <BookMatesList /> }
    </Container>
  )
}

export default BookMatesScreen