document.addEventListener('DOMContentLoaded', function() {
    // 모든 약관에 동의 체크박스 이벤트
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const agreementCheckboxes = document.querySelectorAll('input[name="ageAgreement"], input[name="termsAgreement"], input[name="privacyAgreement"]');
    
    if (agreeAllCheckbox) {
        agreeAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            
            agreementCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }
    
    // 개별 약관 체크박스 변경 시 전체 동의 체크박스 상태 업데이트
    agreementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(agreementCheckboxes).every(cb => cb.checked);
            if (agreeAllCheckbox) {
                agreeAllCheckbox.checked = allChecked;
            }
        });
    });
    
    // 회원가입 폼 제출 이벤트
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 필수 입력 확인 및 유효성 검사 로직
            // 비밀번호 확인
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
            
            if (password !== passwordConfirm) {
                alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
            
            // 비밀번호 패턴 검사 - 10자 이상, 영문, 숫자, 특수문자 포함
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
            if (!passwordPattern.test(password)) {
                alert('비밀번호는 10자 이상이면서 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
                return;
            }
            
            // 이메일 유효성 검사
            const email = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 필수 약관 동의 확인
            const requiredAgreements = document.querySelectorAll('input[type="checkbox"][required]');
            const allAgreed = Array.from(requiredAgreements).every(checkbox => checkbox.checked);
            
            if (!allAgreed) {
                alert('필수 약관에 모두 동의해주세요.');
                return;
            }
            
            // 회원가입 처리 로직 (실제 구현 시 서버 통신 필요)
            alert('회원가입이 완료되었습니다. 관리자 승인 후 서비스 이용이 가능합니다.');
            
            // 승인 대기 페이지 또는 로그인 페이지로 이동
            window.location.href = 'login.html?registered=true';
        });
    }
});