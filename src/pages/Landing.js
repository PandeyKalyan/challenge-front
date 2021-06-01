import React, { useContext } from 'react';
import Header from '../sections/Header';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function Landing() {
    const { user } = useContext(UserContext);
    return(
        user? <Redirect to='/dashboard'/> :
        <div className="page">
            <Header/>
           <h3>Welcome to coding challenge.</h3>
           <h4>Ask questions, answer questions and earn reputation!!!</h4>
        </div>
    )
}