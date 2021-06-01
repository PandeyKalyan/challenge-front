import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import CTA from './../../components/CTA';
import useForm from './../../hooks/useForm';
import FormInput from './../../components/FormInput';


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

import Answers from '../../components/Answers';





import { UserContext } from '../../hooks/UserContext';

const LIST_CHALLENGES_URL = `${process.env.REACT_APP_API_URL}/api/challenges`;
const ADD_ANSWER_URL = `${process.env.REACT_APP_API_URL}/api/answer`;
const CREATE_CHALLENGE_URL = `${process.env.REACT_APP_API_URL}/api/challenge/create`;



export default function AllChallenges() {
    const [questions, setQuestions] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [answer, setAnswer] = useState('');
    const { user } = useContext(UserContext);
    const { token } = user

    const { values, handleChange } = useForm({
        initialValues: {
            name: '',
            description: '',
            question: '',
            category: '',
            difficulty: ''
        }
    });

    const handleAddAnswer = (challenge_id, idx) => {
        axios.post(ADD_ANSWER_URL, {
            challenge_id,
            answer
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            let presentQuestions = [...questions];
            presentQuestions[idx].answers.push(response.data);
            setQuestions(presentQuestions)
            setAnswer('')
        }).catch(err => {
            console.log(err)
        })
    }

    const handleCreateChallenge = (e) => {
        e.preventDefault();
        axios.post(CREATE_CHALLENGE_URL, values, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            let presentQuestions = [...questions];
            presentQuestions.push(response.data);
            setQuestions(presentQuestions);
            setShow(false);
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        axios.get(LIST_CHALLENGES_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setQuestions(response.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }, [token]);


    return (
        <div className="page">
            <Button variant="primary" onClick={handleShow}>
                Create Challenge
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleCreateChallenge}>
                    <FormInput type={"text"} 
                                placeholder={"Name"} 
                                name={"name"} 
                                value={values.name} 
                                handleChange={handleChange} />
                    <FormInput type={"text"} 
                                placeholder={"Description"} 
                                name={"description"} 
                                value={values.description} 
                                handleChange={handleChange} />
                    <FormInput type={"textarea"} 
                                placeholder={"Question"} 
                                name={"question"} 
                                value={values.question} 
                                handleChange={handleChange} />
                    <FormInput type={"text"} 
                                placeholder={"Category"} 
                                name={"category"} 
                                value={values.category} 
                                handleChange={handleChange} />
                    <FormInput type={"text"} 
                                placeholder={"Difficulty"} 
                                name={"difficulty"} 
                                value={values.difficulty} 
                                handleChange={handleChange} />
                    <div className="inlineForm__submit">
                        <CTA name={"Sumbit"} type={"submit"} 
                            /> 
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2>Challenges:</h2>
            {
                questions && questions.map((question, idx) => (
                    <Accordion key={idx.toString()} style={{ margin: '10px 0' }}>
                        <Card style={{ width: '90vw' }}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={idx.toString()}>
                                    {question.description}
                                    <Badge variant="primary" style={{ margin: '0 5px' }}>{question.difficulty}</Badge>
                                    <Badge variant="primary">{question.category}</Badge>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={idx.toString()}>
                                <Card.Body>
                                    <Card.Title>{question.name}</Card.Title>
                                    <Card.Text>
                                        {question.question}
                                    </Card.Text>
                                    <Card.Title>Answers:</Card.Title>
                                    <ListGroup>
                                        <Answers answers={question.answers} />
                                    </ListGroup>
                                    <br></br>
                                    <InputGroup>
                                        <FormControl placeholder="Type your answer here" as="textarea" aria-label="With textarea" value={answer} onChange={event => setAnswer(event.target.value)} />
                                    </InputGroup>
                                    <br></br>
                                    <Button onClick={() => handleAddAnswer(question._id, idx)}>Submit Answer</Button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))
            }
        </div>

    )
}