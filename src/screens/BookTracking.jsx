import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AiOutlineHistory, AiOutlinePlus } from 'react-icons/ai';
import { toast } from "react-toastify";

const BookTracking = ({ _id, pages, status }) => {

  const [show, setShow] = useState(false);
  const [newPages, setNewPages] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userSessions } = useSelector(state => state.sessions);

  const deleteBookSessions = () => {

  }

  const addPagesRead = () => {

  }

  return (
    <>
      <div className='reading-session'>
        <div>
          <div style={{ fontSize: "24px", textAlign: "center" }}>{userSessions.filter(s => s.bookId === _id).length}</div>
          <div style={{ fontSize: "12px" }}>Reading Sessions</div>
          <div>
            {userSessions.length !== 0 ? <Button variant='link' size="sm" onClick={deleteBookSessions}><AiOutlineHistory /></Button> : null}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "24px", textAlign: "center" }}>{userSessions.filter(s => s._id === _id).length !== 0 ? userSessions[userSessions.length - 1].updatedAt : "-"}</div>
          <div style={{ fontSize: "12px" }}>Last Reading Session</div>
        </div>
        <div>
          <div style={{ fontSize: "24px", textAlign: "center" }}>{userSessions.filter(s => s._id === _id).length !== 0 ? userSessions[userSessions.length - 1].progress : "0"}</div>
          <div style={{ fontSize: "12px" }}>Pages In Last Session</div>
          <div>
            {userSessions.filter(s => s.bookId === _id).length !== 0 && status !== "Completed" ? <Button variant='link' size="sm" onClick={handleShow}><AiOutlinePlus /></Button> : null}
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Pages In Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Normal text"
            value={newPages}
            onChange={(e) => setNewPages(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPagesRead}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BookTracking