document.addEventListener('DOMContentLoaded', function() {
    const menuItems = [
        { id: 1, name: 'Waffle', description: 'Waffle with Berries', price: 6.50,image: 'images/waffle.jpg'},
        { id: 2, name: 'Creme Brûlée', description: 'Vanilla Bean Crème Brûlée', price: 7.00,image: 'images/creme-brulee.jpg'},
        { id: 3, name: 'Macaron', description: 'Macaron Mix of Five', price: 8.00,image: 'images/macaron.jpg'},
        { id: 4, name: 'Tiramisu', description: 'Classic Tiramisu', price: 5.50,image: 'images/tiramisu.jpg'},
        { id: 5, name: 'Balsiana', description: 'Pistachio Balsiana', price: 4.00,image: 'images/panna-cotta.jpg'},
        { id: 6, name: 'Pie', description: 'Lemon Meringue Pie', price: 5.00,image: 'images/meringue.jpg'},
        { id: 7, name: 'Baklava', description: 'Pistachio Baklava', price: 4.00,image: 'images/baklava.jpg'},
        { id: 8, name: 'Cake', description: 'Red Velvet Cake', price: 4.50,image: 'images/cake.jpg'},
        { id: 9, name: 'Brownie', description: 'Salted Caramel Brownie', price: 4.50,image: 'images/brownie.jpg'}
    ];

    let cart = [];
    let cartCount = 0;
    let cartTotal = 0;

    const menuContainer = document.querySelector('.menuItems');
    const cartItemsContainer = document.querySelector('.cartItems');
    const cartCountElement = document.querySelector('.orderSummary h2');
    const orderTotalElement = document.querySelector('.orderTotal');
    const confirmOrderBtn = document.querySelector('.confirmOrder');

    function renderMenu() {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description} $${item.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            `;
            menuContainer.appendChild(menuItem);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const item = menuItems.find(i => i.id === itemId);
        
        const existingItem = cart.find(i => i.id === itemId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
        }
        
        cartCount++;
        cartTotal += item.price;
        
        updateCart();
    }

    function updateCart() {
        cartCountElement.textContent = `Your Cart (${cartCount})`;
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity}x $${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        orderTotalElement.textContent = `Order Total $${cartTotal.toFixed(2)}`;
    }

    function confirmOrder() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert(`Order confirmed! Total: $${cartTotal.toFixed(2)}\nThank you for your purchase!`);
        
        cart = [];
        cartCount = 0;
        cartTotal = 0;
        updateCart();
    }

    confirmOrderBtn.addEventListener('click', confirmOrder);

    renderMenu();
});