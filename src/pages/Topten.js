import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { UserContext } from '../hooks/UserContext';

import Header from '../sections/Header';


export default function Topten() {
    const { user } = useContext(UserContext);
    const { token } = user;
    const [topten, setTopten] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/top`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setTopten(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [token]);


    return (
        <div className="page">
            <Header />
            <h2>Top ten questions for this week are:</h2>
            <br></br>
            {
                topten && topten.map((top, idx) => (
                    <Card style={{width: '50%'}} key={idx.toString()}>
                        <Card.Header as="h5">{top.description}</Card.Header>
                        <Card.Body>
                            <Card.Title>{top.name}</Card.Title>
                            <Card.Text>
                                {top.question}
    </Card.Text>
                            <Badge variant="primary">Total Answers: {top.answers.length}</Badge>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
}