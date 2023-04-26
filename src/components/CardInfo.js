import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import styles from '../css/components/CardInfo.module.css';

const CardInfo = (props) => {
  const movePage = useNavigate();
  const meetingInfo = props.meetingInfo;
  const publisher = props.publisher;
  const participants = props.participants;
  const docId = props.docId;

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setFullYear(1);
    t.setMinutes(33);
    t.setSeconds(secs-t.getTimezoneOffset()*60);
    return t;
  }

  function toDetailPage() {
    movePage('/detail',
    {
      state: {
        meetingInfo: meetingInfo,
        publisher: publisher,
        participants: participants,
        docId: docId
      }
    });
  }
  return (
    <>
      <Card onClick={toDetailPage} className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.card_title}>{meetingInfo.title}</Card.Title>
          <Card.Text className={styles.badges}>
            <Badge bg="primary">
              {meetingInfo.type}
            </Badge>{' '}
            <Badge bg="primary">
              {meetingInfo.tag}
            </Badge>{' '}
          </Card.Text>
          <Card.Text>
            {toDateTime(meetingInfo.time).toLocaleString()}
          </Card.Text>
          <Card.Text>
            참가 인원 수 {participants.length}명
          </Card.Text>
          <Card.Text className={styles.publisher}>
            {publisher.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
 
export default CardInfo;