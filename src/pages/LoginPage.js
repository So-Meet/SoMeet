import React, {useState} from 'react';
import {Container,Button,Form} from 'react-bootstrap';
import styles from '../css/pages/LoginPage.module.css';
import FirebaseService from '../services/firebase_service';



const LoginPage = () => {
    const firebase = new FirebaseService();
    const [email, setEmail] = useState("")
    const [pwd,setPwd] = useState("");


    const login = (e)=>{
        e.preventDefault();
        
        firebase.login(email,pwd).then(() => {
            sessionStorage.setItem("login flag", true);
            console.log("login success");
            window.location.href = "/";
        }).catch((error) => {
            console.log(error);
        })



        //TODO 성공 실패 분기
    }
    
    return (

        <Container className={styles.container}> 

            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="이메일 입력" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="초기비밀번호는 이메일과 같습니다" onChange={(e) => setPwd(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">로그인</Button>
        </Form>
      </Container>
    );
}
export default LoginPage;
