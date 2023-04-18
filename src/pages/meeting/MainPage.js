import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import CardInfo from '../../components/CardInfo';
import styles from '../../css/pages/MainPage.module.css';
import FirebaseService from '../../services/firebase_service';

const MainPage = () => {
  const [cards, setCards] = useState([]);

  const firebase = new FirebaseService();

  useEffect(() => {
    firebase.getMeetings().then((values) => {
      setCards(values);
    });
  },[]);

  return (
    <>
      <Container className={styles.content}>
        {
          cards.map((card) => (
            <CardInfo key={card.meetingInfo.time.nanoseconds} meetingInfo={card.meetingInfo} 
            participants={card.participants} publisher={card.publisher} />
          ))
        }
      </Container>
    </>
  );
}
export default MainPage;