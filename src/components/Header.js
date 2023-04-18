import React from 'react';
import SmallCategory from './SmallCategory';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/components/Header.module.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const Header = () => {
  const [category, setCategory] = useState({
    flag: 1
  })

  function swithcToFoodCategory() {
    setCategory({
      ...category,
      flag: 1
    });
  }

  function swithcToPlayCategory() {
    setCategory({
      ...category,
      flag: 0
    });
  }

    return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/main">So Meat</Navbar.Brand>
          <Navbar.Brand className={styles.logout} href="/login">로그아웃</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className={styles.header}>
        <ButtonGroup className={styles.btn_group}>
          <Button onClick={swithcToFoodCategory} className={styles.btn_large} variant="primary">식사</Button>
          <Button onClick={swithcToPlayCategory} className={styles.btn_large} variant="primary">여가</Button>
        </ButtonGroup>
        <SmallCategory prop={category.flag}></SmallCategory>
      </Container>
    </>
    );
}
 
export default Header;