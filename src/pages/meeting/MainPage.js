import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import CardInfo from '../../components/CardInfo';
import styles from '../../css/pages/MainPage.module.css';
import FirebaseService from '../../services/firebase_service';

const MainPage = () => {
  const firebase = new FirebaseService();

  // const [cards, setCards] = useState();

  firebase.getMeetings().then((values) => {
    console.log(values);
  });

  return (
    <>
      <Container className={styles.content}>
      </Container>
    </>
  );
}
export default MainPage;