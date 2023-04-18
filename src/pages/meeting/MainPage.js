import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardInfo from '../../components/Card';
import styles from '../../css/pages/MainPage.module.css';
import CardGroup from 'react-bootstrap/CardGroup';

const MainPage = () => {
  return (
    <>
      <Container className={styles.content}>
        <CardGroup>
          <CardInfo />
          <CardInfo />
          <CardInfo />
        </CardGroup>
        <CardGroup>
          <CardInfo />
          <CardInfo />
          <CardInfo />
        </CardGroup>
      </Container>
            <Link to={'/write'}>작성페이지로 이동</Link>
   
    </>


    // <div>
    //     <h3>메인페이지 - 미팅 목록 페이지</h3>
    //     <Link to={'/write'}>로그인페이지로 이동</Link>
    //     <br/>
    //     <Link to={'/write'}>작성페이지로 이동</Link>
    //     <br/>
    //     <Link to={'/detail'}>상세보기로 이동</Link>
    // </div>
  );
}
export default MainPage;