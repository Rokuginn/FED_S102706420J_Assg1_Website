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
// Function 1: To adjust the hero section horizontal scrolling
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const slideContents = document.querySelectorAll('.slide-content');
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    const offset = currentSlide * slides[0].clientWidth;
    document.querySelector('.slider').scrollTo({
        left: offset,
        behavior: 'smooth'
    });

    // Remove fade-in class from all slide contents
    slideContents.forEach(content => content.classList.remove('fade-in'));

    // Add fade-in class to the current slide content
    slideContents[currentSlide].classList.add('fade-in');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initial fade-in for the first slide
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slide-content')[0].classList.add('fade-in');
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