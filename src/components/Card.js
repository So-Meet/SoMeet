import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import styles from '../css/components/Card.module.css';

const CardInfo = () => {
  const movePage = useNavigate();

  function toDetailPage() {
    movePage('/detail');
  }

  return (
    <>
      <Card onClick={toDetailPage} className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.card_title}>밥먹자!</Card.Title>
          <Card.Text>
            <h5>
              <Badge bg="primary">
                식사
              </Badge>{' '}
              <Badge bg="primary">
                한식
              </Badge>{' '}
            </h5>
          </Card.Text>
          <Card.Text>
            2023/04/17 19:30
          </Card.Text>
          <Card.Text>
            참가 인원 수 5명
          </Card.Text>
          <Card.Text className={styles.publisher}>
            정진우
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
 
export default CardInfo;