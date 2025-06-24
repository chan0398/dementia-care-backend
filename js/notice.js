// 공지사항 페이지 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    // 공지사항 아이템 클릭 이벤트
    const noticeItems = document.querySelectorAll('.notice-item');
    
    noticeItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.notice-content');
            
            // 내용 표시/숨김 토글
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                // 다른 항목 닫기 (선택사항)
                document.querySelectorAll('.notice-content.active').forEach(activeContent => {
                    activeContent.classList.remove('active');
                });
                
                // 현재 항목 열기
                content.classList.add('active');
            }
        });
    });
    
    // 카테고리 필터링
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 버튼 활성화 상태 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 카테고리 가져오기
            const category = this.getAttribute('data-category');
            
            // 항목 필터링
            noticeItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 검색 기능
    const searchInput = document.querySelector('.notice-search input');
    const searchButton = document.querySelector('.notice-search button');
    
    const searchNotices = () => {
        const searchText = searchInput.value.toLowerCase().trim();
        
        if (searchText === '') {
            // 검색어가 없으면 모든 항목 표시 (현재 선택된 카테고리 기준)
            const activeCategory = document.querySelector('.filter-button.active').getAttribute('data-category');
            
            noticeItems.forEach(item => {
                if (activeCategory === 'all' || item.getAttribute('data-category') === activeCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            return;
        }
        
        // 검색어가 있으면 제목과 내용에서 검색
        noticeItems.forEach(item => {
            const title = item.querySelector('.notice-title').textContent.toLowerCase();
            const preview = item.querySelector('.notice-preview').textContent.toLowerCase();
            const content = item.querySelector('.notice-content').textContent.toLowerCase();
            
            if (title.includes(searchText) || preview.includes(searchText) || content.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };
    
    if (searchButton) {
        searchButton.addEventListener('click', searchNotices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNotices();
            }
        });
    }
    
    // 페이지네이션 (예시 기능만 구현)
    const pageButtons = document.querySelectorAll('.page-button:not(.nav)');
    const navButtons = document.querySelectorAll('.page-button.nav');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 실제 구현에서는 여기서 해당 페이지 데이터를 불러오는 API 호출
            console.log(`페이지 ${this.textContent} 로드`);
        });
    });
    
    // 이전/다음 페이지 버튼
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPage = parseInt(document.querySelector('.page-button.active:not(.nav)').textContent);
            const isNext = this.textContent === '다음';
            
            let targetPage;
            if (isNext) {
                targetPage = Math.min(currentPage + 1, pageButtons.length);
            } else {
                targetPage = Math.max(currentPage - 1, 1);
            }
            
            // 해당 페이지 버튼 클릭
            pageButtons[targetPage - 1].click();
        });
    });
});category');
            
            noticeItems.forEach(item => {
                if (activeCategory === 'all' || item.getAttribute('data-