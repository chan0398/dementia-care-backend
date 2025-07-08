document.addEventListener('DOMContentLoaded', function() {
    console.log('상품 상세 페이지 스크립트 로딩됨');
    
    // 상품 데이터 (실제로는 서버에서 가져와야 함)
    const products = [
        {
            id: 1,
            name: '성인용 기저귀',
            description: '중형 (20매)',
            category: '위생용품',
            mainImage: '../images/product1.jpg',
            detailImage: '../images/product1_detail.jpg',
            thumbnails: [
                '../images/product1.jpg',
                '../images/product1_2.jpg',
                '../images/product1_3.jpg'
            ],
            spec: {
                name: '성인용 기저귀',
                size: '중형',
                content: '20매',
                feature: '고흡수성, 피부자극 최소화, 통기성 향상',
                limit: '월 1회 (최대 2개)'
            },
            maxQuantity: 2,
            features: [
                '빠른 흡수력: 특수 흡수층이 빠르게 수분을 흡수하여 피부를 건조하게 유지합니다.',
                '향균 처리: 냄새 억제 기능으로 환자와 보호자의 불편함을 줄여줍니다.',
                '부드러운 촉감: 피부에 자극이 적은 소재로 만들어 장시간 착용해도 편안합니다.',
                '누수 방지: 허리와 다리 부분의 이중 차단 디자인으로 누수를 효과적으로 방지합니다.'
            ],
            sizeGuide: '중형: 허리둘레 70-90cm'
        },
        {
            id: 2,
            name: '조호용 물티슈',
            description: '대형 (100매)',
            category: '위생용품',
            mainImage: '../images/product2.jpg',
            detailImage: '../images/product2_detail.jpg',
            thumbnails: [
                '../images/product2.jpg',
                '../images/product2_2.jpg',
                '../images/product2_3.jpg'
            ],
            spec: {
                name: '조호용 물티슈',
                size: '대형',
                content: '100매',
                feature: '저자극성, 대형 규격, 두꺼운 재질',
                limit: '월 1회 (최대 3개)'
            },
            maxQuantity: 3,
            features: [
                '저자극성: 피부 자극이 적은 순한 성분으로 예민한 피부에도 사용 가능합니다.',
                '대형 규격: 넓은 면적을 효과적으로 닦을 수 있는 대형 사이즈입니다.',
                '두꺼운 재질: 일반 물티슈보다 두꺼워 내구성이 좋습니다.',
                '적당한 습윤감: 너무 젖지 않고 적절한 수분을 유지합니다.'
            ],
            sizeGuide: '대형: 200mm x 150mm'
        },
        {
            id: 3,
            name: '방수 매트',
            description: '침대용 (17매)',
            category: '생활용품',
            mainImage: '../images/product3.jpg',
            detailImage: '../images/product3_detail.jpg',
            thumbnails: [
                '../images/product3.jpg',
                '../images/product3_2.jpg',
                '../images/product3_3.jpg'
            ],
            spec: {
                name: '방수 매트',
                size: '침대용',
                content: '17매',
                feature: '고흡수성, 방수, 미끄럼 방지',
                limit: '월 1회 (최대 2개)'
            },
            maxQuantity: 2,
            features: [
                '고흡수성: 다량의 수분을 빠르게 흡수합니다.',
                '방수 기능: 침대나 이불이 젖지 않도록 완벽하게 방수됩니다.',
                '미끄럼 방지: 바닥면에 미끄럼 방지 처리가 되어 있어 안전합니다.',
                '편안한 표면: 부드러운 표면으로 피부 자극이 적습니다.'
            ],
            sizeGuide: '침대용: 90cm x 180cm'
        },
        {
            id: 4,
            name: '목욕용품 세트',
            description: '종합 세트 (1박스)',
            category: '위생용품',
            mainImage: '../images/product4.jpg',
            detailImage: '../images/product4_detail.jpg',
            thumbnails: [
                '../images/product4.jpg',
                '../images/product4_2.jpg',
                '../images/product4_3.jpg'
            ],
            spec: {
                name: '목욕용품 세트',
                size: '종합 세트',
                content: '1박스',
                feature: '저자극성, 사용 편의성 높음',
                limit: '월 1회 (최대 1개)'
            },
            maxQuantity: 1,
            features: [
                '다양한 구성: 샴푸, 바디워시, 타월, 목욕 스펀지 등 필요한 목욕용품이 모두 구성되어 있습니다.',
                '저자극성: 예민한 피부에도 사용 가능한 순한 성분으로 만들어졌습니다.',
                '편리한 사용: 휴대와 사용이 편리하도록 디자인되었습니다.',
                '위생적인 포장: 개별 포장으로 위생적으로 사용할 수 있습니다.'
            ],
            sizeGuide: '종합 세트: 샴푸 200ml, 바디워시 200ml, 타월 2개, 스펀지 1개'
        },
        {
            id: 5,
            name: '항균 손소독제',
            description: '500ml (2개)',
            category: '위생용품',
            mainImage: '../images/product5.jpg',
            detailImage: '../images/product5_detail.jpg',
            thumbnails: [
                '../images/product5.jpg',
                '../images/product5_2.jpg',
                '../images/product5_3.jpg'
            ],
            spec: {
                name: '항균 손소독제',
                size: '500ml',
                content: '2개',
                feature: '99.9% 살균, 보습 성분 함유',
                limit: '월 1회 (최대 1세트)'
            },
            maxQuantity: 1,
            features: [
                '강력한 살균력: 99.9%의 세균과 바이러스를 살균합니다.',
                '보습 성분 함유: 알로에 성분이 첨가되어 손 건조를 방지합니다.',
                '무알콜 제형: 알코올 성분이 없어 피부 자극이 적습니다.',
                '펌프형 용기: 사용이 편리한 펌프형 용기로 되어있습니다.'
            ],
            sizeGuide: '용량: 500ml (2개 세트)'
        },
        {
            id: 6,
            name: '일회용 장갑',
            description: '100매 (1박스)',
            category: '안전용품',
            mainImage: '../images/product6.jpg',
            detailImage: '../images/product6_detail.jpg',
            thumbnails: [
                '../images/product6.jpg',
                '../images/product6_2.jpg',
                '../images/product6_3.jpg'
            ],
            spec: {
                name: '일회용 장갑',
                size: '표준 사이즈',
                content: '100매 (1박스)',
                feature: '무분말, 양손 사용 가능',
                limit: '월 1회 (최대 2박스)'
            },
            maxQuantity: 2,
            features: [
                '무분말 처리: 피부 자극을 최소화하는 무분말 처리되었습니다.',
                '양손 겸용: 왼손, 오른손 구분 없이 사용 가능합니다.',
                '우수한 내구성: 찢어짐에 강하고 내구성이 좋습니다.',
                '위생적인 보관: 박스 형태로 위생적으로 보관 가능합니다.'
            ],
            sizeGuide: '표준 사이즈: 성인 남녀 공용'
        }
    ];

    // URL에서 상품 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    console.log('URL에서 가져온 상품 ID:', productId);
    
    // 해당 ID에 맞는 상품 찾기
    const product = products.find(p => p.id === productId);
    
    // 상품이 있으면 상세 정보 표시
    if (product) {
        console.log('상품 정보 로드 성공:', product.name);
        updateProductDetail(product);
    } else {
        console.error('상품을 찾을 수 없습니다. ID:', productId);
        // 상품이 없을 경우 처리 (기본값 또는 에러 메시지)
        if (products.length > 0) {
            updateProductDetail(products[0]);
            alert('요청하신 상품 정보를 찾을 수 없어 기본 상품을 표시합니다.');
        } else {
            alert('상품 정보를 로드할 수 없습니다.');
            window.location.href = 'application.html';
        }
    }
    
    // 상품 상세 정보 업데이트
    function updateProductDetail(product) {
        console.log('상품 상세 정보 업데이트 시작:', product.name);
        
        // 기본 정보 업데이트
        const titleElem = document.querySelector('.product-title');
        const categoryElem = document.querySelector('.product-category');
        const descriptionElem = document.querySelector('.product-description p');
        
        if (titleElem) titleElem.textContent = product.name;
        if (categoryElem) categoryElem.textContent = product.category;
        if (descriptionElem) descriptionElem.textContent = product.description;
        
        // 제품 메인 이미지 업데이트
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage) {
            mainImage.src = product.mainImage;
            mainImage.alt = product.name;
            mainImage.onerror = function() {
                this.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}`;
            };
        }
        
        // 제품 썸네일 업데이트
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails.length > 0 && product.thumbnails) {
            thumbnails.forEach((thumbnail, index) => {
                if (index < product.thumbnails.length) {
                    const thumbnailImg = thumbnail.querySelector('img');
                    if (thumbnailImg) {
                        thumbnailImg.src = product.thumbnails[index];
                        thumbnailImg.alt = `${product.name} 썸네일 ${index + 1}`;
                
                        // 개선된 오류 처리 - 이모티콘과 함께 예쁜 플레이스홀더
                        thumbnailImg.onerror = function() {
                            // SVG 기반 플레이스홀더 생성
                            const placeholderSvg = createThumbnailPlaceholder(index + 1);
                            this.src = placeholderSvg;
                            this.style.backgroundColor = '#f8f9fa';
                            this.style.border = '2px dashed #dee2e6';
                            this.style.borderRadius = '8px';
                        };
                    }
                    thumbnail.setAttribute('data-src', product.thumbnails[index]);
                } else {
                    // 데이터에 없는 썸네일은 숨기기
                    thumbnail.style.display = 'none';
                }
            });
        }

        // 썸네일 플레이스홀더 생성 함수
        function createThumbnailPlaceholder(number) {
            const emojis = ['📷', '🖼️', '📸', '🎨', '🖥️', '💻'];
            const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec', '#f1f8e9'];
    
            const emoji = emojis[(number - 1) % emojis.length];
            const bgColor = colors[(number - 1) % colors.length];
    
            const svg = `
                <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="${bgColor}" rx="8"/>
                    <text x="50" y="40" font-size="24" text-anchor="middle" dy=".3em">${emoji}</text>
                    <text x="50" y="65" font-size="10" text-anchor="middle" fill="#6c757d" font-family="system-ui">
                        이미지 없음
                    </text>
                    <text x="50" y="78" font-size="8" text-anchor="middle" fill="#adb5bd" font-family="system-ui">
                        #${number}
                    </text>
                </svg>
            `;
    
            return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
        }
        
        // 상세 설명 및 규격 정보 업데이트
        const specNameElem = document.getElementById('spec-name');
        const specSizeElem = document.getElementById('spec-size');
        const specContentElem = document.getElementById('spec-content');
        const specFeatureElem = document.getElementById('spec-feature');
        const specLimitElem = document.getElementById('spec-limit');
        
        if (specNameElem) specNameElem.textContent = product.spec.name;
        if (specSizeElem) specSizeElem.textContent = product.spec.size;
        if (specContentElem) specContentElem.textContent = product.spec.content;
        if (specFeatureElem) specFeatureElem.textContent = product.spec.feature;
        if (specLimitElem) specLimitElem.textContent = product.spec.limit;
        
        // 상세 이미지 업데이트
        const detailImage = document.getElementById('detail-image');
        if (detailImage && product.detailImage) {
            detailImage.src = product.detailImage;
            detailImage.alt = `${product.name} 상세 이미지`;
            detailImage.onerror = function() {
                this.src = `https://via.placeholder.com/800x600?text=상세정보`;
            };
        }
        
        // 최대 주문 수량 업데이트
        const maxQuantityElem = document.getElementById('max-quantity');
        const modalMaxQuantityElem = document.getElementById('modal-max-quantity');
        const quantityInput = document.getElementById('quantity');
        
        if (maxQuantityElem) maxQuantityElem.textContent = product.maxQuantity;
        if (modalMaxQuantityElem) modalMaxQuantityElem.textContent = product.maxQuantity;
        if (quantityInput) {
            quantityInput.max = product.maxQuantity;
            quantityInput.value = 1;
        }
        
        // 사이즈 가이드 업데이트
        const sizeGuide = document.getElementById('size-guide');
        if (sizeGuide && product.sizeGuide) {
            sizeGuide.textContent = product.sizeGuide;
        }
        
        // 브레드크럼 업데이트
        const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
        const productBreadcrumb = document.getElementById('productBreadcrumb');
        
        if (categoryBreadcrumb) categoryBreadcrumb.textContent = product.category;
        if (productBreadcrumb) productBreadcrumb.textContent = product.name;
        
        console.log('상품 상세 정보 업데이트 완료:', product.name);
    }
    
    // 썸네일 클릭 이벤트
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 모든 썸네일에서 active 클래스 제거
            thumbnails.forEach(item => item.classList.remove('active'));
            
            // 클릭한 썸네일에 active 클래스 추가
            this.classList.add('active');
            
            // 메인 이미지 변경
            const imgSrc = this.getAttribute('data-src');
            if (imgSrc && mainImage) {
                mainImage.src = imgSrc;
            }
        });
    });
    
    // 탭 기능
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 탭 버튼에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 모든 탭 패널 숨기기
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // 클릭한 탭 버튼 활성화
            this.classList.add('active');
            
            // 해당 탭 패널 표시
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 수량 선택 기능
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            const maxQuantity = parseInt(quantityInput.getAttribute('max') || (product ? product.maxQuantity : 2));
            
            if (currentValue < maxQuantity) {
                quantityInput.value = currentValue + 1;
            } else {
                alert(`최대 ${maxQuantity}개까지 신청 가능합니다.`);
            }
        });
    }
    
    // 신청하기 버튼
    const requestBtn = document.getElementById('requestBtn');
    const modal = document.getElementById('applicationModal');
    const modalContent = document.querySelector('#applicationModal .modal-content');
    const closeBtn = document.querySelector('#applicationModal .close');
    const modalClose = document.querySelector('#applicationModal .modal-close');
    
    // 모달 내부 요소
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalQuantityInput = document.getElementById('modalQuantity');
    
    // 모달 열기 함수
    function openModal() {
        if (!modal) {
            console.error('모달 요소를 찾을 수 없음');
            return;
        }
        
        // 현재 상품 정보와 수량을 모달에 설정
        if (modalProductName) modalProductName.textContent = document.querySelector('.product-title').textContent;
        if (modalProductDesc) modalProductDesc.textContent = document.querySelector('.product-description p').textContent;
        if (modalProductImage) {
            modalProductImage.src = mainImage.src;
            modalProductImage.alt = mainImage.alt;
        }
        
        // 수량 설정
        if (modalQuantityInput && quantityInput) {
            modalQuantityInput.max = quantityInput.max;
            modalQuantityInput.value = quantityInput.value;
        }
        
        // 모달 표시
        modal.style.display = 'block';
        
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
    }
    
    // 모달 닫기 함수
    function closeModal() {
        if (!modalContent || !modal) {
            console.error('모달 요소를 찾을 수 없음');
            return;
        }
        
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
    
    // 신청하기 버튼 이벤트
    if (requestBtn) {
        requestBtn.addEventListener('click', function() {
            openModal();
        });
    }
    
    // 닫기 버튼 이벤트
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // 모달 내 수량 선택 기능
    const modalDecreaseBtn = document.querySelector('#applicationModal .quantity-decrease');
    const modalIncreaseBtn = document.querySelector('#applicationModal .quantity-increase');
    
    if (modalDecreaseBtn && modalIncreaseBtn && modalQuantityInput) {
        modalDecreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(modalQuantityInput.value);
            if (currentValue > 1) {
                modalQuantityInput.value = currentValue - 1;
            }
        });
        
        modalIncreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(modalQuantityInput.value);
            const maxQuantity = parseInt(modalQuantityInput.getAttribute('max') || (product ? product.maxQuantity : 2));
            
            if (currentValue < maxQuantity) {
                modalQuantityInput.value = currentValue + 1;
            } else {
                alert(`최대 ${maxQuantity}개까지 신청 가능합니다.`);
            }
        });
    }
    
    // 신청 폼 제출
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 신청 데이터 수집
            const productName = document.getElementById('modalProductName').textContent;
            const productDesc = document.getElementById('modalProductDesc').textContent;
            const quantity = modalQuantityInput ? modalQuantityInput.value : '1';
            const requestNote = document.getElementById('requestNote').value;
            
            // 신청 데이터 객체 생성
            const applicationData = {
                productName: productName,
                productDesc: productDesc,
                patientName: '홍길동', // 실제로는 로그인된 사용자 정보 또는 입력값
                caregiverName: '홍보호',
                phoneNumber: '010-1234-5678',
                address: '서울시 강남구 테헤란로 123',
                quantity: quantity,
                requestNote: requestNote,
                applicationDate: new Date().toISOString(),
                id: Date.now().toString(), // 임시 ID 생성
                status: '승인대기' // 초기 상태
            };
            
            console.log('신청 데이터:', applicationData);
            
            // 로컬 스토리지에 저장 (데모용)
            saveApplication(applicationData);
            
            // 성공 메시지 표시
            alert(`'${productName}' 조호물품이 성공적으로 신청되었습니다.\n수량: ${quantity}개\n승인 후 배송이 시작됩니다.`);
            
            // 모달 닫기
            closeModal();
            
            // 신청내역 페이지로 이동 (선택적)
            // window.location.href = 'mypage.html';
        });
    }
    
    // 조호물품 신청 내역 저장 (로컬 스토리지 이용)
    function saveApplication(applicationData) {
        // 기존 신청 내역 가져오기
        let applications = JSON.parse(localStorage.getItem('careSupplyApplications')) || [];
        
        // 신규 신청 내역 추가
        applications.push(applicationData);
        
        // 저장
        localStorage.setItem('careSupplyApplications', JSON.stringify(applications));
        console.log('신청 내역이 저장되었습니다.');
    }
    
    // 관련 상품 신청하기 버튼
    const relatedProductBtns = document.querySelectorAll('.related-product-list .btn-apply');
    
    relatedProductBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            const productId = this.getAttribute('data-id');
            
            // 해당 상품 상세 페이지로 이동
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
    
    // 관련 상품 항목 클릭 시 상세 페이지로 이동
    const relatedProducts = document.querySelectorAll('.related-product-list .product-item');
    
    relatedProducts.forEach(item => {
        item.addEventListener('click', function(e) {
            // 버튼 클릭은 제외 (버튼은 별도 처리)
            if (!e.target.classList.contains('btn-apply')) {
                const productId = this.getAttribute('data-id');
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
});