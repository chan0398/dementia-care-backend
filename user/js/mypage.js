// 내 신청현황 페이지 스크립트
document.addEventListener('DOMContentLoaded', function() {
    console.log('마이페이지 스크립트가 로드되었습니다.');
    
    // 모달 요소
    const detailModal = document.getElementById('detailModal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close');
    const modalClose = document.querySelector('.modal-close');
    const trackingBtn = document.getElementById('tracking-btn');
    
    // 필터 요소
    const filterTabs = document.querySelectorAll('.filter-tab');
    const timeFilter = document.getElementById('timeFilter');
    const emptyState = document.getElementById('emptyState');
    const applicationItems = document.querySelectorAll('.application-item');
    
    // 현재 선택된 상태 필터
    let currentStatusFilter = 'all';
    
    // 모달 닫기 함수
    const closeModal = () => {
        if (!modalContent || !detailModal) {
            console.error('모달 요소를 찾을 수 없습니다.');
            return;
        }
        
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            detailModal.style.display = 'none';
        }, 300);
    };
    
    // 닫기 버튼 이벤트
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // 모달 외부 클릭 이벤트
    window.addEventListener('click', function(event) {
        if (event.target === detailModal) {
            closeModal();
        }
    });
    
    // 상세보기 버튼 이벤트
    const detailButtons = document.querySelectorAll('.view-detail');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const applicationId = this.getAttribute('data-id');
            console.log('상세보기 버튼 클릭:', applicationId);
            showApplicationDetail(applicationId);
            updateDetailModal(applicationId);
        });
    });
    
    // 배송 추적 버튼 이벤트
    if (trackingBtn) {
        trackingBtn.addEventListener('click', function() {
            const applicationId = document.getElementById('detail-id').textContent;
            console.log('배송 추적 버튼 클릭:', applicationId);
            window.location.href = `delivery-tracking.html?id=${applicationId}`;
        });
    }
    
    // 상세 정보 표시 함수
    const showApplicationDetail = (applicationId) => {
        console.log('상세 정보 표시:', applicationId);
        
        // 모달 표시
        if (detailModal) {
            detailModal.style.display = 'block';
        
            // 모달 애니메이션
            if (modalContent) {
                modalContent.style.transform = 'scale(0.8)';
                modalContent.style.opacity = '0';
                setTimeout(() => {
                    modalContent.style.transition = 'all 0.3s ease';
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }, 10);
            }
        } else {
            console.error('모달 요소를 찾을 수 없습니다.');
        }
    };
    
    // 상태 필터 이벤트
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('필터 탭 클릭:', this.getAttribute('data-status'));
            
            // 활성 클래스 토글
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 필터 상태 업데이트
            currentStatusFilter = this.getAttribute('data-status');
            
            // 필터링 적용
            applyFilters();
        });
    });
    
    // 기간 필터 이벤트
    if (timeFilter) {
        timeFilter.addEventListener('change', function() {
            console.log('기간 필터 변경:', this.value);
            applyFilters();
        });
    }
    
    // 필터 적용 함수
    const applyFilters = () => {
        console.log('필터 적용:', currentStatusFilter, timeFilter ? timeFilter.value : 'all');
        
        let visibleCount = 0;
        const timeValue = timeFilter ? timeFilter.value : 'all';
        
        applicationItems.forEach(item => {
            const status = item.getAttribute('data-status');
            let isVisible = (currentStatusFilter === 'all' || status === currentStatusFilter);
            
            // 기간 필터 적용 (실제 구현에서는 날짜 비교 로직 구현)
            // 이 예제에서는 단순화를 위해 건너뜀
            
            item.style.display = isVisible ? 'flex' : 'none';
            
            if (isVisible) {
                visibleCount++;
            }
        });
        
        // 표시할 항목이 없을 경우 빈 상태 표시
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        console.log(`표시된 항목 수: ${visibleCount}`);
    };
    
    // 상세보기 모달에 정보 채우기
    const updateDetailModal = (applicationId) => {
        console.log('상세 정보 업데이트:', applicationId);
        
        // 실제 구현에서는 서버에서 데이터 가져오기
        // 여기서는 예시 데이터 사용
        let detailData = {
            '1682432345678': {
                status: 'pending',
                statusText: '승인대기',
                date: '2025.04.10',
                productName: '방수 매트',
                productInfo: '침대용 (17매)',
                quantity: '1개',
                patient: '홍길동',
                caregiver: '홍보호',
                phone: '010-1234-5678',
                address: '서울특별시 종로구 세종대로 209',
                hasTracking: false
            },
            '1682422345678': {
                status: 'delivering',
                statusText: '배송중',
                date: '2025.04.08',
                productName: '조호용 물티슈',
                productInfo: '대형 (100매)',
                quantity: '1개',
                patient: '홍길동',
                caregiver: '홍보호',
                phone: '010-1234-5678',
                address: '서울특별시 종로구 세종대로 209',
                hasTracking: true,
                trackingNumber: '1234-5678-9012',
                carrier: 'OO택배',
                trackingStage: 2 // 0~3 (인수, 시작, 배송중, 완료)
            },
            '1682412345678': {
                status: 'completed',
                statusText: '배송완료',
                date: '2025.04.05',
                productName: '성인용 기저귀',
                productInfo: '중형 (20매)',
                quantity: '2개',
                patient: '홍길동',
                caregiver: '홍보호',
                phone: '010-1234-5678',
                address: '서울특별시 종로구 세종대로 209',
                hasTracking: true,
                trackingNumber: '1234-5678-9013',
                carrier: 'OO택배',
                trackingStage: 3
            },
            '1682402345678': {
                status: 'approved',
                statusText: '승인완료',
                date: '2025.04.02',
                productName: '항균 손소독제',
                productInfo: '500ml (2개)',
                quantity: '1세트',
                patient: '홍길동',
                caregiver: '홍보호',
                phone: '010-1234-5678',
                address: '서울특별시 종로구 세종대로 209',
                hasTracking: false
            }
        };
        
        // 해당 ID의 정보 가져오기
        const data = detailData[applicationId];
        if (!data) {
            console.error('해당 ID의 데이터를 찾을 수 없습니다:', applicationId);
            return;
        }
        
        // 기본 정보 채우기
        const detailId = document.getElementById('detail-id');
        const detailDate = document.getElementById('detail-date');
        const detailName = document.getElementById('detail-name');
        const detailInfo = document.getElementById('detail-info');
        const detailQuantity = document.getElementById('detail-quantity');
        const detailPatient = document.getElementById('detail-patient');
        const detailCaregiver = document.getElementById('detail-caregiver');
        const detailPhone = document.getElementById('detail-phone');
        const detailAddress = document.getElementById('detail-address');
        
        if (detailId) detailId.textContent = applicationId;
        if (detailDate) detailDate.textContent = data.date;
        if (detailName) detailName.textContent = data.productName;
        if (detailInfo) detailInfo.textContent = data.productInfo;
        if (detailQuantity) detailQuantity.textContent = data.quantity;
        if (detailPatient) detailPatient.textContent = data.patient;
        if (detailCaregiver) detailCaregiver.textContent = data.caregiver;
        if (detailPhone) detailPhone.textContent = data.phone;
        if (detailAddress) detailAddress.textContent = data.address;
        
        // 상태 클래스 업데이트
        const statusElem = document.querySelector('.detail-header .application-status');
        if (statusElem) {
            statusElem.className = `application-status status-${data.status}`;
            statusElem.innerHTML = `<span class="status-icon"></span>${data.statusText}`;
        }
        
        // 배송 추적 정보 표시 여부
        const trackingSection = document.querySelector('.delivery-tracking');
        const trackingNumber = document.getElementById('tracking-number');
        const carrier = document.getElementById('carrier');
        
        if (trackingSection) {
            if (data.hasTracking) {
                trackingSection.style.display = 'block';
                if (trackingNumber) trackingNumber.textContent = data.trackingNumber;
                if (carrier) carrier.textContent = data.carrier;
                
                // 배송 단계 업데이트
                const statusItems = document.querySelectorAll('.tracking-status .status-item');
                if (statusItems.length > 0) {
                    statusItems.forEach((item, index) => {
                        if (index <= data.trackingStage) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
                
                // 배송추적 버튼 표시
                if (trackingBtn) trackingBtn.style.display = 'block';
            } else {
                trackingSection.style.display = 'none';
                if (trackingBtn) trackingBtn.style.display = 'none';
            }
        }
    };
    
    // 로컬 스토리지에서 신청 내역 가져오기 (실제 구현 시)
    const loadApplications = () => {
        console.log('신청 내역 로드 시도');
        
        // 로컬 스토리지에서 신청 내역 가져오기
        const applications = JSON.parse(localStorage.getItem('careSupplyApplications')) || [];
        console.log('로드된 신청 내역:', applications.length, '건');
        
        // 신청 내역이 있으면 빈 상태 숨기기
        if (applications.length > 0 && emptyState) {
            emptyState.style.display = 'none';
        } else if (emptyState) {
            emptyState.style.display = 'block';
        }
        
        // 실제 구현에서는 여기서 신청 내역을 동적으로 렌더링
    };
    
    // 페이지 로드 시 필터 적용 및 신청 내역 로드
    applyFilters();
    loadApplications();
});