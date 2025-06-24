document.addEventListener('DOMContentLoaded', function() {
    // 로그인 폼 제출 이벤트
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const userId = document.getElementById('userId').value;
            const password = document.getElementById('password').value;
            
            // 입력 검증
            if (!userId || !password) {
                alert('아이디와 비밀번호를 모두 입력해주세요.');
                return;
            }
            
            // 로그인 처리 로직 (실제 구현 시 서버 통신 필요)
            // 여기서는 임의로 성공 처리
            alert('로그인되었습니다.');
            
            // 메인 페이지로 이동
            window.location.href = '../index.html';
        });
    }
    
    // 회원가입 파라미터 확인 (회원가입 완료 후 리다이렉트된 경우)
    const checkRegistrationParam = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const registered = urlParams.get('registered');
        
        if (registered === 'true') {
            alert('회원가입이 완료되었습니다. 관리자 승인 후 로그인이 가능합니다.');
        }
    };
    
    // 아이디/비밀번호 찾기 모달
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const modalContent = document.querySelector('#forgotPasswordModal .modal-content');
    const closeBtn = document.querySelector('#forgotPasswordModal .close');
    
    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            // 모달 표시
            forgotPasswordModal.style.display = 'block';
            
            // 모달 애니메이션
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        });
    }
    
    // 모달 닫기
    const closeModal = () => {
        if (!modalContent) return;
        
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            if (forgotPasswordModal) {
                forgotPasswordModal.style.display = 'none';
            }
        }, 300);
    };
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === forgotPasswordModal) {
            closeModal();
        }
    });
    
    // 아이디 찾기 폼 제출
    const findIdForm = document.getElementById('findIdForm');
    
    if (findIdForm) {
        findIdForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('findName').value;
            const phone = document.getElementById('findPhone').value;
            
            // 입력 검증
            if (!name || !phone) {
                alert('이름과 휴대폰 번호를 모두 입력해주세요.');
                return;
            }
            
            // 아이디 찾기 로직 (실제 구현 시 서버 통신 필요)
            // 여기서는 임의로 성공 메시지 표시
            alert('회원님의 아이디는 "hong123"입니다.');
        });
    }
    
    // 비밀번호 찾기 폼 제출
    const findPasswordForm = document.getElementById('findPasswordForm');
    
    if (findPasswordForm) {
        findPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('resetUsername').value;
            const email = document.getElementById('resetEmail').value;
            
            // 입력 검증
            if (!username || !email) {
                alert('아이디와 이메일을 모두 입력해주세요.');
                return;
            }
            
            // 비밀번호 찾기 로직 (실제 구현 시 서버 통신 필요)
            // 여기서는 임의로 성공 메시지 표시
            alert('임시 비밀번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.');
        });
    }
    
    // 탭 기능
    const setupTabs = () => {
        const tabLinks = document.querySelectorAll('.nav-link');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                // 모든 탭 링크에서 active 클래스 제거
                tabLinks.forEach(item => {
                    item.parentElement.classList.remove('active');
                });
                
                // 현재 탭 링크에 active 클래스 추가
                this.parentElement.classList.add('active');
                
                // 모든 탭 패널 숨기기
                tabPanes.forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // 해당 탭 패널 표시
                const targetId = this.getAttribute('href').substring(1);
                const targetPane = document.getElementById(targetId);
                
                if (targetPane) {
                    targetPane.classList.add('show', 'active');
                }
            });
        });
    };
    
    // 초기화 함수 호출
    checkRegistrationParam();
    setupTabs();
});