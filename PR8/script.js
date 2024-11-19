let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = '';
let selectedPrice = 0;
let itemToDeleteIndex = -1;

updateCartCount();

function openCart() {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        location.href = 'cart.html';
    }
}

function showQuantityModal(button) {
    const productCard = button.closest('.product-card');
    selectedProduct = productCard.querySelector('h3').innerText;
    const priceText = productCard.querySelector('.price').innerText;
    selectedPrice = parseInt(priceText.replace(/\D/g, ''));
    document.getElementById('quantity-input').value = 1;

    document.getElementById('quantity-modal').style.display = 'flex';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

function showConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'flex';
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    if (quantity > 0) {
        cart.push({ product: selectedProduct, quantity, price: selectedPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
        updateCartCount();
        closeModal();
        showConfirmationModal();
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

function goToCart() {
    location.href = 'cart.html';
}

function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsTable = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    let totalPrice = 0;

    cartItemsTable.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = cartItemsTable.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = item.product;
        row.insertCell().textContent = item.price;
        const quantityCell = row.insertCell();
        quantityCell.innerHTML = `<input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">`;
        const itemTotalPrice = item.price * item.quantity;
        row.insertCell().textContent = itemTotalPrice;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.onclick = () => removeItem(index);
        row.insertCell().appendChild(removeButton);
        totalPrice += itemTotalPrice;
    });

    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice + ' грн';
    }
}

if (location.pathname.includes('cart.html')) {
    displayCartItems();
}

function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = parseInt(newQuantity);

    if (quantity > 0) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function removeItem(index) {
    itemToDeleteIndex = index;
    document.getElementById('confirm-delete-modal').style.display = 'flex';
}

function pay() {
    alert("Оплата пройшла успішно!");
    localStorage.removeItem('cart');
    location.href = 'index.html';
}

function confirmDelete() {
    if (itemToDeleteIndex !== -1) {
        cart.splice(itemToDeleteIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        closeConfirmDeleteModal();
    }
}

function closeConfirmDeleteModal() {
    document.getElementById('confirm-delete-modal').style.display = 'none';
}
