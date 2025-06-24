const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

// Express 앱 생성
const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // 다른 도메인에서 접근 허용
app.use(express.json()); // JSON 데이터 처리 가능하게 함

// 기본 라우트 (홈페이지)
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 내가 만든 첫 번째 서버!',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// 테스트용 API
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API 테스트 성공!',
    data: ['조호물품1', '조호물품2', '조호물품3']
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`🌐 브라우저에서 http://localhost:${PORT} 접속해보세요!`);
});