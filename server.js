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
app.use(express.static('.'));

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

// 기존 코드 뒤에 추가

// 데이터베이스 초기화 API (테이블 생성)
app.post('/api/init-database', (req, res) => {
  const promiseDb = db.promise();
  
  // 테이블 생성 SQL들
  const createTables = [
    // users 테이블
    `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      address TEXT,
      user_type ENUM('patient', 'caregiver') DEFAULT 'caregiver',
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    // products 테이블  
    `CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100) NOT NULL,
      max_quantity_per_month INT DEFAULT 1,
      image_url VARCHAR(500),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // applications 테이블
    `CREATE TABLE IF NOT EXISTS applications (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      status ENUM('pending', 'approved', 'rejected', 'shipped', 'delivered') DEFAULT 'pending',
      delivery_address TEXT NOT NULL,
      request_note TEXT,
      admin_note TEXT,
      tracking_number VARCHAR(100),
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      approved_at TIMESTAMP NULL,
      shipped_at TIMESTAMP NULL,
      delivered_at TIMESTAMP NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`
  ];
  
  // 순차적으로 테이블 생성
  Promise.all(createTables.map(sql => promiseDb.query(sql)))
    .then(() => {
      res.json({
        success: true,
        message: '✅ 데이터베이스 테이블이 성공적으로 생성되었습니다!',
        tables: ['users', 'products', 'applications'],
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 테이블 생성 에러:', err);
      res.status(500).json({
        success: false,
        error: '테이블 생성 실패',
        details: err.message,
        timestamp: new Date().toISOString()
      });
    });
});

// 샘플 데이터 삽입 API
app.post('/api/insert-sample-data', (req, res) => {
  const promiseDb = db.promise();
  
  const sampleProducts = [
    ['성인용 기저귀', '대형 사이즈 기저귀 (20매)', '위생용품', 2, 'https://example.com/diaper.jpg'],
    ['방수 매트', '침대용 방수 매트 (10매)', '위생용품', 1, 'https://example.com/mat.jpg'],
    ['목욕용품 세트', '샴푸, 바디워시 포함', '위생용품', 1, 'https://example.com/bath.jpg'],
    ['일회용 장갑', '니트릴 장갑 (100매)', '안전용품', 1, 'https://example.com/gloves.jpg'],
    ['항균 손소독제', '500ml 대용량', '위생용품', 2, 'https://example.com/sanitizer.jpg']
  ];
  
  const insertProductSQL = `
    INSERT INTO products (name, description, category, max_quantity_per_month, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  Promise.all(sampleProducts.map(product => 
    promiseDb.query(insertProductSQL, product)
  ))
    .then(() => {
      res.json({
        success: true,
        message: '✅ 샘플 조호물품 데이터가 삽입되었습니다!',
        inserted_products: sampleProducts.length,
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 샘플 데이터 삽입 에러:', err);
      res.status(500).json({
        success: false,
        error: '샘플 데이터 삽입 실패',
        details: err.message,
        timestamp: new Date().toISOString()
      });
    });
});

// 조호물품 목록 조회 API
app.get('/api/products', (req, res) => {
  const promiseDb = db.promise();
  
  promiseDb.query('SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC')
    .then(([results]) => {
      res.json({
        success: true,
        message: '조호물품 목록 조회 성공',
        data: results,
        total_count: results.length,
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 상품 조회 에러:', err);
      res.status(500).json({
        success: false,
        error: '상품 조회 실패',
        details: err.message,
        timestamp: new Date().toISOString()
      });
    });
});

// 회원가입 API
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, phone, address, user_type } = req.body;
  const promiseDb = db.promise();
  
  // 입력 검증
  if (!email || !password || !name || !phone) {
    return res.status(400).json({
      success: false,
      error: '필수 정보가 누락되었습니다',
      required_fields: ['email', 'password', 'name', 'phone'],
      timestamp: new Date().toISOString()
    });
  }
  
  // 이메일 중복 확인 후 사용자 등록
  promiseDb.query('SELECT id FROM users WHERE email = ?', [email])
    .then(([existing]) => {
      if (existing.length > 0) {
        throw new Error('이미 등록된 이메일입니다');
      }
      
      // 새 사용자 등록
      return promiseDb.query(
        'INSERT INTO users (email, password, name, phone, address, user_type) VALUES (?, ?, ?, ?, ?, ?)',
        [email, password, name, phone, address || '', user_type || 'caregiver']
      );
    })
    .then(([result]) => {
      res.json({
        success: true,
        message: '✅ 회원가입이 완료되었습니다!',
        user_id: result.insertId,
        status: 'pending_approval',
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 회원가입 에러:', err);
      res.status(500).json({
        success: false,
        error: err.message || '회원가입 처리 실패',
        timestamp: new Date().toISOString()
      });
    });
});

// 로그인 API (간단 버전)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const promiseDb = db.promise();
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: '이메일과 비밀번호를 입력해주세요',
      timestamp: new Date().toISOString()
    });
  }
  
  promiseDb.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password])
    .then(([users]) => {
      if (users.length === 0) {
        throw new Error('이메일 또는 비밀번호가 잘못되었습니다');
      }
      
      const user = users[0];
      
      if (user.status !== 'approved') {
        throw new Error('계정이 아직 승인되지 않았습니다. 관리자 승인을 기다려주세요.');
      }
      
      res.json({
        success: true,
        message: '✅ 로그인 성공!',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          user_type: user.user_type,
          status: user.status
        },
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 로그인 에러:', err);
      res.status(401).json({
        success: false,
        error: err.message || '로그인 실패',
        timestamp: new Date().toISOString()
      });
    });
});

// 물품 신청 API
app.post('/api/applications', (req, res) => {
  const { user_id, product_id, quantity, delivery_address, request_note } = req.body;
  const promiseDb = db.promise();
  
  if (!user_id || !product_id || !quantity || !delivery_address) {
    return res.status(400).json({
      success: false,
      error: '필수 정보가 누락되었습니다',
      required_fields: ['user_id', 'product_id', 'quantity', 'delivery_address'],
      timestamp: new Date().toISOString()
    });
  }
  
  // 사용자와 상품 정보 확인 후 신청 처리
  Promise.all([
    promiseDb.query('SELECT * FROM users WHERE id = ? AND status = "approved"', [user_id]),
    promiseDb.query('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [product_id])
  ])
    .then(([[users], [products]]) => {
      if (users.length === 0) {
        throw new Error('승인된 사용자가 아닙니다');
      }
      if (products.length === 0) {
        throw new Error('존재하지 않는 상품입니다');
      }
      
      const product = products[0];
      if (quantity > product.max_quantity_per_month) {
        throw new Error(`최대 신청 가능 수량: ${product.max_quantity_per_month}개`);
      }
      
      // 신청 내역 저장
      return promiseDb.query(
        'INSERT INTO applications (user_id, product_id, quantity, delivery_address, request_note) VALUES (?, ?, ?, ?, ?)',
        [user_id, product_id, quantity, delivery_address, request_note || '']
      );
    })
    .then(([result]) => {
      res.json({
        success: true,
        message: '✅ 조호물품 신청이 완료되었습니다!',
        application_id: result.insertId,
        status: 'pending',
        message_detail: '담당자 검토 후 승인 처리됩니다.',
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 신청 처리 에러:', err);
      res.status(500).json({
        success: false,
        error: err.message || '신청 처리 실패',
        timestamp: new Date().toISOString()
      });
    });
});

// 내 신청 내역 조회 API
app.get('/api/applications/my/:user_id', (req, res) => {
  const { user_id } = req.params;
  const promiseDb = db.promise();
  
  const query = `
    SELECT 
      a.*,
      p.name as product_name,
      p.description as product_description,
      p.category as product_category,
      u.name as user_name,
      u.email as user_email
    FROM applications a
    JOIN products p ON a.product_id = p.id
    JOIN users u ON a.user_id = u.id
    WHERE a.user_id = ?
    ORDER BY a.applied_at DESC
  `;
  
  promiseDb.query(query, [user_id])
    .then(([results]) => {
      res.json({
        success: true,
        message: '신청 내역 조회 성공',
        data: results,
        total_count: results.length,
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 신청 내역 조회 에러:', err);
      res.status(500).json({
        success: false,
        error: '신청 내역 조회 실패',
        details: err.message,
        timestamp: new Date().toISOString()
      });
    });
});

// 관리자용 사용자 승인 API
app.post('/api/admin/approve-user', (req, res) => {
  const { user_id, action } = req.body; // action: 'approve' or 'reject'
  const promiseDb = db.promise();
  
  if (!user_id || !action) {
    return res.status(400).json({
      success: false,
      error: '사용자 ID와 처리 액션이 필요합니다',
      timestamp: new Date().toISOString()
    });
  }
  
  const newStatus = action === 'approve' ? 'approved' : 'rejected';
  
  promiseDb.query('UPDATE users SET status = ? WHERE id = ?', [newStatus, user_id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        throw new Error('존재하지 않는 사용자입니다');
      }
      
      res.json({
        success: true,
        message: `✅ 사용자가 ${action === 'approve' ? '승인' : '거절'}되었습니다`,
        user_id: user_id,
        new_status: newStatus,
        timestamp: new Date().toISOString()
      });
    })
    .catch((err) => {
      console.error('❌ 사용자 승인 처리 에러:', err);
      res.status(500).json({
        success: false,
        error: err.message || '사용자 승인 처리 실패',
        timestamp: new Date().toISOString()
      });
    });
});