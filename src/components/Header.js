import React from 'react';
import {Link} from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <h3>헤더</h3>
            <Link to = {'/main'}>메인페이지로 이동</Link>
        </div>
    );
}
 
export default Header;