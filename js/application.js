// 조호물품 신청 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    console.log('조호물품 신청 페이지 스크립트 로딩됨');

    // 카테고리 필터링
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
    
    // 신청하기 버튼 이벤트 - 상세 페이지로 이동하도록 수정
    const applyButtons = document.querySelectorAll('.btn-apply');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            const productId = this.getAttribute('data-id');
            
            console.log('신청하기 버튼 클릭 - 상품 ID:', productId);
            
            // 상세 페이지로 이동
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
    
    // 상품 카드 클릭 시 상세 페이지로 이동
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 버튼 클릭은 제외 (버튼은 별도 처리)
            if (!e.target.classList.contains('btn-apply')) {
                const productId = this.getAttribute('data-id');
                console.log('상품 카드 클릭 - 상품 ID:', productId);
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
});