import React from 'react';
import styles from '../../css/pages/DetailPage.module.css';
import Card from 'react-bootstrap/Card';
import Participant from '../../components/Participant';
import Badge from 'react-bootstrap/Badge';

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
    <Card>
        <Card.Body>
          <Card.Title>{info.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">게시자명</Card.Subtitle>
          <Card.Text>{info.content}</Card.Text>
          <Badge bg="primary">{info.type}</Badge>{' '}
          <Badge bg="info">{info.tag}</Badge>{' '}
          <Card.Link href={info.link}>오픈채팅 링크</Card.Link>
        </Card.Body>
        
        <Badge bg="info" className={styles.badge2}>장소</Badge>
        <Card className={styles.text2}>{info.place}</Card>
        <Badge bg="info" className={styles.badge2}>시간</Badge>
        <Card className={styles.text2}>{info.time}</Card>
        <Participant />

      </Card>
    
    );

}
export default DetailPage;
