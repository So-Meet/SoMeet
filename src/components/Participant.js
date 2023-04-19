import React from 'react';
import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FirebaseService from '../services/firebase_service';
import styles from '../css/components/Participant.module.css';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';




const participants = [] //테스트용 mock객체들
for(let i = 0;i<5;i++){
    participants.push({"email":"test"+i+"@email.com","name":"참여자"+i})
}


const Participant = () => {

    const db = new FirebaseService();
    
    return (
        // <Card style={{ width: '18rem' }}>
        <Container className={styles.participants}>
            <Card className={styles.card}>
            <Card.Header>참여자 리스트</Card.Header>
            <ListGroup variant="flush">
                {participants.map(function(e){
                    return(
                        <ListGroup.Item>{e.name}</ListGroup.Item>
                    );
                })}
            </ListGroup>

        </Card>
      </Container>
    );
}
 
export default Participant;
