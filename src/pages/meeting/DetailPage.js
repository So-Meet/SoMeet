import React from 'react';
import Participant from '../../components/Participant';
import  '../../css/pages/DetailPage.css';
const DetailPage = (props) => {
    return (
           <div>
            <h3>미팅 상세보기 </h3>
            <Participant/>
        </div>
    )
}
export default DetailPage;