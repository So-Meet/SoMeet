import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "../../css/pages/WritePage.css"
const WritePage = () => {

    const [memo, setMemo] = useState({
        title: '',
        body: '',
        tag: '',
        date: '',
        time: '',
        place: '',
        openchat: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setMemo(prevMemo => ({
          ...prevMemo,
          [name]: value
        }));
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // memo 데이터를 서버로 전송
      }
    
    return (

<div class="board-container">
  <div class="form-box">
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <input type="text" id="title-input" name= "title" class="form-control" placeholder="제목을 입력하세요" onChange={handleChange} required/>
      </div>
      <div class="form-group">
        <textarea id="content-input" name="body" class="form-control" placeholder="본문을 입력하세요" onChange={handleChange} required></textarea>
      </div>
      <div class="form-group">
        <input type="text" id="tags-input" name= "tag" class="form-control" placeholder="태그를 입력하세요 " onChange={handleChange} required/>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <input type="date" id="date-input" name="date" class="form-control" onChange={handleChange} required/>
        </div>
        <div class="col-6">
          <input type="time" id="time-input" name= "time" class="form-control" onChange={handleChange} required/>
        </div>
      </div>
      <div class="form-group">
        <input type ="text" id="place-input" name = "place" class="form-control" placeholder="장소를 입력하세요" onChange={handleChange} required/>
      </div>    

      <div class="form-group">
        <input type ="url" id="chat-input" name = "openchat" class="form-control" placeholder="오픈 채팅 주소를 입력하세요" onChange={handleChange} required/>
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