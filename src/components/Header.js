import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import SmallCategory from './SmallCategory';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/components/Header.module.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import FirebaseService from '../services/firebase_service';


const Header = (props) => {
  const movePage = useNavigate();
  const firebase = new FirebaseService();

  const [category, setCategory] = useState({
    flag: -1,
  })
  
  const handleClick = () => {
    firebase.logout();
    movePage("/login");
  }

  const handleChange = (val) => {
    props.propFunction(val,-1);
    if(val === "식사") {
      setCategory({
        ...category,
        flag: 1
      });
    } else {
      setCategory({
        ...category,
        flag: 0
      });
    }
  };

    return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/main">So Meet</Navbar.Brand>
          <Navbar.Brand className={styles.logout} onClick={handleClick}>로그아웃</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className={styles.header}>
        <ToggleButtonGroup type="radio" name="type" className={styles.btn_group} onChange={handleChange} >
          <ToggleButton id="1" value="식사" className={styles.btn_large} variant="primary">식사</ToggleButton>
          <ToggleButton id="2" value="여가" className={styles.btn_large} variant="primary">여가</ToggleButton>
        </ToggleButtonGroup>
        <SmallCategory propFunction={props.propFunction} flag={category.flag} category={props.category} />
      </Container>
    </>
    );
}
 
export default Header;