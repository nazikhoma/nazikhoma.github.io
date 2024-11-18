let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = '';

document.addEventListener('DOMContentLoaded', updateCartCount);

function openCart() {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        location.href = 'cart.html';
    }
}

function showQuantityModal(product) {
    selectedProduct = product;
    document.getElementById('quantity-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('quantity-modal').style.display = 'none';
    document.getElementById('message-modal').style.display = 'none';
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    if (quantity > 0) {
        const existingItemIndex = cart.findIndex(item => item.product === selectedProduct);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ product: selectedProduct, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        closeModal();
        showMessage('Товар додано');
    }
}

function showMessage(message) {
    document.getElementById('message-text').innerText = message;
    document.getElementById('message-modal').style.display = 'flex';
}

function goToCart() {
    location.href = 'cart.html';
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}
