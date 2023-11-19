import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBook, deleteBook, setUserBookRating } from '../slices/bookSlice';
import { removeGoals } from '../slices/goalSlice';
import { addReadingSession, removeSessions } from '../slices/sessionSlice';
import { Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import ReadingProgress from './ReadingProgress';
import StarRating from "./StarRating";
import { AiOutlineEdit, AiOutlineClose, AiOutlineBook, AiOutlineMobile } from "react-icons/ai";
import Badge from 'react-bootstrap/Badge';

const UserBooks = () => {

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [bookProgress, setBookProgress] = useState(0);
  const [prevProgress, setPrevProgress] = useState(0);
  const [bookId, setBookId] = useState(0);
  const [bookTitle, setBookTitle] = useState("");
  const [bookIndex, setBookIndex] = useState(0);
  const [bookpages, setBBookPages] = useState(0);
  const [bookRating, setBookRating] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShow(true);
    setBookIndex(index);
  };

  const { userBooks } = useSelector((state) => state.books);
  const { userGoals } = useSelector((state) => state.goals);
  const { userSessions } = useSelector((state) => state.sessions);

  const BookType = ({ type }) => {
    if (type === "paper") {
      return <AiOutlineBook />
    } else if (type === "e-book") {
      return <AiOutlineMobile />
    }
  }

  const deleteHandler = (_id) => {
    try {
      dispatch(deleteBook(_id));
      dispatch(removeGoals(_id));
      dispatch(removeSessions(_id));
      toast.success("Success!");
    } catch (error) {

    }
  }

  const submitHandler = () => {
    let status;
    let readingProgress = bookProgress - prevProgress;
    let progress = bookProgress / bookpages * 100;
    switch (true) {
      case progress == 100:
        status = "Completed";
        break;
      case progress < 99:
        status = "In Progress";
        break;
    }
    console.log(status);
    try {
      dispatch(updateBook({ bookIndex, bookProgress, status }));
      dispatch(addReadingSession({
        _id: userSessions.length + 1,
        progress: bookProgress,
        status: "In Progress",
        bookId,
        userId: 1,
        createdAt: "2023-10-30",
        updatedAt: "2023-10-30",
      }))
      toast.success("Success!");
    } catch (error) {

    }
  }

  const handleRatingChange = (newRating, bookIndex) => {
    console.log("Selected rating:", newRating);
    console.log("Book Index", bookIndex);
    setBookRating(newRating);
    dispatch(setUserBookRating({ newRating, bookIndex }));
    toast.success("Book Rating Changed");
  };

  const userBookPage = (book) => navigate("/books/" + book._id, { state: { _id: book._id, title: book.title, pages: book.pages, status: book.status } });
  return (
    <>
      <Form.Group className='my-2' controlId='search'>
        <Form.Control
          type='text'
          placeholder='Search...'
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
            <th>Rating</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
          {
            userBooks.length !== 0 && userBooks.filter((item) => {
              return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search) || item.genre.toLowerCase().includes(search)
            }).map((book, index) => (
              <tbody key={book._id} className='book'>
              <tr className='book-row'>
                <td style={{ cursor: "pointer" }} onClick={() => (userBookPage(book))}>{book.title} {book.status === "New" && <Badge bg='success' pill>{book.status}</Badge>}</td>
                <td>{book.genre}</td>
                <td>{book.pages}</td>
                <td><ReadingProgress progress={book.bookProgress / book.pages * 100} /></td>
                <td><BookType type={book.bookType} /></td>
                <td><StarRating initialRating={book.rating} onRatingChange={handleRatingChange} bookIndex={index} /></td>
                <td><Button variant="link" size="sm" style={{ color: "purple" }} onClick={() => {
                  handleShow(index),
                    setBookTitle(book.title),
                    setBookId(book._id),
                    setBBookPages(book.pages),
                    setBookProgress(book.bookProgress),
                    setPrevProgress(book.bookProgress)
                }} disabled={book.status == "Completed" ? true : false} ><AiOutlineEdit /></Button></td>
                <td><Button variant="link" size="sm" style={{ color: "red" }} onClick={() => (deleteHandler(book._id))} ><AiOutlineClose /></Button></td>
              </tr>
              </tbody>
            ))
          }
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h1>{bookTitle}</h1>
          <Form>
            <Form.Group className='my-2' controlId='progress'>
              <Form.Label>Reading Progress</Form.Label>
              <Form.Control
                type='number'
                min={1}
                step={1}
                pattern='\d+'
                placeholder='Progress...'
                value={bookProgress}
                required
                onChange={(e) => (setBookProgress(e.target.value))}
              />
            </Form.Group>

            <Button
              variant='primary'
              className='mt-3'
              onClick={() => (submitHandler())}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UserBooks