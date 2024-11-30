// Create games.js
document.addEventListener('DOMContentLoaded', () => {
    const genreFilter = document.getElementById('genre-filter');
    const searchInput = document.getElementById('game-search');
    const genreCards = document.querySelectorAll('.genre-card');
    const gameCards = document.querySelectorAll('.game__card');

    // Update genre counts
    function updateGenreCounts() {
        const genres = {};
        gameCards.forEach(card => {
            const genre = card.dataset.genre;
            genres[genre] = (genres[genre] || 0) + 1;
        });

        genreCards.forEach(card => {
            const genre = card.dataset.genre;
            const count = genre === 'all' ? gameCards.length : (genres[genre] || 0);
            card.querySelector('.genre-count').textContent = count;
        });
    }

    // Combined filter function
    function filterGames(selectedGenre = 'all', searchTerm = '') {
        searchTerm = searchTerm.toLowerCase();

        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genre = card.dataset.genre;
            
            const matchesSearch = title.includes(searchTerm);
            const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;

            card.style.display = (matchesSearch && matchesGenre) ? 'block' : 'none';
        });
    }

    // Genre card click handler
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            genreCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
            
            const selectedGenre = card.dataset.genre;
            filterGames(selectedGenre, searchInput.value);
        });
    });

    // Search input handler
    searchInput.addEventListener('input', debounce(() => {
        const activeGenre = document.querySelector('.genre-card.active')?.dataset.genre || 'all';
        filterGames(activeGenre, searchInput.value);
    }, 300));

    // Initialize
    updateGenreCounts();
    document.querySelector('[data-genre="all"]').classList.add('active');

    // Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        setupAddToCartButton(button);
    });

    // Optional: Add debounce to search for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    
    // Game data object
const gameDetails = {
    'gow': {
        description: 'Embark on a mythic journey for answers and vengeance as Kratos, the former God of War who deliberately exiled himself from his blood-soaked past in ancient Greece.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'November 9, 2022'
    },
    'veilguard': {
        description: 'Venture into a dark fantasy realm where ancient magic and political intrigue intertwine. Lead the VeilGuard in their quest to protect the world from emerging threats.',
        publisher: 'Electronic Arts',
        releaseDate: 'Coming 2024'
    },
    'starwarsoutlaws': {
        description: 'Experience the thrilling action-adventure in the Star Wars universe. Join the outlaws and fight against the Empire in this epic saga.',
        publisher: 'Ubisoft',
        releaseDate: 'December 2023'
    },
    'spacemarine2': {
        description: 'Join the Space Marines in their relentless battle against the forces of chaos. Experience intense action and epic battles in this sequel.',
        publisher: 'Focus Home Interactive',
        releaseDate: 'March 2023'
    },
    'helldivers2': {
        description: 'Dive into the depths of hell and fight your way through hordes of enemies. Team up with friends in this cooperative shooter.',
        publisher: 'Arrowhead Game Studios',
        releaseDate: 'October 2023'
    },
    'blackops6': {
        description: 'Join the elite Black Ops team in their latest mission. Experience intense first-person shooter action and a gripping storyline.',
        publisher: 'Activision',
        releaseDate: 'November 2023'
    },
    'dbsparkingzero': {
        description: 'Enter the world of Dragon Ball and experience epic battles with your favorite characters. Unleash powerful attacks and defeat your enemies.',
        publisher: 'Bandai Namco Entertainment',
        releaseDate: 'July 2023'
    },
    'blackmythwukong': {
        description: 'Embark on an epic journey inspired by the classic Chinese tale Journey to the West. Battle mythical creatures and uncover ancient secrets.',
        publisher: 'Game Science',
        releaseDate: 'August 2023'
    },
    'astrobot': {
        description: 'Join Astro Bot on a thrilling platforming adventure. Explore vibrant worlds, solve puzzles, and defeat enemies in this charming game.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'June 2023'
    },
    'battlefield2042': {
        description: 'Experience the chaos of all-out warfare in Battlefield 2042. Engage in massive battles with up to 128 players and dynamic weather events.',
        publisher: 'Electronic Arts',
        releaseDate: 'October 22, 2021'
    },
    'untildawn': {
        description: 'Survive the night in this interactive horror game. Make life-or-death decisions and uncover the mysteries of the haunted mountain.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'August 25, 2015'
    },
    'palworld': {
        description: 'Explore a vast open world filled with mysterious creatures. Capture, train, and battle with your pals in this unique adventure game.',
        publisher: 'Pocketpair',
        releaseDate: 'Coming 2024'
    },
    'eldenring': {
        description: 'Journey through the Lands Between in this epic fantasy action RPG. Uncover the mysteries of the Elden Ring and become the Elden Lord.',
        publisher: 'Bandai Namco Entertainment',
        releaseDate: 'February 25, 2022'
    },
    'tekken8': {
        description: 'Enter the King of Iron Fist Tournament and fight your way to the top in this latest installment of the Tekken series.',
        publisher: 'Bandai Namco Entertainment',
        releaseDate: 'Coming 2024'
    },
    'spidermanmilesmorales': {
        description: 'Swing into action as Miles Morales in this thrilling adventure. Master new powers and save New York City from a new threat.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'November 12, 2020'
    },
    'legohorizonadventures': {
        description: 'Join your favorite LEGO characters on an epic adventure through the Horizon Festival. Build, race, and explore in this fun-filled game.',
        publisher: 'Warner Bros. Interactive Entertainment',
        releaseDate: 'Coming 2024'
    },
    'spiderman2': {
        description: 'Experience the next chapter in the Spider-Man saga. Play as both Peter Parker and Miles Morales as they face new challenges and villains.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'October 20, 2023'
    },
    'sackboy': {
        description: 'Join Sackboy on a grand adventure in this charming platformer. Overcome obstacles, solve puzzles, and save Craftworld from the evil Vex.',
        publisher: 'Sony Interactive Entertainment',
        releaseDate: 'November 12, 2020'
    }
     
};

    // Game details modal functionality
    const gameModal = document.getElementById('game-details-modal');
    const closeGameModalBtn = document.getElementById('close-game-modal');
    
    // Add click event to game cards
    document.querySelectorAll('.game__card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) return;
            
            const addToCartBtn = card.querySelector('.add-to-cart');
            const gameId = addToCartBtn.dataset.id;
            const gameName = addToCartBtn.dataset.name;
            const gamePrice = addToCartBtn.dataset.price;
            const gameImage = addToCartBtn.dataset.image;
            const details = gameDetails[gameId];

            if (details) {
                // Update modal content
                document.querySelector('.game-details__image').src = gameImage;
                document.querySelector('.game-details__title').textContent = gameName;
                document.querySelector('.game-details__price').textContent = `$${gamePrice}`;
                document.querySelector('.game-details__publisher').textContent = `Publisher: ${details.publisher}`;
                document.querySelector('.game-details__release-date').textContent = `Release Date: ${details.releaseDate}`;
                document.querySelector('.game-details__description').textContent = details.description;
                
                // Clone and set up add-to-cart button
                const modalAddToCartBtn = addToCartBtn.cloneNode(true);
                document.querySelector('.game-details__info .add-to-cart').replaceWith(modalAddToCartBtn);
                setupAddToCartButton(modalAddToCartBtn);
                
                openGameModal();
            }
        });
    });

    // Update modal open/close handlers
    function openGameModal() {
        gameModal.style.display = 'flex';
        requestAnimationFrame(() => {
            gameModal.classList.add('active');
        });
    }

    function closeGameModal() {
        gameModal.classList.remove('active');
        setTimeout(() => {
            gameModal.style.display = 'none';
        }, 300);
    }

    // Close modal functionality
    closeGameModalBtn.addEventListener('click', () => {
        closeGameModal();
    });

    window.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });

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

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    
    if (gameId) {
        const gameCard = document.querySelector(`.game__card .add-to-cart[data-id="${gameId}"]`);
        if (gameCard) {
            const card = gameCard.closest('.game__card');
            openGameDetails(card);
        }
    }
});

function openGameDetails(card) {
    const addToCartBtn = card.querySelector('.add-to-cart');
    const gameId = addToCartBtn.dataset.id;
    const gameName = addToCartBtn.dataset.name;
    const gamePrice = addToCartBtn.dataset.price;
    const gameImage = addToCartBtn.dataset.image;
    const details = gameDetails[gameId];

    if (details) {
        // Update modal content
        document.querySelector('.game-details__image').src = gameImage;
        document.querySelector('.game-details__title').textContent = gameName;
        document.querySelector('.game-details__price').textContent = `$${gamePrice}`;
        document.querySelector('.game-details__publisher').textContent = `Publisher: ${details.publisher}`;
        document.querySelector('.game-details__release-date').textContent = `Release Date: ${details.releaseDate}`;
        document.querySelector('.game-details__description').textContent = details.description;

        // Clone and set up add-to-cart button
        const modalAddToCartBtn = addToCartBtn.cloneNode(true);
        document.querySelector('.game-details__info .add-to-cart').replaceWith(modalAddToCartBtn);
        setupAddToCartButton(modalAddToCartBtn);

        openGameModal();
    }
}

function openGameModal() {
    const gameModal = document.getElementById('game-details-modal');
    gameModal.style.display = 'block';
}

function closeGameModal() {
    const gameModal = document.getElementById('game-details-modal');
    gameModal.style.display = 'none';
}

document.getElementById('close-game-modal').addEventListener('click', closeGameModal);
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('game-details-modal')) {
        closeGameModal();
    }
});

// Add a reusable function for cart functionality
function setupAddToCartButton(button) {
    button.addEventListener('click', () => {
        const { id, name, price, image } = button.dataset;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            alert('Please log in to add items to cart');
            return;
        }

        const user = users.find(u => u.username === loggedInUser.username);
        if (!user.cart) user.cart = [];

        user.cart.push({ id, name, price, imgSrc: image });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Added to cart!');
    });
}
/* Add this to your JavaScript */
function toggleModalScroll() {
    document.body.classList.toggle('modal-open');
}
// Add when opening modal
document.querySelectorAll('.product__item').forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.add('modal-open');
    });
});

// Remove when closing modal
document.getElementById('close-product-modal').addEventListener('click', () => {
    document.body.classList.remove('modal-open');
});