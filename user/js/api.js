// API 기본 설정
const API_CONFIG = {
    baseURL: 'https://dementia-care-backend-production.up.railway.app',
    headers: {
        'Content-Type': 'application/json'
    }
};

// 현재 로그인한 사용자 정보 저장
let currentUser = null;

// 로컬 스토리지에서 사용자 정보 불러오기
function loadUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
    }
}

// 로컬 스토리지에 사용자 정보 저장
function saveUserToStorage(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// 로그아웃 (사용자 정보 삭제)
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// API 호출 공통 함수
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method: method,
            headers: API_CONFIG.headers
        };
        
        if (data) {
            config.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! status: ${response.status}`);
        }
        
        return result;
    } catch (error) {
        console.error('API 호출 에러:', error);
        throw error;
    }
}

// 회원가입 API
async function registerUser(userData) {
    return await apiCall('/api/auth/register', 'POST', userData);
}

// 로그인 API
async function loginUser(email, password) {
    const result = await apiCall('/api/auth/login', 'POST', { email, password });
    if (result.success) {
        saveUserToStorage(result.user);
    }
    return result;
}

// 조호물품 목록 조회
async function getProducts() {
    return await apiCall('/api/products');
}

// 물품 신청
async function applyForProduct(applicationData) {
    return await apiCall('/api/applications', 'POST', applicationData);
}

// 내 신청 내역 조회
async function getMyApplications(userId) {
    return await apiCall(`/api/applications/my/${userId}`);
}

// 사용자 인증 확인
function checkAuth() {
    loadUserFromStorage();
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 페이지 로드 시 사용자 정보 확인
document.addEventListener('DOMContentLoaded', function() {
    loadUserFromStorage();
    
    // 로그인이 필요한 페이지인지 확인
    const protectedPages = ['application.html', 'mypage.html', 'myinfo.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        alert('로그인이 필요한 페이지입니다.');
        window.location.href = 'login.html';
    }
    
    // 헤더 사용자 정보 업데이트
    updateHeaderUserInfo();
});

// 헤더의 사용자 정보 업데이트
function updateHeaderUserInfo() {
    const utilityMenu = document.querySelector('.utility-menu');
    if (utilityMenu && currentUser) {
        utilityMenu.innerHTML = `
            <span>안녕하세요, ${currentUser.name}님!</span>
            <a href="mypage.html">내 정보</a>
            <a href="#" onclick="logout()">로그아웃</a>
            <a href="customer-service.html">고객센터</a>
        `;
    }
}

// 에러 메시지 표시
function showError(message) {
    alert(message);
}

// 성공 메시지 표시
function showSuccess(message) {
    alert(message);
}

// 로딩 상태 표시
function showLoading(button) {
    button.disabled = true;
    button.innerHTML = '처리중...';
}

// 로딩 상태 해제
function hideLoading(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}