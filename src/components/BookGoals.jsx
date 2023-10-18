import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deleteGoal, updateGoal } from '../slices/goalSlice';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";

const BookGoals = () => {

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
        try {
          dispatch(updateGoal({ goalIndex: index, isCompleted: true }));
          toast.success("Congratulations! Goal is Completed");
        } catch (err) {
          toast.error(err);
    
        }
      }
      
    return (
        <>
            <div style={{paddingTop: 8, paddingBottom: 8}}>
                <Button variant="warning" style={{width: "100%" }}>Create New Goal</Button>
            </div>
            <div className="goals">
            {
                userGoals.map((goal, index) => (
                    <Card key={goal._id} style={{ width: '18rem', display: "flex", justifyContent: "center", flexGrow: "1", textAlign: "center", marginRight: "8px", marginBottom: "8px" }}>
                        <Card.Body>
                            <Card.Title style={{ wordBreak: "normal" }} className="mb-3">{goal.title}</Card.Title>
                            <h6>Deadline: {goal.goalDeadline}</h6>
                            <h6>isCompleted: {goal.isCompleted.toString()}</h6>
                            {
                                goal.isCompleted === false ? <Button variant="link" onClick={() => (goalStatusHandler(goal._id, index))}><AiOutlineCheck /></Button> : null
                            }

                            <Button variant="link" size="sm" style={{ color: "red" }} onClick={() => (goalDeleteHandler(goal._id, index))}><AiOutlineClose /></Button>
                        </Card.Body>
                    </Card>
                ))
            }
            </div>
        </>
    )
}

export default BookGoals