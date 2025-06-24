// 고객센터 페이지 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    // 문의 유형 탭 기능
    const inquiryTabs = document.querySelectorAll('.inquiry-tab');
    const inquiryTypeSelect = document.getElementById('inquiryType');
    
    inquiryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 활성 탭 변경
            inquiryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 셀렉트 박스 값 변경
            const type = this.getAttribute('data-type');
            inquiryTypeSelect.value = type;
        });
    });
    
    // 셀렉트 박스 변경 시 탭 변경
    inquiryTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        
        inquiryTabs.forEach(tab => {
            if (tab.getAttribute('data-type') === selectedType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    });
    
    // FAQ 아코디언 기능
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // 선택한 항목 토글
            faqItem.classList.toggle('active');
            
            // 다른 항목 닫기 (선택 사항)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    // 전화번호 입력 포맷팅
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // 숫자만 남김
            
            if (value.length > 3 && value.length <= 7) {
                value = value.substring(0, 3) + '-' + value.substring(3);
            } else if (value.length > 7) {
                value = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, 11);
            }
            
            e.target.value = value;
        });
    }
    
    // 파일 업로드 검증
    const fileInput = document.getElementById('attachment');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const maxFileCount = 3;
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            
            // 파일 개수 검증
            if (files.length > maxFileCount) {
                alert(`첨부 파일은 최대 ${maxFileCount}개까지 가능합니다.`);
                this.value = '';
                return;
            }
            
            // 각 파일 크기 및 타입 검증
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                if (file.size > maxFileSize) {
                    alert(`${file.name} 파일 크기가 5MB를 초과합니다.`);
                    this.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    alert(`${file.name} 파일은 지원하지 않는 형식입니다. (JPG, PNG, PDF만 가능)`);
                    this.value = '';
                    return;
                }
            }
        });
    }
    
    // 문의하기 폼 제출
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 필수 입력 체크
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const content = document.getElementById('content').value;
            const privacyCheck = document.getElementById('privacyAgreement').checked;
            
            if (!name || !phone || !email || !subject || !content || !privacyCheck) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검증
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 전화번호 형식 검증
            const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
            if (!phonePattern.test(phone)) {
                alert('올바른 전화번호 형식(010-0000-0000)으로 입력해주세요.');
                return;
            }
            
            // 실제 구현에서는 서버로 데이터 전송
            // 여기서는 성공 메시지 표시
            alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
            
            // 폼 초기화
            inquiryForm.reset();
        });
    }
    
    // 채팅 상담 버튼
    const chatButton = document.getElementById('chatButton');
    
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            alert('실시간 상담은 현재 준비 중입니다. 문의하기 기능을 이용해주세요.');
        });
    }
    
    // 지도 API 초기화 (실제 구현 시)
    const initMap = () => {
        const mapContainer = document.querySelector('.center-map');
        
        if (mapContainer) {
            // 실제로는 카카오맵 또는 네이버맵 API 호출 코드가 들어가야 함
            // 여기서는 텍스트 메시지만 표시
            mapContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                    <div style="font-size: 16px; margin-bottom: 10px;">지도가 표시되는 영역입니다.</div>
                    <div style="font-size: 14px; color: #777;">실제 구현 시 지도 API 연동 필요</div>
                </div>
            `;
        }
    };
    
    // 지도 초기화
    initMap();
});