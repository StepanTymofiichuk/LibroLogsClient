import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const BookMatesList = () => {

    const [search, setSearch] = useState("");
    const [userBookMates, setUserBookmates] = useState([]);

    const { userInfo } = useSelector((state) => state.auth);
    const { bookMates } = useSelector((state) => state.bookMates);

    const navigate = useNavigate();

    useEffect(() => {
        if(bookMates.length !== 0) {
          const fiiteredBookmates = bookMates.filter(user => user._id !== userInfo._id);
          setUserBookmates(fiiteredBookmates);
        }
    }, [bookMates]);

    // console.log(userBookMates);

    const userBookmatePage = (bookMate) => navigate(`/bookmates/${bookMate.name}`, { state: {_id: bookMate._id, name: bookMate.name }});

    return (
        <>
            <h1>Bookmates</h1>
            <Form.Group className='my-2' controlId='search'>
                <Form.Control
                    type='text'
                    placeholder='Search by name or email...'
                    value={search}
                    onChange={(e) => (setSearch(e.target.value))}
                />
            </Form.Group>
            <Table size='lr'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className='book' >
        {
            userBookMates.filter((item) => {
                return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
              }).map((bookmate, index) => (
              <tr key={bookmate._id} className='book-row'>
                <td style={{ cursor: "pointer" }} onClick={() => userBookmatePage(bookmate)}>{bookmate.name}</td>
                <td>{bookmate.email}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
        </>
    )
}

export default BookMatesList