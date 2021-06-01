import React, {useState, useContext } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../hooks/UserContext';


export default function Answer(props) {
    const { answer } = props;
    const { user } = useContext(UserContext);
    const { token } = user;

    const [upvotes, setUpvotes] = useState(answer.upvotes);
    const [downvotes, setDownvotes] = useState(answer.downvotes);

    const handleSetUpvotes = (answer_id) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/answer/${answer_id}/upvote`, {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            let presentAnswer = {...answer};
            presentAnswer.upvotes = response.data.upvotes
            setUpvotes(presentAnswer.upvotes)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSetDownvotes = (answer_id) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/answer/${answer_id}/downvote`, {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            let presentAnswer = {...answer};
            presentAnswer.downvotes = response.data.downvotes
            setDownvotes(presentAnswer.downvotes)
        }).catch(err => {
            console.log(err)
        })
    }

    return (

        <ListGroup.Item>
            {answer.answer}
            <Badge>Upvotes: {upvotes}</Badge>
            <Badge>Downvotes: {downvotes}</Badge>
            <ButtonGroup aria-label="Basic example">
                <Button size="sm" variant="primary" onClick={() => handleSetUpvotes(answer._id)}>Upvote</Button>
                <Button size="sm" variant="primary" onClick={() => handleSetDownvotes(answer._id)}>Downvote</Button>
            </ButtonGroup>
        </ListGroup.Item>
    )
}