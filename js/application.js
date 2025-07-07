// application.js - 조호물품 신청 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    console.log('조호물품 신청 페이지 스크립트 로딩됨');

    // 카테고리 필터링 기능
    const categoryLinks = document.querySelectorAll('.category-sidebar a');
    const productItems = document.querySelectorAll('.product-item');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 링크에서 active 클래스 제거
            categoryLinks.forEach(item => item.classList.remove('active'));
            
            // 클릭한 링크에 active 클래스 추가
            this.classList.add('active');
            
            // 카테고리 필터링
            const category = this.getAttribute('data-category');
            
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 신청하기 버튼 이벤트 처리 함수
    function setupApplyButtons() {
        const applyButtons = document.querySelectorAll('.btn-apply');
        console.log('신청하기 버튼 개수:', applyButtons.length);
        
        applyButtons.forEach(button => {
            // 기존 이벤트 리스너 제거 후 새로 추가
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault(); // 기본 동작 방지
                e.stopPropagation(); // 이벤트 버블링 방지
                
                const productId = this.getAttribute('data-id');
                console.log('신청하기 버튼 클릭 - 상품 ID:', productId);
                
                // 상품 ID 유효성 검사
                if (!productId) {
                    console.error('상품 ID가 없습니다.');
                    alert('상품 정보를 찾을 수 없습니다.');
                    return;
                }
                
                // 각 상품별 상세 페이지로 이동
                const targetUrl = `product-detail.html?id=${productId}`;
                console.log(`이동할 URL: ${targetUrl}`);
                window.location.href = targetUrl;
            });
        });
    }
    
    // 상품 카드 클릭 이벤트 처리
    function setupProductCards() {
        productItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 신청하기 버튼 클릭은 제외
                if (e.target.classList.contains('btn-apply') || e.target.closest('.btn-apply')) {
                    console.log('버튼 클릭 감지 - 카드 클릭 이벤트 무시');
                    return;
                }
                
                const productId = this.getAttribute('data-id');
                if (productId) {
                    console.log('상품 카드 클릭 - 상품 ID:', productId);
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            });
        });
    }
    
    // 함수 실행
    setupApplyButtons();
    setupProductCards();
    
    // 디버깅용 - 모든 상품과 버튼 정보 출력
    console.log('=== 상품 정보 ===');
    productItems.forEach((item, index) => {
        const productId = item.getAttribute('data-id');
        const productName = item.querySelector('h3')?.textContent;
        console.log(`상품 ${index + 1}: ID=${productId}, 이름=${productName}`);
    });
});