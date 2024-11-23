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

