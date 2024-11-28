document.addEventListener('DOMContentLoaded', () => {
    // Cart initialization
    const initializeCart = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            alert('No user logged in.');
            window.location.href = 'index.html';
            return;
        }

        const user = users.find(u => u.username === loggedInUser.username);

        if (!user) {
            alert('User not found.');
            window.location.href = 'index.html';
            return;
        }

        return { users, user };
    };

    // Render cart items
    const renderCart = (user) => {
        const cartContainer = document.getElementById('cart-container');
        const totalPriceEl = document.getElementById('total-price');
        let total = 0;

        user.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart__item');

            itemDiv.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" class="cart__item-image">
                <div class="cart__item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(itemDiv);
            total += parseFloat(item.price);
        });

        totalPriceEl.textContent = total.toFixed(2);
    };

    // Remove item handler
    const handleRemoveItem = (users, user) => {
        document.getElementById('cart-container').addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-item')) {
                const id = e.target.getAttribute('data-id');
                user.cart = user.cart.filter(item => item.id !== id);
                localStorage.setItem('users', JSON.stringify(users));
                location.reload();
            }
        });
    };

    // Checkout handler
    const handleCheckout = (user) => {
        document.getElementById('checkout-button').addEventListener('click', () => {
            if (!user.cart || user.cart.length === 0) {
                alert('Please add items to your cart before proceeding to checkout.');
                return;
            }
            window.location.href = 'checkout.html';
        });
    };

    // Initialize cart functionality
    const { users, user } = initializeCart();
    if (user) {
        renderCart(user);
        handleRemoveItem(users, user);
        handleCheckout(user);
    }
});