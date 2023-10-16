import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { Form, Button } from "react-bootstrap";
import FormContainer from '../components/FormContainer';

const ProfileScreen = () => {
    const [name, setName] =  useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] =  useState("");
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setCredentials({ name, email, password }));
    }
  return (
    <FormContainer>
        <h1>UpdateProfile</h1>
        <Form onSubmit={ submitHandler }>
        <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter name..'
                    value={ name }
                    onChange={ (e) => (setName(e.target.value)) }
                />
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type='email'
                    placeholder='Enter email..'
                    value={ email }
                    onChange={ (e) => (setEmail(e.target.value)) }
                />
            </Form.Group>
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Enter password'
                    value={ password }
                    onChange={ (e) => (setPassword(e.target.value)) }
                />
            </Form.Group>
            <Form.Group className='my-2' controlId='confirm-password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Confirm password'
                    value={ confirmPassword }
                    onChange={ (e) => (setConfirmPassword(e.target.value)) }
                />
            </Form.Group>

            <Button type="submit" variant='primary' className='mt-3'>Submit</Button>
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen
