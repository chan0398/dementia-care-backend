// 배송 조회 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    console.log('배송 조회 페이지 스크립트 로드됨');
    
    // 운송장번호 복사 기능
    const copyTrackingBtn = document.getElementById('copyTrackingBtn');
    const copyTooltip = document.querySelector('.copy-tooltip');
    
    if (copyTrackingBtn) {
        copyTrackingBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // 운송장번호 가져오기
            const trackingNumber = document.querySelector('.tracking-number span').textContent;
            
            // 클립보드에 복사
            navigator.clipboard.writeText(trackingNumber)
                .then(() => {
                    // 툴팁 표시
                    copyTooltip.classList.add('show');
                    setTimeout(() => {
                        copyTooltip.classList.remove('show');
                    }, 2000);
                })
                .catch(err => {
                    console.error('클립보드 복사 실패:', err);
                    alert('클립보드 복사에 실패했습니다. 직접 번호를 선택하여 복사해주세요.');
                });
        });
    }
    
    // 상태 새로고침 버튼
    const refreshStatusBtn = document.getElementById('refreshStatusBtn');
    
    if (refreshStatusBtn) {
        refreshStatusBtn.addEventListener('click', function() {
            // 로딩 효과 표시
            this.disabled = true;
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="refresh-icon">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                업데이트 중...
            `;
            
            // 실제 구현에서는 서버에서 최신 배송 상태를 가져와야 함
            // 여기서는 시뮬레이션만 진행
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="refresh-icon">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                    새로고침
                `;
                
                // 데이터 업데이트 시각 표시
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                
                // 알림 표시
                const updateMessage = document.createElement('div');
                updateMessage.className = 'alert alert-success';
                updateMessage.style.cssText = 'background-color: #e8f5e9; color: #2e7d32; padding: 10px; border-radius: 4px; margin-top: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;';
                updateMessage.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>배송 정보가 업데이트되었습니다. (${hours}:${minutes})</span>
                `;
                
                const detailsContainer = document.querySelector('.tracking-details');
                detailsContainer.insertBefore(updateMessage, detailsContainer.firstChild);
                
                // 5초 후 알림 사라짐
                setTimeout(() => {
                    updateMessage.style.transition = 'opacity 0.5s ease';
                    updateMessage.style.opacity = '0';
                    setTimeout(() => {
                        updateMessage.remove();
                    }, 500);
                }, 5000);
                
                // 임의로 위치 업데이트
                updateCurrentLocation();
                
                // 배송 이력에 새 항목 추가 여부 결정 (약 30% 확률)
                if (Math.random() > 0.7) {
                    addNewTrackingStatus();
                }
            }, 1500);
        });
    }
    
    // 현재 위치 업데이트 함수
    const updateCurrentLocation = () => {
        const currentLocation = document.getElementById('currentLocation');
        if (!currentLocation) return;
        
        // 인근 지역 목록
        const locations = [
            '서울특별시 용산구 이촌동',
            '서울특별시 용산구 한남동',
            '서울특별시 종로구 효자동',
            '서울특별시 종로구 청운동'
        ];
        
        // 랜덤 위치 선택
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        currentLocation.textContent = randomLocation;
        
        // 위치 변경 효과
        currentLocation.style.backgroundColor = '#fff3cd';
        currentLocation.style.transition = 'background-color 2s ease';
        
        setTimeout(() => {
            currentLocation.style.backgroundColor = '';
        }, 2000);
    }
    
    // 새 배송 상태 추가 함수
    const addNewTrackingStatus = () => {
        const trackingDetailItems = document.querySelector('.tracking-details');
        if (!trackingDetailItems) return;
        
        const firstDetailItem = trackingDetailItems.querySelector('.tracking-detail-item');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        // 가능한 상태 메시지들
        const statusMessages = [
            {
                title: '[서울 용산구] 배송중',
                message: '배송기사가 배송지로 이동 중입니다. 잠시만 기다려주세요.'
            },
            {
                title: '[용산 배송점] 출발',
                message: '조호물품이 최종 배송지로 출발했습니다. 오늘 도착 예정입니다.'
            },
            {
                title: '[종로 지역] 배송중',
                message: '배송기사가 다른 배송지 경유 후 도착 예정입니다.'
            }
        ];
        
        // 랜덤 메시지 선택
        const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];
        
        const newDetailItem = document.createElement('div');
        newDetailItem.className = 'tracking-detail-item';
        newDetailItem.innerHTML = `
            <div class="detail-time">
                <div class="detail-time-value">${hours}:${minutes}</div>
                <div class="detail-time-date">2025.04.21</div>
            </div>
            <div class="detail-circle active">5</div>
            <div class="detail-status">
                <div class="detail-message">
                    <strong>${randomStatus.title}</strong>
                    ${randomStatus.message}
                </div>
            </div>
        `;
        
        // 기존 활성 원 비활성화
        const activeCircles = trackingDetailItems.querySelectorAll('.detail-circle.active');
        activeCircles.forEach(circle => {
            circle.classList.remove('active');
        });
        
        // 새 항목 추가
        trackingDetailItems.insertBefore(newDetailItem, firstDetailItem);
        
        // 애니메이션 효과로 강조
        newDetailItem.style.backgroundColor = '#fffde7';
        setTimeout(() => {
            newDetailItem.style.transition = 'background-color 1s ease';
            newDetailItem.style.backgroundColor = '';
        }, 100);
        
        // 상태 진행바 업데이트
        updateProgressBar();
    }
    
    // 진행바 업데이트
    const updateProgressBar = () => {
        const progressBar = document.querySelector('.tracking-timeline-progress');
        if (!progressBar) return;
        
        // 현재 너비 가져오기
        const currentWidth = parseInt(progressBar.style.width) || 65;
        
        // 80%를 넘지 않도록 진행바 증가 (배송완료는 UI에서 특별히 처리)
        if (currentWidth < 80) {
            const newWidth = Math.min(currentWidth + 5, 80);
            progressBar.style.width = `${newWidth}%`;
        }
    }
    
    // 탭 기능
    const setupTabs = () => {
        const trackingTabs = document.querySelectorAll('.tracking-tab');
        const trackingContents = document.querySelectorAll('.tracking-content');
        
        trackingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 모든 탭에서 active 클래스 제거
                trackingTabs.forEach(tab => tab.classList.remove('active'));
                trackingContents.forEach(content => content.classList.remove('active'));
                
                // 클릭한 탭에 active 클래스 추가
                this.classList.add('active');
                
                // 해당 콘텐츠 활성화
                const contentId = this.getAttribute('data-content');
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    };
    
    // 지도 기능
    const initMap = () => {
        // 실제 구현에서는 지도 API 연동
        console.log('지도 초기화');
        
        // 지도 컨트롤 버튼 이벤트
        const mapControlBtns = document.querySelectorAll('.map-control-btn');
        mapControlBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 실제 구현에서는 지도 API 함수 호출
                console.log('지도 컨트롤:', this.title);
                
                // 간단한 피드백 효과
                this.style.backgroundColor = '#f0f0f0';
                setTimeout(() => {
                    this.style.transition = 'background-color 0.5s ease';
                    this.style.backgroundColor = '';
                }, 200);
            });
        });
    };
    
    // 배송기사 연락 버튼
    const contactDeliveryBtn = document.getElementById('contactDeliveryBtn');
    
    if (contactDeliveryBtn) {
        contactDeliveryBtn.addEventListener('click', function() {
            // 택배사 연락처 안내
            const confirmCall = confirm('택배기사에게 연결하시겠습니까?\n\n연결 전화번호: 010-9876-5432');
            
            if (confirmCall) {
                // 실제 구현에서는 전화 연결 (모바일 환경)
                console.log('전화 연결 시도');
                window.location.href = 'tel:01098765432';
            }
        });
    }
    
    // SMS 알림 신청 버튼
    const smsAlertBtn = document.getElementById('smsAlertBtn');
    
    if (smsAlertBtn) {
        smsAlertBtn.addEventListener('click', function() {
            // 알림 신청 처리
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                알림 신청 완료
            `;
            this.classList.add('btn-success');
            this.style.backgroundColor = '#4CAF50';
            this.style.color = 'white';
            this.disabled = true;
            
            // 알림 효과
            alert('배송 위치 문자 알림이 신청되었습니다. 배송 위치가 업데이트되면 문자로 알려드립니다.');
        });
    }
    
    // 자동 배송 상태 업데이트 시뮬레이션
    const simulateDeliveryUpdates = () => {
        // 실제 구현에서는 서버 통신이나 웹소켓으로 실시간 업데이트 수신
        console.log('배송 상태 업데이트 시뮬레이션 시작');
        
        // 배송 완료 시뮬레이션 (약 5% 확률로 배송 완료)
        setTimeout(() => {
            if (Math.random() < 0.05) {
                completeDelivery();
            }
        }, 10000); // 10초 후 체크
        
        // 30초마다 자동 새로고침 (실제 구현 시 필요에 따라 조정)
        setInterval(() => {
            if (refreshStatusBtn && !refreshStatusBtn.disabled) {
                console.log('자동 새로고침 수행');
                // 실제 구현에서 활성화
                refreshStatusBtn.click();
            }
        }, 30000); // 30초마다
    };
    
    // 배송 완료 처리 함수
    const completeDelivery = () => {
        console.log('배송 완료 처리');
        
        // 상태값 변경
        const statusText = document.querySelector('.delivery-info-value.status-delivering');
        const stepCircles = document.querySelectorAll('.step-circle');
        const progressBar = document.querySelector('.tracking-timeline-progress');
        
        // 배송 완료 상태로 변경
        if (statusText) {
            statusText.textContent = '배송 완료';
            statusText.className = 'delivery-info-value status-completed';
        }
        
        // 마지막 단계 활성화
        if (stepCircles.length >= 5) {
            stepCircles[3].className = 'step-circle completed';  // 배송중 단계 완료 표시
            stepCircles[4].className = 'step-circle active';     // 배송완료 단계 활성화
        }
        
        // 진행바 100%로 설정
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // 배송 완료 시간 업데이트
        const lastStepDate = document.querySelectorAll('.step-date')[4];
        if (lastStepDate) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            lastStepDate.textContent = `04.21 ${hours}:${minutes}`;
        }
        
        // 새로운 배송 상태 추가
        const trackingDetails = document.querySelector('.tracking-details');
        if (trackingDetails) {
            const newDetailItem = document.createElement('div');
            newDetailItem.className = 'tracking-detail-item';
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            
            newDetailItem.innerHTML = `
                <div class="detail-time">
                    <div class="detail-time-value">${hours}:${minutes}</div>
                    <div class="detail-time-date">2025.04.21</div>
                </div>
                <div class="detail-circle active">5</div>
                <div class="detail-status">
                    <div class="detail-message">
                        <strong>[서울 종로구] 배송 완료</strong>
                        조호물품이 배송 완료되었습니다. 이용해주셔서 감사합니다.
                    </div>
                </div>
            `;
            
            // 기존 detail-circle 클래스에서 active 제거
            const activeCircles = trackingDetails.querySelectorAll('.detail-circle.active');
            activeCircles.forEach(circle => {
                circle.classList.remove('active');
            });
            
            // 새로운 상태를 가장 위에 추가
            const firstDetailItem = trackingDetails.querySelector('.tracking-detail-item');
            trackingDetails.insertBefore(newDetailItem, firstDetailItem);
            
            // 애니메이션 효과로 강조
            newDetailItem.style.backgroundColor = '#e8f5e9';
            setTimeout(() => {
                newDetailItem.style.transition = 'background-color 2s ease';
                newDetailItem.style.backgroundColor = '';
            }, 100);
            
            // 배송 완료 축하 메시지
            setTimeout(() => {
                alert('조호물품이 배송 완료되었습니다. 이용해주셔서 감사합니다.');
            }, 1000);
            
            // 배송 위치 문자 알림 버튼 상태 변경
            const smsAlertBtn = document.getElementById('smsAlertBtn');
            if (smsAlertBtn) {
                smsAlertBtn.textContent = '배송 완료됨';
                smsAlertBtn.disabled = true;
                smsAlertBtn.style.backgroundColor = '#9e9e9e';
            }
        }
    };
    
    // 초기화 실행
    setupTabs();
    initMap();
    simulateDeliveryUpdates();
});