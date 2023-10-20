import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deleteGoal, updateGoal, addGoal, updateOldGoal } from '../slices/goalSlice';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";

const BookGoals = ({ _id }) => {

  const [show, setShow] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);

  const [goalTitle, setGoalTitle] = useState("");
  const [editGoalId, setEditGoalId] = useState(0);
  const [editGoalTitle, setEditGoalTitle] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goalDeadlineTime, setGoalDeadlineTime] = useState("");
  const [editGDeadline, setEditGoalDeadline] = useState("");
  const [editGDeadlineTime, setEditGoalDeadlineTime] = useState("");
  const [goalCompleted, setGoalCompleted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditGoalModal = () => setShowEditGoalModal(false);
  const handleShowEditGoalModal = (_id, title, deadline, deadlineTime) => {
    setShowEditGoalModal(true);
    console.log(title);
    console.log(deadline);
    console.log(_id);
    setEditGoalId(_id);
    setEditGoalTitle(title);
    setEditGoalDeadline(deadline);
    setEditGoalDeadlineTime(deadlineTime);
  }

  const dispatch = useDispatch();

  const { userGoals } = useSelector((state) => state.goals);

  const goalDeleteHandler = (_id, index) => {
    console.log(_id);
    try {
      dispatch(deleteGoal(_id));
      toast.success("Successfully Deleted");
    } catch (err) {
      toast.error(err);
    }
  }

  const goalStatusHandler = async (_id, index) => {
    console.log(_id);
    console.log(index)
    try {
      dispatch(updateGoal({ goalIndex: _id - 1, isCompleted: true }));
      toast.success("Congratulations! Goal is Completed");
    } catch (err) {
      toast.error(err);

    }
  }

  const goalSubmitHandler = () => {
    try {
      dispatch(addGoal({ _id: userGoals.length + 1, title: goalTitle, goalDeadline, goalDeadlineTime, isCompleted: goalCompleted, bookId: _id }));
      toast.success("Created");
      setGoalTitle("");
      setGoalDeadline("");
      setGoalDeadlineTime("");
      setGoalCompleted(false);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  const editGoalSubmitHandler = () => {
    try {
      dispatch(updateOldGoal({ goalIndex: editGoalId - 1, title: editGoalTitle, goalDeadline: editGDeadline, goalDeadlineTime: editGDeadlineTime }));
      toast.success("Updated");
      setEditGoalTitle("");
      setEditGoalDeadline("");
      setEditGoalDeadlineTime("");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  return (
    <>
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Button variant="warning" style={{ width: "100%" }} onClick={handleShow}>Create New Goal</Button>
      </div>
      <div className="goals">
        {
          userGoals.filter(goal => goal.bookId === _id).map((goal, index) => (
            <Card key={goal._id} style={{ width: '18rem', display: "flex", justifyContent: "center", flexGrow: "1", textAlign: "center", marginRight: "8px", marginBottom: "8px" }}>
              <Card.Body>
                <Card.Title style={{ wordBreak: "normal" }} className="mb-3">{goal.title}</Card.Title>
                <h6>Deadline: {goal.goalDeadline} {goal.goalDeadlineTime}</h6>
                <h6>isCompleted: {goal.isCompleted.toString()}</h6>
                {
                  goal.isCompleted === false ? <Button variant="link" style={{ color: "green" }} onClick={() => (goalStatusHandler(goal._id, index))}><AiOutlineCheck /></Button> : null
                }
                {
                  goal.isCompleted === false ? <Button variant="link" style={{ color: "purple" }} onClick={() => (handleShowEditGoalModal(goal._id, goal.title, goal.goalDeadline, goal.goalDeadlineTime))}><AiOutlineEdit /></Button> : null
                }
                <Button variant="link" size="sm" style={{ color: "red" }} onClick={() => (goalDeleteHandler(goal._id, index))}><AiOutlineClose /></Button>
              </Card.Body>
            </Card>
          ))
        }
      </div>
      <Modal show={showEditGoalModal} onHide={handleCloseEditGoalModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Goal Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter goal title..."
                required
                value={editGoalTitle}
                onChange={(e) => setEditGoalTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Goal Deadline</Form.Label>
            <Form.Group className="mb-3" style={{display: "flex", justifyContent: "space-between"}} controlId="exampleForm.ControlTextarea1">
              <Form.Control
                type="date"
                placeholder="Enter goal deadline..."
                required
                value={editGDeadline}
                onChange={(e) => setEditGoalDeadline(e.target.value)}
              />
              <Form.Control
                type="time"
                placeholder="Enter goal deadline..."
                required
                value={editGDeadlineTime}
                onChange={(e) => setEditGoalDeadlineTime(e.target.value)}
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleCloseEditGoalModal}>
              Close
            </Button>
            <Button variant="primary" className='m-3' onClick={editGoalSubmitHandler}>
              Update Goal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Goal Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter goal title..."
                required
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Goal Deadline</Form.Label>
            <Form.Group className="mb-3" style={{display: "flex", justifyContent: "space-between"}} controlId="exampleForm.ControlTextarea1">
              <Form.Control
                type="date"
                placeholder="Enter goal deadline..."
                required
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
              />
              <Form.Control
                type="time"
                placeholder="Enter goal deadline..."
                required
                value={goalDeadlineTime}
                onChange={(e) => setGoalDeadlineTime(e.target.value)}
              />
            </Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Completed?"
              value={goalCompleted}
              onChange={(e) => setGoalCompleted(e.target.value)}
            />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className='m-3' onClick={goalSubmitHandler}>
              Create Goal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BookGoals