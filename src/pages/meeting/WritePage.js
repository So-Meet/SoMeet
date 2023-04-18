import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Cascader } from 'antd';
import "../../css/pages/WritePage.css"
const WritePage = () => {

    const [memo, setMemo] = useState({
        content: '',
        link: '',
        place: '',
        tag: '',
        time:'',
        title:'',
        type: ''
      });
      const handleCascaderChange = (value) => {
        const [type, tag] = value; // Cascader에서 입력된 값을 배열로 받음
        setMemo(prevMemo => ({
          ...prevMemo,
          type: type,
          tag: tag
        }));
      }   
      const handleChange = (e) => {
        const { name, value } = e.target;
        setMemo(prevMemo => ({
          ...prevMemo,
          [name]: value
        }));
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // memo 데이터를 서버로 전송?
      }
      const options = [
        {
          value: '식사',
          label: '식사',
          children: ['한식', '중식', '일식', '양식', '분식'].map(tag => ({ value: tag.toLowerCase().replace(/\s/g, ''), label: tag })),
        },
        {
          value: '여가',
          label: '여가',
          children: ['pc방', '노래방', '당구장', '영화'].map(tag => ({ value: tag.toLowerCase().replace(/\s/g, ''), label: tag })),
        },
      ];
    return (

    <div class="board-container">
      <div class="form-box">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input type="text" id="title-input" name= "title" class="form-control" placeholder="제목을 입력하세요" onChange={handleChange} required/>
          </div>
          <div class="form-group">
            <textarea id="content-input" name="content" class="form-control" placeholder="본문을 입력하세요" onChange={handleChange} required></textarea>
          </div>
          <div class="form-group-wrapper">
            <div class="form-group" >
              <Cascader options={options} placeholder="태그를 선택하세요" onChange={handleCascaderChange} />
            </div>
            <div class="form-group">
              <div class="col-30">
                <input type="datetime-local" id="time" name="date" class="form-control" onChange={handleChange} required/>
              </div>
            </div>
            <div class="form-group">
              <input type ="text" id="place-input" name = "place" class="form-control" placeholder="장소를 입력하세요" onChange={handleChange} required/>
            </div>    
          </div>
          <div class="form-group">
            <input type ="url" id="chat-input" name = "link" class="form-control" placeholder="오픈 채팅 주소를 입력하세요" onChange={handleChange} required/>
          </div>
          <div class="form-buttons">
                
                <button class = "main-button"><Link className = "link-main" to ={'/main'}>목록</Link></button>
                <button type="submit" class="submit-button">등록</button>
            </div>
        </form>
      </div>
    </div>



//        <div>
//            <h3>미팅 작성 페이지</h3>
//        </div>
    );
}
export default WritePage;