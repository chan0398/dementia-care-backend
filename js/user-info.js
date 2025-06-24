document.addEventListener('DOMContentLoaded', function() {
    // 사이드바 탭 기능
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // 모든 메뉴 아이템에서 active 클래스 제거
            sidebarItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // 클릭한 메뉴 아이템에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 탭 패널 숨기기
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // 선택한 탭 패널 표시
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 개인정보 폼 제출
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 데이터 유효성 검사 및 서버 전송 로직 (실제 구현 시)
            alert('개인정보가 수정되었습니다.');
        });
    }
    
    // 환자정보 폼 제출
    const patientForm = document.getElementById('patientForm');
    
    if (patientForm) {
        patientForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 데이터 유효성 검사 및 서버 전송 로직 (실제 구현 시)
            alert('환자정보가 수정되었습니다.');
        });
    }
    
    // 비밀번호 변경 폼 제출
    const passwordForm = document.getElementById('passwordForm');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 입력 검증
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            
            // 새 비밀번호 일치 여부 확인
            if (newPassword !== confirmPassword) {
                alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
            
            // 비밀번호 패턴 검사
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passwordPattern.test(newPassword)) {
                alert('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상 입력해주세요.');
                return;
            }
            
            // 비밀번호 변경 로직 (실제 구현 시 서버 통신 필요)
            // 여기서는 임의로 성공 메시지만 표시
            alert('비밀번호가 성공적으로 변경되었습니다.');
            
            // 폼 초기화
            this.reset();
        });
    }
    
    // 알림 설정 저장
    const saveNotificationBtn = document.getElementById('saveNotificationBtn');
    
    if (saveNotificationBtn) {
        saveNotificationBtn.addEventListener('click', function() {
            // 알림 설정 저장 로직 (실제 구현 시 서버 통신 필요)
            alert('알림 설정이 저장되었습니다.');
        });
    }
    
    // 서류 업로드 버튼
    const uploadDocumentBtn = document.getElementById('uploadDocumentBtn');
    
    if (uploadDocumentBtn) {
        uploadDocumentBtn.addEventListener('click', function() {
            const fileInput = document.getElementById('newDocument');
            
            if (fileInput.files.length === 0) {
                alert('업로드할 파일을 선택해주세요.');
                return;
            }
            
            // 파일 크기 및 형식 검증
            let isValid = true;
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const fileSize = Math.round(file.size / 1024 / 1024 * 100) / 100; // MB 단위
                
                if (fileSize > 5) {
                    alert(`파일 '${file.name}'의 크기가 5MB를 초과합니다. 더 작은 파일을 선택해주세요.`);
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                return;
            }
            
            // 파일 업로드 로직 (실제 구현 시 서버 통신 필요)
            alert('증빙서류가 업로드되었습니다. 관리자 검토 후 승인됩니다.');
            
            // 파일 입력 초기화
            fileInput.value = '';
        });
    }
    
    // 서류 삭제 버튼
    const documentDeleteBtns = document.querySelectorAll('.document-item .btn-delete');
    
    documentDeleteBtns.forEach(button => {
        button.addEventListener('click', function() {
            const documentItem = this.closest('.document-item');
            const documentName = documentItem.querySelector('.document-name').textContent;
            
            if (confirm(`'${documentName}' 파일을 삭제하시겠습니까?`)) {
                // 서류 삭제 로직 (실제 구현 시 서버 통신 필요)
                documentItem.remove();
                alert('서류가 삭제되었습니다.');
            }
        });
    });
    
    // 새 배송지 추가 버튼
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressModal = document.getElementById('addressModal');
    const addressModalContent = document.querySelector('#addressModal .modal-content');
    const addressModalClose = document.querySelector('#addressModal .close');
    const modalCloseBtn = document.querySelector('#addressModal .modal-close');
    
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function() {
            // 모달 폼 초기화
            document.getElementById('addressForm').reset();
            
            // 모달 표시
            addressModal.style.display = 'block';
            
            // 모달 애니메이션
            addressModalContent.style.transform = 'scale(0.8)';
            addressModalContent.style.opacity = '0';
            setTimeout(() => {
                addressModalContent.style.transition = 'all 0.3s ease';
                addressModalContent.style.transform = 'scale(1)';
                addressModalContent.style.opacity = '1';
            }, 10);
        });
    }
    
    // 배송지 수정 버튼
    const addressEditBtns = document.querySelectorAll('.address-action .btn-edit');
    
    addressEditBtns.forEach(button => {
        button.addEventListener('click', function() {
            const addressItem = this.closest('.address-item');
            const isDefault = addressItem.classList.contains('default');
            const addressInfo = addressItem.querySelector('.address-details');
            const addressLines = addressInfo.querySelectorAll('p');
            
            // 모달 폼에 데이터 채우기
            document.getElementById('addressName').value = addressItem.querySelector('.address-name span').textContent;
            document.getElementById('recipientName').value = addressLines[0].textContent;
            document.getElementById('recipientPhone').value = addressLines[1].textContent;
            
            // 주소 파싱 (예시: "(04524) 서울특별시 종로구 종로1길 1, 101동 202호")
            const fullAddress = addressLines[2].textContent;
            const zipCodeMatch = fullAddress.match(/\((\d+)\)/);
            const zipCode = zipCodeMatch ? zipCodeMatch[1] : '';
            
            let baseAddress = fullAddress.replace(/\(\d+\)\s/, '');
            let detailAddress = '';
            
            const commaIndex = baseAddress.indexOf(',');
            if (commaIndex !== -1) {
                detailAddress = baseAddress.substring(commaIndex + 1).trim();
                baseAddress = baseAddress.substring(0, commaIndex).trim();
            }
            
            document.getElementById('zipCode').value = zipCode;
            document.getElementById('address1').value = baseAddress;
            document.getElementById('address2').value = detailAddress;
            document.getElementById('isDefault').checked = isDefault;
            
            // 모달 표시
            addressModal.style.display = 'block';
            
            // 모달 애니메이션
            addressModalContent.style.transform = 'scale(0.8)';
            addressModalContent.style.opacity = '0';
            setTimeout(() => {
                addressModalContent.style.transition = 'all 0.3s ease';
                addressModalContent.style.transform = 'scale(1)';
                addressModalContent.style.opacity = '1';
            }, 10);
        });
    });
    
    // 모달 닫기
    const closeAddressModal = () => {
        addressModalContent.style.transition = 'all 0.3s ease';
        addressModalContent.style.transform = 'scale(0.8)';
        addressModalContent.style.opacity = '0';
        
        setTimeout(() => {
            addressModal.style.display = 'none';
        }, 300);
    };
    
    if (addressModalClose) {
        addressModalClose.addEventListener('click', closeAddressModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeAddressModal);
    }
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === addressModal) {
            closeAddressModal();
        }
    });
    
    // 주소 찾기 버튼 (배송지 모달)
    const searchAddressBtn = document.getElementById('searchAddressBtn');
    
    if (searchAddressBtn) {
        searchAddressBtn.addEventListener('click', function() {
            // 임시 구현: 실제로는 우편번호 검색 API를 연동해야 함
            alert('우편번호 검색 기능은 실제 구현 시 카카오 또는 다음 우편번호 API를 연동해야 합니다.');
            document.getElementById('zipCode').value = '04524';
            document.getElementById('address1').value = '서울특별시 종로구 종로1길 1';
        });
    }
    
    // 환자 정보의 주소 찾기 버튼
    const searchPatientAddressBtn = document.getElementById('searchPatientAddressBtn');
    
    if (searchPatientAddressBtn) {
        searchPatientAddressBtn.addEventListener('click', function() {
            // 임시 구현
            alert('우편번호 검색 기능은 실제 구현 시 카카오 또는 다음 우편번호 API를 연동해야 합니다.');
            document.getElementById('patientPostcode').value = '04524';
            document.getElementById('patientAddress').value = '서울특별시 종로구 종로1길 1';
        });
    }
    
    // 주소 폼 제출
    const addressForm = document.getElementById('addressForm');
    
    if (addressForm) {
        addressForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 주소 저장 로직 (실제 구현 시 서버 통신 필요)
            alert('배송지가 저장되었습니다.');
            
            // 모달 닫기
            closeAddressModal();
        });
    }
    
    // 배송지 삭제 버튼
    const addressDeleteBtns = document.querySelectorAll('.address-action .btn-delete');
    
    addressDeleteBtns.forEach(button => {
        button.addEventListener('click', function() {
            const addressItem = this.closest('.address-item');
            const addressName = addressItem.querySelector('.address-name span').textContent;
            
            if (confirm(`'${addressName}' 배송지를 삭제하시겠습니까?`)) {
                // 배송지 삭제 로직 (실제 구현 시 서버 통신 필요)
                addressItem.remove();
                alert('배송지가 삭제되었습니다.');
            }
        });
    });
    
    // 기본 배송지 설정 버튼
    const setDefaultBtns = document.querySelectorAll('.address-action .btn-default');
    
    setDefaultBtns.forEach(button => {
        button.addEventListener('click', function() {
            const addressItem = this.closest('.address-item');
            const addressName = addressItem.querySelector('.address-
setDefaultBtns.forEach(button => {
        button.addEventListener('click', function() {
            const addressItem = this.closest('.address-item');
            const addressName = addressItem.querySelector('.address-name span').textContent;
            
            // 기존 기본 배송지에서 기본 표시 제거
            const currentDefault = document.querySelector('.address-item.default');
            if (currentDefault) {
                currentDefault.classList.remove('default');
                const badge = currentDefault.querySelector('.badge-default');
                if (badge) badge.remove();
                const setDefaultBtn = document.createElement('button');
                setDefaultBtn.type = 'button';
                setDefaultBtn.className = 'btn-text btn-default';
                setDefaultBtn.textContent = '기본 배송지 설정';
                setDefaultBtn.addEventListener('click', function() {
                    const item = this.closest('.address-item');
                    const name = item.querySelector('.address-name span').textContent;
                    setDefaultAddress(item, name);
                });
                currentDefault.querySelector('.address-action').appendChild(setDefaultBtn);
            }
            
            // 선택한 배송지를 기본 배송지로 설정
            setDefaultAddress(addressItem, addressName);
        });
    });
    
    // 기본 배송지 설정 함수
    function setDefaultAddress(addressItem, addressName) {
        // 기본 배송지 표시 추가
        addressItem.classList.add('default');
        
        // 기본 배지 추가
        const nameSpan = addressItem.querySelector('.address-name');
        if (!nameSpan.querySelector('.badge-default')) {
            const badge = document.createElement('span');
            badge.className = 'badge-default';
            badge.textContent = '기본';
            nameSpan.appendChild(badge);
        }
        
        // 기본 배송지 설정 버튼 제거
        const defaultBtn = addressItem.querySelector('.btn-default');
        if (defaultBtn) defaultBtn.remove();
        
        // 알림 표시
        alert(`'${addressName}' 배송지가 기본 배송지로 설정되었습니다.`);
    }
    
    // 휴대폰 번호 변경
    const changePhoneBtn = document.getElementById('changePhoneBtn');
    
    if (changePhoneBtn) {
        changePhoneBtn.addEventListener('click', function() {
            const phoneInput = document.getElementById('phone');
            const currentPhone = phoneInput.value;
            
            // 간단한 예시 구현: 실제로는 인증 과정이 필요
            const newPhone = prompt('새로운 휴대폰 번호를 입력하세요.\n(예: 010-1234-5678)', currentPhone);
            
            if (newPhone && newPhone !== currentPhone) {
                // 휴대폰 번호 형식 검증
                const phonePattern = /^01[0-9]-[0-9]{4}-[0-9]{4}$/;
                if (!phonePattern.test(newPhone)) {
                    alert('올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)');
                    return;
                }
                
                // 번호 변경 로직 (실제 구현 시 인증 절차와 서버 통신 필요)
                phoneInput.value = newPhone;
                alert('휴대폰 번호가 변경되었습니다. 실제 서비스에서는 인증 과정이 필요합니다.');
            }
        });
    }
});