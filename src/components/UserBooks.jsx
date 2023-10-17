import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBook, deleteBook } from '../slices/bookSlice';
import { Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import ReadingProgress from './ReadingProgress';
import { AiOutlineEdit, AiOutlineClose, AiOutlineBook, AiOutlineMobile } from "react-icons/ai";

const UserBooks = () => {

  const [show, setShow] = useState(false);
  const [bookProgress, setBookProgress] = useState(0);
  const [prevProgress, setPrevProgress] = useState(0);
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookIndex, setBookIndex] = useState(0);
  const [bookpages, setBBookPages] = useState(0);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = ( index ) => {
    setShow(true);
    setBookIndex(index);
  };

  const { userBooks } = useSelector((state) => state.books);

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
      toast.success("Success!");
    } catch (error) {

    }
  }

  const submitHandler = () => {
    try {
      dispatch(updateBook({ bookIndex, bookProgress }));
      toast.success("Success!");
    } catch (error) {
      
    }
  }
  return (
    <>
      <p className='books-qty'>Currently you have {userBooks.length} books</p>
      <Table size='lr'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Pages</th>
            <th>Progress</th>
            <th>Book Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className='book' >
          {
           userBooks.length !== 0 ? userBooks.map((book, index) => (
              <tr key={book._id} className='book-row'>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.pages}</td>
                <td><ReadingProgress progress={book.bookProgress / book.pages * 100} /></td>
                <td><BookType type={book.bookType} /></td>
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
            )) : <p>No books were found... Please add</p>
          }
        </tbody>
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