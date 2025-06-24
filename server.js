const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 데이터베이스 연결 풀 사용 (더 안정적)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  reconnect: true,
  acquireTimeout: 60000,
  timeout: 60000
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
    database: {
      host: process.env.DB_HOST ? '설정됨' : '설정 안됨',
      configured: !!process.env.DB_HOST
    },
    version: '1.1.0'
  });
});

// 헬스체크 API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 데이터베이스 연결 테스트 API (개선된 버전)
app.get('/api/db-test', (req, res) => {
  // 환경변수 확인
  if (!process.env.DB_HOST) {
    return res.status(500).json({
      success: false,
      error: '데이터베이스 환경변수가 설정되지 않았습니다',
      missing_vars: {
        DB_HOST: !!process.env.DB_HOST,
        DB_PORT: !!process.env.DB_PORT,
        DB_USER: !!process.env.DB_USER,
        DB_PASSWORD: !!process.env.DB_PASSWORD,
        DB_NAME: !!process.env.DB_NAME
      },
      timestamp: new Date().toISOString()
    });
  }

  // Promise 방식으로 안전한 쿼리 실행
  const promiseDb = db.promise();
  
  promiseDb.query('SELECT 1 + 1 AS result, NOW() as server_time, VERSION() as mysql_version')
    .then(([results]) => {
      res.json({ 
        success: true,
        message: '✅ 데이터베이스 연결 및 쿼리 성공!',
        data: {
          calculation_result: results[0].result,
          server_time: results[0].server_time,
          mysql_version: results[0].mysql_version
        },
        connection_info: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME
        },
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ DB 쿼리 에러:', err);
      res.status(500).json({ 
        success: false,
        error: '데이터베이스 쿼리 실패',
        details: err.message,
        error_code: err.code,
        connection_info: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME
        },
        timestamp: new Date().toISOString()
      });
    });
});

// 환경변수 확인 API (디버깅용)
app.get('/api/env-check', (req, res) => {
  res.json({
    message: '환경변수 상태 확인',
    variables: {
      DB_HOST: process.env.DB_HOST ? '설정됨' : '설정 안됨',
      DB_PORT: process.env.DB_PORT ? '설정됨' : '설정 안됨',
      DB_USER: process.env.DB_USER ? '설정됨' : '설정 안됨',
      DB_PASSWORD: process.env.DB_PASSWORD ? '설정됨' : '설정 안됨',
      DB_NAME: process.env.DB_NAME ? '설정됨' : '설정 안됨',
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || '3000'
    },
    timestamp: new Date().toISOString()
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

// 에러 처리
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({
    error: '서버 내부 오류',
    message: '잠시 후 다시 시도해주세요.',
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다.`);
  console.log(`🌐 데이터베이스 호스트: ${process.env.DB_HOST || '설정되지 않음'}`);
  console.log(`📦 환경: ${process.env.NODE_ENV || 'development'}`);
  
  // 환경변수 확인
  const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ 누락된 환경변수:', missingVars);
  } else {
    console.log('✅ 모든 데이터베이스 환경변수가 설정되었습니다.');
  }
});