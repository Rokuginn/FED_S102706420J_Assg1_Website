// Function 0: To create a mobile menu for smaller screens
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navlogo = document.querySelector('#navbar__logo');

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}
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