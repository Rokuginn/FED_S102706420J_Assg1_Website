// Checkout Function
document.addEventListener('DOMContentLoaded', () => {
    // Load cart items from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === loggedInUser?.username);
    
    // Get order summary elements
    const orderItems = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!orderItems || !subtotalElement || !shippingElement || !totalElement) {
        console.error('Required elements not found');
        return;
    }

    if (user?.cart && user.cart.length > 0) {
        let subtotal = 0;
        
        // Clear existing items
        orderItems.innerHTML = '';
        
        user.cart.forEach(item => {
            // Ensure price is converted to float and handle any invalid values
            const itemPrice = parseFloat(item.price) || 0;
            subtotal += itemPrice;
            
            const itemElement = document.createElement('div');
            itemElement.classList.add('summary-row');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${itemPrice.toFixed(2)}</span>
            `;
            orderItems.appendChild(itemElement);
        });
        
        const shipping = 10.00;
        const total = subtotal + shipping;

        // Update summary values with proper formatting
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        console.log('Order Summary Updated:', {
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2)
        });
    } else {
        // Handle empty cart
        orderItems.innerHTML = '<div class="summary-row"><span>No items in cart</span></div>';
        subtotalElement.textContent = '$0.00';
        shippingElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
    }
});


// Credit Card Validation
document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const form = document.getElementById('shipping-form');

    // Validation functions
    const validateCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cleaned)) {
            showError(cardNumber, 'Card number must be 16 digits');
            return false;
        }
        removeError(cardNumber);
        return true;
    };

    const validateExpiry = (value) => {
        if (!/^\d{2}\/\d{2}$/.test(value)) {
            showError(expiry, 'Use MM/YY format');
            return false;
        }
        const [month, year] = value.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (parseInt(month) < 1 || parseInt(month) > 12) {
            showError(expiry, 'Invalid month');
            return false;
        }
        if (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            showError(expiry, 'Card has expired');
            return false;
        }
        removeError(expiry);
        return true;
    };

    const validateCVV = (value) => {
        if (!/^\d{3,4}$/.test(value)) {
            showError(cvv, 'CVV must be 3 or 4 digits');
            return false;
        }
        removeError(cvv);
        return true;
    };

    // Helper functions
    const showError = (element, message) => {
        const wrapper = element.closest('.input-wrapper');
        element.classList.add('error');
        let errorDiv = wrapper.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            wrapper.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    };

    const removeError = (element) => {
        const wrapper = element.closest('.input-wrapper');
        element.classList.remove('error');
        const errorDiv = wrapper.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    };

    // Format credit card number with spaces
    cardNumber.addEventListener('input', (e) => {
        // Remove any non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Add space after every 4 digits
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        
        // Limit length to 19 characters (16 digits + 3 spaces)
        e.target.value = value.substring(0, 19);
        
        validateCardNumber(value);
    });

    // Add keypress event to prevent non-numeric input
    cardNumber.addEventListener('keypress', (e) => {
        // Allow only numbers and control keys
        if (!/[\d\s]/.test(e.key) && !e.ctrlKey) {
            e.preventDefault();
        }
    });

    // Format expiry date
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
        validateExpiry(value);
    });

    // Validate CVV on input
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        validateCVV(e.target.value);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isCardValid = validateCardNumber(cardNumber.value);
        const isExpiryValid = validateExpiry(expiry.value);
        const isCVVValid = validateCVV(cvv.value);

        if (isCardValid && isExpiryValid && isCVVValid) {
            // Process payment
            alert('Order processed successfully!');
            // Clear cart and redirect
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
                const user = users.find(u => u.username === loggedInUser.username);
                if (user) {
                    user.cart = [];
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
            window.location.href = 'index.html';
        }
    });
});