import React from 'react';
import {Link} from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <h3>메인페이지 - 미팅 목록 페이지</h3>
            <Link to={'/write'}>로그인페이지로 이동</Link>
            <br/>
            <Link to={'/write'}>작성페이지로 이동</Link>
            <br/>
            <Link to={'/detail'}>상세보기로 이동</Link>
        </div>
    );
}
export default MainPage;