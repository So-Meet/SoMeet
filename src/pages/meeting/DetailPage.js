
import React from 'react';
import styles from '../../css/pages/DetailPage.module.css';
import Card from 'react-bootstrap/Card';
import Participant from '../../components/Participant';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

const info = {//테스트용 객체
    content:"오늘 밤 치킨 먹어요! 양념 후라이드 다 쌉가능",
    link:"https://open.kakao.com/o/gXrV3Sff",
    place:"소마 센터",
    tag:"양식",
    time:"2023년 4월 19일 오후 9시 0분 0초 UTC+9",//TODO 날짜양식 변경
    title:"치맥팟 구합니다!",
    type:"식사"
};

const DetailPage = (props) => {
  return (
    <div class="board-container">

        <Card className={styles.title2}>{info.title}</Card>
        <Card.Subtitle className="mb-2 text-muted">게시자명</Card.Subtitle>
        <Card className={styles.content2}>{info.content}</Card>

      <div style={{display: 'flex', flexDirection: 'column',  justifyContent: 'center'}}>
        <div class ="info-box">    
          <Badge bg="primary"className={styles.badgetag}>{info.type}</Badge>{' '}
          <Badge bg="info"className={styles.badgetag}>{info.tag}</Badge>{' '}
          
          <Badge bg="info" className={styles.badge2}>장소</Badge>
          <Card className={styles.text2}>{info.place}</Card>
          <Badge bg="info" className={styles.badge3}>시간</Badge>
          <Card className={styles.text2}>{info.time}</Card>
        </div>
        
        <Card className={styles.linkbox2}>
          <Card.Link className={styles.link2} href={info.link}>오픈채팅 링크</Card.Link>    
        </Card>
      </div>
      <Participant />
      <div class="form-buttons">
          <button class = "main-button"><Link className = "link-main" to ={'/main'}>목록</Link></button>
          <button type="submit" class="submit-button">참여</button>
      </div>

  </div>
  )
}
export default DetailPage;  