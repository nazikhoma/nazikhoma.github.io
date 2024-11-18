let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = '';
let selectedPrice = 0;
let itemToDeleteIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.title = data.title;
            const container = document.querySelector('.container');
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                const category = document.createElement('div');
                category.classList.add('category');
                category.textContent = product.category;
                productCard.appendChild(category);
                if (product.badge) {
                    const badge = document.createElement('div');
                    badge.classList.add('badge', product.badge, 'top-right');
                    badge.textContent = product.badge === 'new' ? 'Новинка' : 'Хіт продажів';
                    productCard.appendChild(badge);
                }
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.alt;
                productCard.appendChild(img);
                const h3 = document.createElement('h3');
                h3.textContent = product.name;
                productCard.appendChild(h3);
                const price = document.createElement('p');
                price.classList.add('price');
                price.textContent = product.price;
                productCard.appendChild(price);
                const button = document.createElement('button');
                button.classList.add('add-to-cart');
                button.textContent = product.buttonText;
                button.disabled = product.buttonDisabled;
                if (!product.buttonDisabled) {
                    button.onclick = () => showQuantityModal(button);
                }
                productCard.appendChild(button);
                container.appendChild(productCard);
            });
        })
        .catch(error => console.error('Помилка при завантаженні даних:', error));
    updateCartCount();
});

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
    const totalPriceElement = document.getElementById('total-price');

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }

    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice + ' грн';
    }
}

function showConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'flex';
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
        row.insertCell().textContent = item.price * item.quantity;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.onclick = () => removeItem(index);
        row.insertCell().appendChild(removeButton);

        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice + ' грн';
    }
}

function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function removeItem(index) {
    itemToDeleteIndex = index;
    document.getElementById('confirm-delete-modal').style.display = 'flex';
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

function pay() {
    alert("Оплата пройшла успішно!");
    localStorage.removeItem('cart');
    location.href = 'index.html';
}

if (location.pathname.includes('cart.html')) {
    displayCartItems();
}