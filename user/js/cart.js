// 장바구니 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    // 로컬 스토리지에서 장바구니 데이터 가져오기
    const loadCartFromStorage = () => {
        return JSON.parse(localStorage.getItem('careSupplyCart')) || [];
    };
    
    // 장바구니 데이터 저장하기
    const saveCartToStorage = (cart) => {
        localStorage.setItem('careSupplyCart', JSON.stringify(cart));
    };
    
    // 초기 장바구니 상태 확인
    const initCart = () => {
        const cart = loadCartFromStorage();
        
        // 장바구니가 비어있는지 확인
        if (cart.length === 0) {
            document.getElementById('filled-cart').style.display = 'none';
            document.getElementById('empty-cart').style.display = 'block';
        } else {
            document.getElementById('filled-cart').style.display = 'block';
            document.getElementById('empty-cart').style.display = 'none';
            renderCartItems(cart);
        }
    };
    
    // 장바구니 아이템 렌더링
    const renderCartItems = (cartItems) => {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        
        if (!cartItemsContainer) return;
        
        // 기존 아이템 삭제
        cartItemsContainer.innerHTML = '';
        
        // 장바구니에 아이템 추가
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-id', item.productId);
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.productName}" onerror="this.src='https://via.placeholder.com/80x80?text=${encodeURIComponent(item.productName)}'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.productName}</div>
                    <div class="cart-item-description">${item.productDesc}</div>
                    <div class="cart-item-limit">최대 신청 가능: ${item.maxQuantity}개</div>
                </div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button type="button" class="quantity-decrease">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="${item.maxQuantity}" readonly>
                        <button type="button" class="quantity-increase">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button type="button" class="btn-remove" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        삭제
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // 장바구니 개수 업데이트
        if (cartCount) {
            cartCount.textContent = `총 ${cartItems.length}개 물품`;
        }
        
        // 수량 조절 이벤트 설정
        setupQuantityControls();
        
        // 아이템 삭제 버튼 이벤트 설정
        setupRemoveButtons();
        
        // 주문 요약 업데이트
        updateCartSummary();
    };
    
    // 수량 조절 버튼 기능 설정
    const setupQuantityControls = () => {
        const decreaseButtons = document.querySelectorAll('.quantity-decrease');
        const increaseButtons = document.querySelectorAll('.quantity-increase');
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.nextElementSibling;
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                    updateCartItemQuantity(this.closest('.cart-item'), value - 1);
                    updateCartSummary();
                }
            });
        });
        
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                let value = parseInt(input.value);
                let maxValue = parseInt(input.getAttribute('max') || 99);
                
                if (value < maxValue) {
                    input.value = value + 1;
                    updateCartItemQuantity(this.closest('.cart-item'), value + 1);
                    updateCartSummary();
                } else {
                    alert(`최대 ${maxValue}개까지 신청 가능합니다.`);
                }
            });
        });
    };
    
    // 카트 아이템 수량 업데이트
    const updateCartItemQuantity = (cartItem, newQuantity) => {
        const productId = cartItem.getAttribute('data-id');
        const cart = loadCartFromStorage();
        
        // 해당 상품 찾기
        const itemIndex = cart.findIndex(item => item.productId.toString() === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            saveCartToStorage(cart);
        }
    };
    
    // 삭제 버튼 기능 설정
    const setupRemoveButtons = () => {
        const removeButtons = document.querySelectorAll('.btn-remove');
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemName = cartItem.querySelector('.cart-item-name').textContent;
                const itemIndex = parseInt(this.getAttribute('data-index'));
                
                // 삭제 확인
                if (confirm(`장바구니에서 '${itemName}'을(를) 삭제하시겠습니까?`)) {
                    // 스토리지에서 삭제
                    removeCartItem(itemIndex);
                    
                    // 화면에서 삭제
                    cartItem.remove();
                    
                    // 주문 요약 업데이트
                    updateCartSummary();
                    
                    // 장바구니가 비었는지 확인
                    const remainingItems = document.querySelectorAll('.cart-item');
                    if (remainingItems.length === 0) {
                        document.getElementById('filled-cart').style.display = 'none';
                        document.getElementById('empty-cart').style.display = 'block';
                    }
                }
            });
        });
    };
    
    // 장바구니 아이템 삭제 
    const removeCartItem = (index) => {
        let cart = loadCartFromStorage();
        cart.splice(index, 1);
        saveCartToStorage(cart);
        
        // 장바구니 카운트 업데이트
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = `총 ${cart.length}개 물품`;
        }
    };
    
    // 장바구니 요약 업데이트
    const updateCartSummary = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        const summaryItems = document.querySelector('.summary-items');
        const totalValue = document.querySelector('.total-value');
        
        if (!summaryItems || !totalValue) return;
        
        // 요약 항목 초기화
        summaryItems.innerHTML = '';
        
        let totalQuantity = 0;
        
        // 각 아이템 정보 추가
        cartItems.forEach(item => {
            const name = item.querySelector('.cart-item-name').textContent;
            const description = item.querySelector('.cart-item-description').textContent;
            const quantity = parseInt(item.querySelector('.quantity-control input').value);
            
            totalQuantity += quantity;
            
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <div class="item-name">${name} (${description})</div>
                <div class="item-quantity">${quantity}개</div>
            `;
            
            summaryItems.appendChild(summaryItem);
        });
        
        // 총 수량 업데이트
        totalValue.textContent = `${totalQuantity}개`;
    };
    
    // 신청하기 버튼
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = loadCartFromStorage();
            
            if (cart.length === 0) {
                alert('장바구니가 비어있습니다.');
                return;
            }
            
            // 주문 처리 로직 (실제 구현 시)
            // 여기서는 로컬스토리지에 신청내역 저장
            
            // 주문정보 생성
            const orderData = {
                orderItems: cart,
                orderDate: new Date().toISOString(),
                orderNumber: generateOrderNumber(),
                status: '승인대기',
                totalQuantity: cart.reduce((total, item) => total + item.quantity, 0)
            };
            
            // 신청내역 저장
            saveOrderToHistory(orderData);
            
            // 장바구니 비우기
            localStorage.removeItem('careSupplyCart');
            
            // 완료 메시지
            alert('신청이 완료되었습니다. 신청내역 페이지로 이동합니다.');
            
            // 신청내역 페이지로 이동
            window.location.href = 'mypage.html';
        });
    }
    
    // 주문번호 생성
    const generateOrderNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 9000) + 1000;
        
        return `${year}${month}${day}-${random}`;
    };
    
    // 주문내역 저장
    const saveOrderToHistory = (orderData) => {
        // 기존 주문 내역 가져오기
        let orders = JSON.parse(localStorage.getItem('careSupplyApplications')) || [];
        
        // 신규 주문내역 변환
        const applications = orderData.orderItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productDesc: item.productDesc,
            quantity: item.quantity,
            patientName: '홍길동', // 실제로는 사용자 정보에서 가져옴
            caregiverName: '홍보호',
            phoneNumber: '010-1234-5678',
            address: '서울특별시 종로구 종로1길 1, 101동 202호',
            requestNote: '',
            applicationDate: orderData.orderDate,
            id: orderData.orderNumber,
            status: orderData.status
        }));
        
        // 주문내역 추가
        orders = [...applications, ...orders];
        
        // 저장
        localStorage.setItem('careSupplyApplications', JSON.stringify(orders));
    };
    
    // 페이지 로드 시 초기화
    initCart();
});