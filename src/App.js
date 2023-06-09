import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/meeting/MainPage';
import WritePage from './pages/meeting/WritePage';
import DetailPage from './pages/meeting/DetailPage';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [category, setCategory] = useState({
    type: -1,
    tag: -1,
  });

  function handleCategoryChange (curType, curTag) {
    setCategory({
      type: curType,
      tag: curTag,
    });
  }

  const login_flag = sessionStorage.getItem("login flag")

	return (
		<div className='App'>
			<BrowserRouter>
				<Container style={{
            marginTop: 10,
            border: '1px solid gray',            
           }}>

          <Header login_flag={login_flag} category={category} propFunction={handleCategoryChange} />	

          <Routes>
            <Route path="/" element={login_flag === "true" ? <MainPage category={category} /> : <LoginPage />}></Route>
            <Route path="/login/*" element={<LoginPage />}></Route>
            <Route path="/main" element={login_flag === "true" ? <MainPage category={category} /> : <LoginPage /> }></Route>
            <Route path="/detail" element={login_flag === "true" ? <DetailPage /> : <LoginPage />}></Route>
            <Route path="/write" element={login_flag === "true" ? <WritePage /> : <LoginPage />}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
			</BrowserRouter>
		</div>
	);
};
export default App;