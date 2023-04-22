import React, { useEffect, useState } from 'react';
import {Card,ListGroup, Container, Button } from 'react-bootstrap';
import styles from '../css/components/Participant.module.css';
import FirebaseService from '../services/firebase_service';

const Participant = (props) => {
    const participants = props.participants;
    const docId = props.docId;
    const firebase = new FirebaseService();
    
    const [isJoin, setIsJoin] = useState(false)
    const user = firebase.getUserInfo()


    const join = () =>{
        try {
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]['email'] === user['email']){ 
                    setIsJoin(true)
                    return -1;
                }
            }

            firebase.joinMeeting(docId);
            //성공시
            user.then((u) => {
                participants[participants.length]={'name': u.name, 'email':u.email};
            });
            setIsJoin(true)
        } catch (error) {
            console.log(error)
        }
        
    }
    const left = () =>{
        try {
            firebase.leftMeeting(docId);
            //성공시
            user.then((u) => {
                for(let i = 0; i < participants.length; i++) {
                    if(participants[i].email == u.email)  {
                        participants.splice(i, 1);
                        break;
                    }
                }
            });
            setIsJoin(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        // <Card style={{ width: '18rem' }}>
      <Container className={styles.participants}>
        <Card className={styles.card}>
            <Card.Header className={styles.cardheader}>참여자 리스트</Card.Header>
            <ListGroup variant="flush">
                {participants.map(function(e){
                    return(
                        <ListGroup.Item key={e.email} className={styles.item}>{e.name}</ListGroup.Item>
                    );
                })}
                {
                    isJoin === false
                    ? <Button variant="" className={styles.button_join} onClick={join}>참여하기</Button>
                    : <Button variant="" className={styles.button_cancel} onClick={left}>참여취소</Button>
                }
            </ListGroup>

        </Card>
      </Container>
    );
}
 
export default Participant;
