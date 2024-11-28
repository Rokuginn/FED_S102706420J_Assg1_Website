// Function 0: To create a mobile menu for smaller screens
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);
// Function 6: Hero Slider
document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider functionality
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;

  // Create dots
  slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dots.appendChild(dot);
  });

  // Show first slide
  slides[0].classList.add('active');

  function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
      
      currentSlide = index;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      
      slides[currentSlide].classList.add('active');
      document.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }

  // Navigation
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto advance
  setInterval(() => goToSlide(currentSlide + 1), 5000);
});
// Function 2: Filter Value
document.getElementById('product-filter').addEventListener('change', function() {
    const filterValue = this.value;
    const items = document.querySelectorAll('.product__item');

    items.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-type') === filterValue) {
            item.style.visibility = 'visible';
            item.style.position = 'relative';
        } else {
            item.style.visibility = 'hidden';
            item.style.position = 'absolute';
        }
    });
});


// Function 3: Infinite Scroll for Color Shells
const shellsContainer = document.querySelector('.color-shells__grid');
const shellCards = Array.from(shellsContainer.children);
const cardWidth = shellCards[0].offsetWidth + parseInt(getComputedStyle(shellCards[0]).marginRight);

// Clone initial cards
shellCards.forEach(card => {
    const clone = card.cloneNode(true);
    shellsContainer.appendChild(clone);
});

// Left scroll with infinite loop
document.querySelector('.scroll-left').addEventListener('click', () => {
    shellsContainer.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
    });

    // Check if we're at the start
    if (shellsContainer.scrollLeft <= 0) {
        // Disable smooth scrolling temporarily
        shellsContainer.style.scrollBehavior = 'auto';
        // Jump to the cloned set
        shellsContainer.scrollLeft = shellsContainer.scrollWidth / 2;
        // Re-enable smooth scrolling
        setTimeout(() => {
            shellsContainer.style.scrollBehavior = 'smooth';
        }, 0);
    }
});

// Right scroll with infinite loop
document.querySelector('.scroll-right').addEventListener('click', () => {
    shellsContainer.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
    });

    // Check if we're at the end
    if (shellsContainer.scrollLeft >= shellsContainer.scrollWidth / 2) {
        // Disable smooth scrolling temporarily
        shellsContainer.style.scrollBehavior = 'auto';
        // Jump back to the original set
        shellsContainer.scrollLeft = 0;
        // Re-enable smooth scrolling
        setTimeout(() => {
            shellsContainer.style.scrollBehavior = 'smooth';
        }, 0);
    }
});

// Function 4: Add to Cart
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', function () {
      // Get current user
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
      if (!loggedInUser) {
        alert('Please log in to add items to your cart.');
        return;
      }
  
      const user = users.find((u) => u.username === loggedInUser.username);
  
      if (!user) {
        alert('User not found.');
        return;
      }
  
      // Get product details from data attributes
      const product = {
        id: this.getAttribute('data-id'),
        name: this.getAttribute('data-name'),
        price: this.getAttribute('data-price'),
        imgSrc: this.getAttribute('data-image'),
      };
  
      // Check if item is already in the cart
      const itemExists = user.cart.some((item) => item.id === product.id);
  
      if (itemExists) {
        alert('This item is already in your cart.');
      } else {
        // Add item to user's cart
        user.cart.push(product);
        // Update users in localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert(`${product.name} has been added to your cart.`);
      }
    });
  });
  
  // Function 5: Update Navbar on Page Load
  document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const authButtons = document.getElementById('auth-buttons');
  
    if (loggedInUser) {
      authButtons.innerHTML = `
        <span class="welcome-text">Hello, ${loggedInUser.username}</span>
        <button id="logout" class="button">Log Out</button>
      `;
  
      document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html'; // Redirect to homepage
      });
    }
  });



  document.getElementById('checkout-button').addEventListener('click', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === loggedInUser?.username);

    if (!user?.cart || user.cart.length === 0) {
        alert('Please add items to your cart before proceeding to checkout.');
        return;
    }
    
    window.location.href = 'checkout.html';
});