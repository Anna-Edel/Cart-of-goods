document.addEventListener('DOMContentLoaded', () => {
    // Находим все элементы управления количеством товара
    const quantityControls = document.querySelectorAll('.product__quantity-control');
    
    quantityControls.forEach(control => {
        control.addEventListener('click', (e) => {
            const quantityValue = e.target.closest('.product__quantity-controls')
                .querySelector('.product__quantity-value');
            
            let currentValue = parseInt(quantityValue.textContent);
            if (e.target.classList.contains('product__quantity-control_inc')) {
                quantityValue.textContent = currentValue + 1;
            } else if (e.target.classList.contains('product__quantity-control_dec') && currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        });
    });

    // Находим все кнопки добавления товара в корзину
    const addButtons = document.querySelectorAll('.product__add');

    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productImage = productElement.querySelector('.product__image').src;
            const productQuantity = parseInt(productElement.querySelector('.product__quantity-value').textContent);

            const cartProduct = document.querySelector(`.cart__product[data-id="${productId}"]`);

            if (cartProduct) {
                // Если товар уже есть в корзине, увеличиваем количество
                const cartProductCount = cartProduct.querySelector('.cart__product-count');
                cartProductCount.textContent = parseInt(cartProductCount.textContent) + productQuantity;
            } else {
                // Иначе добавляем новый товар в корзину
                const cartProducts = document.querySelector('.cart__products');

                const newCartProduct = document.createElement('div');
                newCartProduct.classList.add('cart__product');
                newCartProduct.setAttribute('data-id', productId);
                newCartProduct.innerHTML = `
                    <img class="cart__product-image" src="${productImage}" alt="">
                    <div class="cart__product-count">${productQuantity}</div>
                `;

                cartProducts.appendChild(newCartProduct);
            }
        });
    });
});
