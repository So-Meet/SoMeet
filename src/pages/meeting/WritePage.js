import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Cascader } from 'antd';
import "../../css/pages/WritePage.css"
import styles from '../../css/pages/DetailPage.module.css';
import {Card, Badge, Container,Button} from 'react-bootstrap';
import FirebaseService from '../../services/firebase_service';
import { Timestamp } from 'firebase/firestore/lite';

function getTimeStamp(time) {
  return Timestamp.fromDate(new Date(time));

}

const WritePage = () => {
    const firebase = new FirebaseService();
    const [info, setInfo] = useState({
        content: '',
        link: '',
        place: '',
        tag: '',
        time:'',
        title:'',
        type: ''
      });
      const handleCascaderChange = (value) => {
        const [type, tag] = value; // Cascader에서 입력된 값을 배열로 받음
        setInfo(prevInfo => ({
          ...prevInfo,
          type: type,
          tag: tag
        }));
      }   
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
          ...prevInfo,
          [name]: value
        }));
      }
      const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
          ...prevInfo,
          [name]: getTimeStamp(value)
        }));
        console.log(info.time);
        
      }
    
      const options = [
        {
          value: '식사',
          label: '식사',
          children: ['한식', '중식', '일식', '양식', '분식'].map(tag => ({ value: tag.toLowerCase().replace(/\s/g, ''), label: tag })),
        },
        {
          value: '여가',
          label: '여가',
          children: ['pc방', '노래방', '당구장', '영화'].map(tag => ({ value: tag.toLowerCase().replace(/\s/g, ''), label: tag })),
        },
      ];

      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(info);
        await firebase.createMeeting(info);
        console.log("미팅생성 성공");
        window.location.href = "/";
      }
    return (


        <Container className={styles.container}>
        <form onSubmit={handleSubmit}>
      <div className = {styles.page}>
        <div className ={styles.infobox}>
          <Card className={styles.title}><input type="text" id="title-input" name= "title" placeholder="제목을 입력하세요" onChange={handleChange} required/></Card>
          <Card className={styles.content}><textarea id="content-input" name="content"  placeholder="본문을 입력하세요" onChange={handleChange} required></textarea></Card>

          <div className ={styles.badgebox}>

            <Badge bg="" className={styles.badge}>태그</Badge>
            <Card className={styles.badgetext}><Cascader options={options} placeholder="태그를 선택하세요" onChange={handleCascaderChange} /></Card>

            <Badge bg="" className={styles.badge}>장소</Badge>
            <Card className={styles.badgetext}><input type ="text" id="place-input" name = "place" class="form-control" placeholder="장소를 입력하세요" onChange={handleChange} required/></Card>

            <Badge bg="" className={styles.badge}>시간</Badge>
            <Card className={styles.badgetext}><input type="datetime-local" id="time" name="time" class="form-control" onChange={handleTimeChange} required/></Card>
            
            <Badge bg="" className={styles.badge}>오픈채팅</Badge>
            <Card className={styles.badgetext}><input type ="url" id="chat-input" name = "link" class="form-control" placeholder="오픈 채팅 주소를 입력하세요" onChange={handleChange} required/></Card>
            <Link to={'/'}><Button variant="outline-primary" className={styles.button}>목록으로</Button>{' '}</Link>
          
              <Button type="submit" variant="outline-danger" className={styles.button}>등록</Button>
            
          </div>
        </div>
      </div>
        </form>
    </Container>

    );
}
export default WritePage;