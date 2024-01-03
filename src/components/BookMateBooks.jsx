import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReadingProgress from './ReadingProgress';
import StarRating from "./StarRating";
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { AiOutlineEdit, AiOutlineClose, AiOutlineMail, AiOutlineSkype, AiOutlineFacebook, AiOutlineInstagram, AiOutlineBook, AiOutlineMobile } from "react-icons/ai";

const BookMateBooks = ({ _id }) => {

    const [search, setSearch] = useState("");
    const [bookMateBooks, setBookMateBooks] = useState([]);

    const { bookMatesBooks } = useSelector((state) => state.bookMatesBooks);

    useEffect(() => {
        console.log(_id);
        const filteredBookmateBooks = bookMatesBooks.filter(book => book.userId === _id);
        setBookMateBooks(filteredBookmateBooks);
    }, [bookMatesBooks]);

    const BookType = ({ type }) => {
        if (type === "paper") {
            return <AiOutlineBook />
        } else if (type === "e-book") {
            return <AiOutlineMobile />
        }
    }

    return (
        <>
            {bookMateBooks.length > 0 ? <div><Form.Group className='my-2' controlId='search'>
                <Form.Control
                    type='text'
                    placeholder='Search by title or genre...'
                    value={search}
                    onChange={(e) => (setSearch(e.target.value))}
                />
            </Form.Group>
                <Table size='lr'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Pages</th>
                            <th>Progress</th>
                            <th>Book Type</th>
                            <th>Book rating</th>
                        </tr>
                    </thead>
                    <tbody className='book' >
                        {bookMateBooks.filter((item) => {
                            return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search) || item.genre.toLowerCase().includes(search)
                        }).map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.pages}</td>
                                <td><ReadingProgress progress={book.bookProgress / book.pages * 100} /></td>
                                <td><BookType type={book.bookType} /></td>
                                <td><StarRating initialRating={book.rating} /></td>
                            </tr>

                        ))}
                    </tbody>
                </Table></div> : <p>User does not have books yet</p>}
        </>
    )
}

export default BookMateBooks