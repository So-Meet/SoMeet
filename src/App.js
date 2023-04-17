import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/meeting/MainPage';
import WritePage from './pages/meeting/WritePage';
import DetailPage from './pages/meeting/DetailPage';
import Container from 'react-bootstrap/Container';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Container style={{marginTop: 10}}>

          <Header />	

          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login/*" element={<LoginPage />}></Route>
            <Route path="/main" element={<MainPage />}></Route>
            <Route path="/detail" element={<DetailPage />}></Route>
            <Route path="/write" element={<WritePage />}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
			</BrowserRouter>
		</div>
	);
};
export default App;