import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, addBook } from '../slices/bookSlice';
import { toast } from "react-toastify";
import { Button, Container, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import FormContainer from '../components/FormContainer';
import UserBooks from '../components/UserBooks';
import { AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

const DashboardScreen = () => {

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Book1");
  const [genre, setGenre] = useState("fiction");
  const [pages, setPages] = useState(100);
  const [bookProgress, setBookProgress] = useState(0);
  const [bookType, setBookType] = useState("e-book");

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userInfo } = useSelector((state) => state.auth);
  const { userBooks } = useSelector((state) => state.books);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = { _id: userBooks.length + 1, title, genre, pages, bookProgress, bookType, status: "New" };
      dispatch(addBook({ ...res }));
      toast.success("Success!");
    } catch (error) {
      
    }
    setTitle("");
    setGenre("");
    setPages("");
    setBookType("");
  }
  return (
    <div>
      <Container>
        <div className="dashboard-logo">
          <img src='logo.png' />
        </div>
        <div className="moto">Track, Discover, and Dive into Your Reading Journey with LibroLogs - Your Personal Book Tracking Companion</div>
        <div className="float">
        <button className='plus' onClick={handleShow}><AiOutlinePlus /></button>
        </div>
        {userBooks ? <UserBooks /> : <p>Currently you don't have books, please add</p>}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter book title..'
                value={title}
                onChange={(e) => (setTitle(e.target.value))}
              />
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter book genre..'
                value={genre}
                onChange={(e) => (setGenre(e.target.value))}
              />
            </Form.Group>
            <Form.Group className='my-2' controlId='pages'>
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type='number'
                min={1}
                step={1}
                pattern='\d+'
                required
                placeholder='Enter book pages..'
                value={pages}
                onChange={(e) => (setPages(e.target.value))}
              />
            </Form.Group>
            <Form.Group className='my-2' controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter book type..'
                value={bookType}
                onChange={(e) => (setBookType(e.target.value))}
              />
            </Form.Group>
            <Button type="submit" variant='primary' className='mt-3'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashboardScreen
