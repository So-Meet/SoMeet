import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import CardInfo from '../../components/CardInfo';
import styles from '../../css/pages/MainPage.module.css';
import FirebaseService from '../../services/firebase_service';

const MainPage = (prop) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const firebase = new FirebaseService();
    firebase.getMeetings().then((values) => {
      setCards(values);
    });
  },[]);

  return (
    <>
      <Container className={styles.content}>
        {
          cards.filter(card => prop.category.type === -1 || card.meetingInfo.type === prop.category.type)
                .filter(card => prop.category.tag === -1 || card.meetingInfo.tag === prop.category.tag)
                .map((card) => (<CardInfo key={card.meetingInfo.time.nanoseconds} 
                                meetingInfo={card.meetingInfo} 
                                participants={card.participants} 
                                publisher={card.publisher} />
          ))
        }
      </Container>
            <Link to={'/write'}>작성페이지로 이동</Link>
   
    </>
  );
}
export default MainPage;