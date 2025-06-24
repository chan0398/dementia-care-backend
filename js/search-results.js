document.addEventListener('DOMContentLoaded', function() {
    // URL에서 검색어 파라미터 가져오기
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // 검색어 가져오기
    const searchKeyword = getUrlParameter('keyword');
    
    // 검색어 표시 업데이트
    const searchInput = document.getElementById('searchInput');
    const searchTitleElement = document.querySelector('.search-header h1');
    const searchSubtitleElement = document.querySelector('.search-header p');

    if (searchKeyword) {
        // 검색창에 검색어 설정
        if (searchInput) {
            searchInput.value = searchKeyword;
        }
        
        // 검색 결과 타이틀 업데이트
        if (searchTitleElement) {
            searchTitleElement.textContent = `'${searchKeyword}'에 대한 검색결과`;
        }
    }

    // 검색 관련 요소
    const searchBtn = document.getElementById('searchBtn');
    const resultCountElement = document.getElementById('resultCount');
    
    // 필터 관련 요소 - 카테고리만 남김
    const categoryFilter = document.getElementById('categoryFilter');
    
    // 결과 관련 요소
    const productContainer = document.querySelector('.product-container');
    const noResultsSection = document.querySelector('.no-results');
    
    // 조호물품 데이터 확장 (더 많은 상품과 상세 정보 추가)
    const products = [
        {
            id: 1,
            name: '성인용 기저귀',
            description: '중형 (20매)',
            category: 'hygiene',
            image: '../images/product1.jpg',
            date: '2023-06-01',
            keywords: ['성인용', '기저귀', '위생', '배변']
        },
        {
            id: 2,
            name: '요실금 패드',
            description: '표준형 (30매)',
            category: 'hygiene',
            image: 'https://via.placeholder.com/200x200?text=요실금패드',
            date: '2023-05-15',
            keywords: ['요실금', '패드', '위생', '배변']
        },
        {
            id: 3,
            name: '기저귀 커버',
            description: '중형 (2매)',
            category: 'hygiene',
            image: 'https://via.placeholder.com/200x200?text=기저귀커버',
            date: '2023-04-20',
            keywords: ['기저귀', '커버', '위생', '배변']
        },
        {
            id: 4,
            name: '방수 매트',
            description: '침대용 (17매)',
            category: 'daily',
            image: '../images/product3.jpg',
            date: '2023-06-10',
            keywords: ['방수', '매트', '침대', '생활']
        },
        {
            id: 5,
            name: '조호용 물티슈',
            description: '대형 (100매)',
            category: 'hygiene',
            image: '../images/product2.jpg',
            date: '2023-05-28',
            keywords: ['조호용', '물티슈', '물', '티슈', '위생']
        },
        {
            id: 6,
            name: '미끄럼방지 매트',
            description: '욕실용 (2매)',
            category: 'safety',
            image: 'https://via.placeholder.com/200x200?text=미끄럼방지매트',
            date: '2023-06-05',
            keywords: ['미끄럼방지', '매트', '안전', '욕실']
        },
        {
            id: 7,
            name: '식사용 에이프런',
            description: '성인용 (1개)',
            category: 'meal',
            image: 'https://via.placeholder.com/200x200?text=식사용에이프런',
            date: '2023-05-20',
            keywords: ['식사용', '에이프런', '식사', '앞치마']
        },
        {
            id: 8,
            name: '보행보조기',
            description: '접이식 (1개)',
            category: 'rehab',
            image: 'https://via.placeholder.com/200x200?text=보행보조기',
            date: '2023-06-15',
            keywords: ['보행', '보조기', '재활', '이동']
        },
        {
            id: 9,
            name: '손잡이 식기',
            description: '세트 (4종)',
            category: 'meal',
            image: 'https://via.placeholder.com/200x200?text=손잡이식기',
            date: '2023-05-25',
            keywords: ['손잡이', '식기', '식사', '스푼', '포크']
        },
        {
            id: 10,
            name: '욕실 안전 손잡이',
            description: '흡착형 (2개)',
            category: 'safety',
            image: 'https://via.placeholder.com/200x200?text=욕실안전손잡이',
            date: '2023-06-12',
            keywords: ['욕실', '안전', '손잡이', '흡착']
        },
        {
            id: 11,
            name: '미끄럼방지매트',
            description: '욕실용 (2매)',
            category: 'safety',
            image: 'https://via.placeholder.com/200x200?text=미끄럼방지매트',
            date: '2023-06-05',
            keywords: ['미끄럼', '방지', '매트', '안전', '욕실']
        }
    ];
    
    // 검색 및 필터링 함수
    const searchAndFilter = () => {
        // 검색어가 없으면 URL 파라미터에서 가져오기
        const searchTerm = (searchInput.value.trim() || searchKeyword || '').toLowerCase();
        const category = categoryFilter ? categoryFilter.value : 'all';
        
        // 검색 및 필터링 로직
        let filteredProducts = products.filter(product => {
            // 검색어가 없으면 모든 상품 표시
            if (!searchTerm) return true;
            
            // 검색어 필터링 (상품명, 설명, 키워드에서 검색)
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                (product.keywords && product.keywords.some(keyword => 
                    keyword.toLowerCase().includes(searchTerm)));
            
            // 카테고리 필터링
            const matchesCategory = category === 'all' || product.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        // 정렬 (기본은 최신순)
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 결과 수 업데이트
        if (resultCountElement) {
            resultCountElement.textContent = filteredProducts.length;
        }
        
        // 검색 결과 타이틀 업데이트
        if (searchTitleElement && searchTerm) {
            searchTitleElement.textContent = `'${searchTerm}'에 대한 검색결과`;
        }
        
        // 검색 결과 서브타이틀 업데이트
        if (searchSubtitleElement && searchTerm) {
            searchSubtitleElement.innerHTML = `"${searchTerm}" 검색 결과 <span id="resultCount">${filteredProducts.length}</span>건`;
        }
        
        // 검색 결과 표시
        renderProducts(filteredProducts);
    };
    
    // 상품 렌더링 함수
    const renderProducts = (products) => {
        // 결과 유무에 따라 섹션 표시/숨김
        if (products.length === 0) {
            if (productContainer) productContainer.style.display = 'none';
            if (noResultsSection) noResultsSection.style.display = 'flex';
        } else {
            if (productContainer) {
                productContainer.style.display = 'grid';
            
                // 상품 목록 생성
                productContainer.innerHTML = '';
            
                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'product-item';
                
                    productItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=${encodeURIComponent(product.name)}'">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <button class="btn-apply" data-id="${product.id}">신청하기</button>
                    `;
                
                    productContainer.appendChild(productItem);
                });
            }
            if (noResultsSection) noResultsSection.style.display = 'none';
        }
    
        // 신청하기 버튼에 이벤트 리스너 추가
        attachApplyBtnListeners();
    };
    
    // 신청하기 버튼에 이벤트 리스너 추가 함수
    const attachApplyBtnListeners = () => {
        const applyButtons = document.querySelectorAll('.btn-apply');
        
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const product = products.find(p => p.id === parseInt(productId));
                
                if (product) {
                    openApplicationModal(product);
                }
            });
        });
    };
    
    // 신청 모달 열기 함수
    const openApplicationModal = (product) => {
        const modal = document.getElementById('applicationModal');
        const modalContent = document.querySelector('.modal-content');
        const modalProductImage = document.getElementById('modalProductImage');
        const modalProductName = document.getElementById('modalProductName');
        const modalProductDesc = document.getElementById('modalProductDesc');
        
        // 모달에 상품 정보 설정
        if (modal && modalContent && modalProductImage && modalProductName && modalProductDesc) {
            modalProductImage.src = product.image;
            modalProductImage.onerror = function() {
                this.src = `https://via.placeholder.com/100x100?text=${encodeURIComponent(product.name)}`;
            };
            modalProductName.textContent = product.name;
            modalProductDesc.textContent = product.description;
            
            // 모달 표시
            modal.style.display = 'block';
            
            // 모달 애니메이션
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        }
    };
    
    // 모달 닫기 함수
    const closeModal = () => {
        const modal = document.getElementById('applicationModal');
        const modalContent = document.querySelector('.modal-content');
        
        if (modal && modalContent) {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                // 폼 리셋
                const applicationForm = document.getElementById('applicationForm');
                if (applicationForm) {
                    applicationForm.reset();
                }
            }, 300);
        }
    };
    
    // 검색 버튼 클릭 이벤트
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchAndFilter();
        });
    }
    
    // 검색 입력창 엔터 이벤트
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchAndFilter();
            }
        });
    }
    
    // 카테고리 필터 변경 이벤트
    if (categoryFilter) {
        categoryFilter.addEventListener('change', searchAndFilter);
    }
    
    // 연관 검색어 및 인기 검색어 클릭 이벤트
    const setupKeywordEvents = () => {
        const keywords = document.querySelectorAll('.keyword');
        
        keywords.forEach(keyword => {
            keyword.addEventListener('click', function(e) {
                e.preventDefault();
                const keywordText = this.textContent;
                if (searchInput) {
                    searchInput.value = keywordText;
                    searchAndFilter();
                }
            });
        });
    };
    
    // 모달 닫기 버튼 이벤트
    const closeBtn = document.querySelector('.modal .close');
    const modalClose = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('applicationModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // 신청 폼 제출 이벤트
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 신청 처리 로직 (실제 구현 시 서버 통신 필요)
            const productName = document.getElementById('modalProductName').textContent;
            
            alert(`${productName} 조호물품이 성공적으로 신청되었습니다.\n승인 후 배송이 시작됩니다.`);
            
            // 모달 닫기
            closeModal();
        });
    }
    
    // 초기화 함수 호출
    searchAndFilter();
    setupKeywordEvents();
});