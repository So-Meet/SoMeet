
import React, {useState} from 'react';
import Participant from '../../components/Participant';
import { Link } from 'react-router-dom';
import styles from '../../css/pages/DetailPage.module.css';
import {Card, Badge, Container,Button} from 'react-bootstrap';

const user = {
  "accessToken": "mock",
  "displayedName": "연수생xxx",
  "email":"mock",
  "uid":"mock"
};

const info = {//테스트용 객체
    content:"오늘 밤 치킨 먹어요! 양념 후라이드 다 쌉가능 ",
    link:"https://open.kakao.com/o/gXrV3Sff",
    place:"소마 센터",
    tag:"양식",
    time:"2023년 4월 19일 오후 9시 0분 0초 UTC+9",//TODO 날짜양식 변경
    title:"치맥팟 구합니다!",
    type:"식사"
};

//TODO 참여기능
const DetailPage = (props) => {
  const [publisher,setPublisher] = useState(true);
  return (
    <Container className={styles.container}>
      <div className = {styles.page}>
        <div className ={styles.infobox}>
          <Badge bg="" className={styles.titlebadge}>제목</Badge>
          <Card className={styles.title}>{info.title}</Card>

          <Badge bg="" className={styles.titlebadge}>내용</Badge>
          <Card className={styles.content}>{info.content}</Card>

          <div className ={styles.badgebox}>
            <Badge bg="" className={`${styles.badge} ${styles.badge1}`}>게시자</Badge>
            <Card className={styles.badgetext}>{user.displayedName}</Card>

            <Badge bg="" className={styles.badge}>태그</Badge>
            <Card className={styles.badgetext}>{info.type}/{info.tag}</Card>

            <Badge bg="" className={styles.badge}>장소</Badge>
            <Card className={styles.badgetext}>{info.place}</Card>

            <Badge bg="" className={styles.badge}>시간</Badge>
            <Card className={styles.badgetext}>{info.time}</Card>

            <Badge bg="" className={`${styles.badge} ${styles.badge5}`}>오픈채팅</Badge>
            <Card className={styles.badgetext_link} ><a className={styles.link} href={info.link}>링크</a></Card>
          </div>
        </div>
          
        <div className={styles.participant}>
          <Participant/>
        </div>
        <div className={styles.buttonbox}>
        <Link to={'/'}><Button variant="outline-primary" className={styles.button}>목록으로</Button>{' '}</Link>
          {
            publisher === true &&<Button variant="outline-danger" className={styles.button}>삭제하기</Button>
          }
          
        </div>
      </div>
    </Container>
  )

}
export default DetailPage;  