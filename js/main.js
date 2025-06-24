// 문서가 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능 (필요시 추가)
    const setupMobileMenu = () => {
        // 모바일 메뉴 버튼 요소가 있을 경우에만 실행
        const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                nav.classList.toggle('active');
            });
        }
    };

    // 사용자 정보 페이지 링크 업데이트
    // user-info.html 대신 myinfo.html로 연결되도록 수정
    const userInfoLinks = document.querySelectorAll('.icon.user');
    userInfoLinks.forEach(link => {
        // 링크 경로가 user-info.html인 경우 myinfo.html로 변경
        if (link.getAttribute('href') && link.getAttribute('href').includes('user-info.html')) {
            link.setAttribute('href', link.getAttribute('href').replace('user-info.html', 'myinfo.html'));
        }
    });
    
    // 현재 페이지에 해당하는 네비게이션 메뉴 활성화
    const highlightCurrentPage = () => {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            // 현재 페이지 URL에 링크의 href가 포함되어 있으면 active 클래스 추가
            if (currentPage.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // index.html 또는 / 경로일 경우 홈 링크 활성화
        if (currentPage === '/' || currentPage.includes('index.html')) {
            const homeLink = document.querySelector('.main-nav a[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    };
    
    // 장바구니 아이콘 업데이트
    const updateCartIcon = () => {
        const cartIcon = document.querySelector('.icon.cart');
        if (!cartIcon) return;
        
        // 로컬 스토리지에서 장바구니 데이터 가져오기
        const cart = JSON.parse(localStorage.getItem('careSupplyCart')) || [];
        const cartCount = cart.length;
        
        // 장바구니 아이콘에 개수 표시
        cartIcon.setAttribute('data-count', cartCount.toString());
    };
    
    // 신청하기 버튼 이벤트 (홈페이지에서)
    const setupApplyButtons = () => {
        const applyButtons = document.querySelectorAll('.btn-apply');
        
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 신청 페이지로 이동
                window.location.href = 'pages/application.html';
            });
        });
    };
    
    // URL 파라미터 가져오기
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    
    // 카테고리 매개변수가 있을 경우 해당 카테고리 활성화
    const activateCategory = () => {
        const category = getUrlParameter('category');
        if (category) {
            const categoryLinks = document.querySelectorAll('.category-sidebar a');
            categoryLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(category)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };
    
    // 검색 기능
    const setupSearch = () => {
        const searchForm = document.querySelector('.search-bar');
        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.search-bar button');
        
        // 현재 페이지의 경로에 따라 검색 결과 페이지 경로 결정
        const determineSearchPath = () => {
            // URL 경로가 /pages/ 를 포함하는지 확인
            const isInPagesDirectory = window.location.pathname.includes('/pages/');
            // index.html 또는 루트 경로인지 확인
            const isHomePage = window.location.pathname === '/' || 
                              window.location.pathname.endsWith('index.html');
            
            // 페이지 위치에 따라 검색 결과 페이지 경로 반환
            if (isHomePage) {
                return 'pages/search-results.html';
            } else if (isInPagesDirectory) {
                return 'search-results.html';
            } else {
                return 'pages/search-results.html';
            }
        };
        
        // 검색 실행 함수
        const performSearch = () => {
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                const searchPath = determineSearchPath();
                window.location.href = searchPath + '?keyword=' + encodeURIComponent(searchTerm);
            } else {
                alert('검색어를 입력해주세요.');
            }
        };
        
        // 검색 폼 제출 이벤트
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
        
        // 검색 버튼 클릭 이벤트
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
        
        // 검색창 엔터키 이벤트
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
        }
    };
    
    // 페이지 로드 애니메이션 (필요시 추가)
    const pageLoadAnimation = () => {
        const content = document.querySelector('main');
        if (content) {
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.transition = 'opacity 0.5s ease';
                content.style.opacity = '1';
            }, 100);
        }
    };
    
    // 함수 실행
    setupMobileMenu();
    highlightCurrentPage();
    setupApplyButtons();
    activateCategory();
    setupSearch();
    updateCartIcon(); // 장바구니 아이콘 업데이트
    pageLoadAnimation();
});