
import React, {useState} from 'react';
import Participant from '../../components/Participant';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../css/pages/DetailPage.module.css';
import {Card, Badge, Container,Button} from 'react-bootstrap';
import FirebaseService from '../../services/firebase_service';

//TODO 참여기능
const DetailPage = (props) => {
  const location = useLocation();
  const state = location.state;
  const info = state.meetingInfo;
  const publisher = state.publisher;
  const participants = state.participants;
  const docId = state.docId;
  const firebase = new FirebaseService();
  const [isPub,setIsPub] = useState(false);
  
  const user = firebase.getUserInfo();

  user.then(u => {
    if (u.email === publisher.email) {
      setIsPub(true);
    } else {
      setIsPub(false);
    }
  });
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs-t.getTimezoneOffset()*60);
    
    return t;
  }
  
  const deleteMeeting = async () => {
    await firebase.deleteMeeting(docId).catch(e => alert(e.message));
    window.location.href = "/";
  }

  
  return (
    <Container className={styles.container}>
      <div className = {styles.page}>
        <div className ={styles.infobox}>
          <Card className={styles.title}>{info.title}</Card>
          <Card className={styles.content}>{info.content}</Card>

          <div className ={styles.badgebox}>
            <Badge bg="" className={`${styles.badge} ${styles.badge1}`}>게시자</Badge>
            <Card className={styles.badgetext}>{publisher.name}</Card>

            <Badge bg="" className={styles.badge}>태그</Badge>
            <Card className={styles.badgetext}>{info.type}/{info.tag}</Card>

            <Badge bg="" className={styles.badge}>장소</Badge>
            <Card className={styles.badgetext}>{info.place}</Card>

            <Badge bg="" className={styles.badge}>시간</Badge>
            <Card className={styles.badgetext}>{toDateTime(info.time.seconds).toLocaleString()}</Card>

            <Card className={styles.badgetext_link} ><a className={styles.link} href={info.link}>오픈채팅</a></Card>
            <Link to={'/'}><Button variant="outline-primary" className={styles.button}>목록으로</Button>{' '}</Link>
            {
              isPub === true &&<Button variant="outline-danger" className={styles.button} onClick={deleteMeeting}>삭제하기</Button>
            }
          </div>
        </div>

          <div className={styles.participant}>
            <Participant participants={participants} docId={docId}/>
            {/* <Participant/> */}
          </div>

      </div>
    </Container>
  )

}
export default DetailPage;  