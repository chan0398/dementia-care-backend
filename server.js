const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 데이터베이스 연결 테스트
db.connect((err) => {
  if (err) {
    console.error('❌ 데이터베이스 연결 실패:', err.message);
    console.error('연결 정보:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
  } else {
    console.log('✅ MySQL 데이터베이스 연결 성공!');
    console.log(`📍 연결된 호스트: ${process.env.DB_HOST}`);
  }
});

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: '🏥 치매안심센터 API 서버가 실행중입니다!',
    status: 'running',
    timestamp: new Date().toISOString(),
    database: process.env.DB_HOST ? 'configured' : 'not configured',
    version: '1.0.0'
  });
});

// 헬스체크 API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

// 데이터베이스 연결 테스트 API
app.get('/api/db-test', (req, res) => {
  // 간단한 쿼리로 연결 테스트
  db.query('SELECT 1 + 1 AS result, NOW() as server_time, VERSION() as mysql_version', (err, results) => {
    if (err) {
      console.error('❌ DB 쿼리 에러:', err);
      res.status(500).json({ 
        success: false,
        error: '데이터베이스 쿼리 실패',
        details: err.message,
        timestamp: new Date().toISOString()
      });
    } else {
      res.json({ 
        success: true,
        message: '✅ 데이터베이스 연결 및 쿼리 성공!',
        data: {
          calculation_result: results[0].result,
          server_time: results[0].server_time,
          mysql_version: results[0].mysql_version
        },
        timestamp: new Date().toISOString()
      });
    }
  });
});

// 기존 테스트 API
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API 테스트 성공!',
    data: {
      products: ['성인용 기저귀', '방수 매트', '목욕용품 세트'],
      categories: ['위생용품', '안전용품', '편의용품'],
      server_info: 'Railway Cloud Platform'
    },
    timestamp: new Date().toISOString()
  });
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({
    error: '서버 내부 오류',
    message: '잠시 후 다시 시도해주세요.',
    timestamp: new Date().toISOString()
  });
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    error: '페이지를 찾을 수 없습니다',
    requested_url: req.url,
    available_endpoints: [
      'GET /',
      'GET /api/health', 
      'GET /api/test',
      'GET /api/db-test'
    ],
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`🌐 데이터베이스 호스트: ${process.env.DB_HOST || '설정되지 않음'}`);
  console.log(`📦 환경: ${process.env.NODE_ENV || 'development'}`);
});