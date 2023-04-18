import React from 'react';
import styles from '../css/components/SmallCategory.module.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const SmallCategory = ({ prop }) => {
    if (prop === 1) return (
      <ButtonGroup className={styles.btn_group}>
        <Button className={styles.btn_small}>한식</Button>
        <Button className={styles.btn_small}>중식</Button>
        <Button className={styles.btn_small}>일식</Button>
        <Button className={styles.btn_small}>양식</Button>
        <Button className={styles.btn_small}>분식</Button>
      </ButtonGroup>)

    else return (
      <ButtonGroup className={styles.btn_group}>
        <Button className={styles.btn_small}>pc방</Button>
        <Button className={styles.btn_small}>노래방</Button>
        <Button className={styles.btn_small}>당구장</Button>
        <Button className={styles.btn_small}>영화</Button>
      </ButtonGroup>);
};
  
export default SmallCategory;