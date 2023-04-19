import React from 'react';
import styles from '../css/components/SmallCategory.module.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const SmallCategory = ( prop ) => {
  const foodCategory = [
    "한식", "중식", "양식",
    "분식", "일식", "미정"
  ]

  const playCategory = [
    "pc방", "당구장", "노래방",
    "보드게임", "오락실", "독서",
    "스포츠", "영화", "헬스", "기타"
  ]

  const handleChange = (val) => {
    prop.propFunction(prop.category.type,val);
  };

  if(prop.flag === -1) return (<></>)
  else if (prop.flag === 1) return (
    <ToggleButtonGroup type="radio" name="option" className={styles.btn_group} onChange={handleChange}>
      {foodCategory.map((category, index) => (
        <ToggleButton key={index} value={category} id={category} className={styles.btn_small}>{category}</ToggleButton>
      ))}
    </ToggleButtonGroup>)

  else return (
    <ToggleButtonGroup type="radio" name="option" className={styles.btn_group} onChange={handleChange}>
      {playCategory.map((category, index) => (
        <ToggleButton key={index} value={category} id={category} className={styles.btn_small}>{category}</ToggleButton>
      ))}
    </ToggleButtonGroup>);
};
  
export default SmallCategory;