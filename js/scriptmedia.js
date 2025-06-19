// DOM Elements
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeButton = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');
const menuToggle = document.getElementById('menuToggle');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoCards();
    initializeModal();
    initializeMobileMenu();
    initializeAnimations();
    preloadImages();
});

// Initialize video cards
function initializeVideoCards() {
    videoCards.forEach((card, index) => {
        card.addEventListener('click', function () {
            const videoFile = this.dataset.video;
            openVideoModal(videoFile);
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const videoFile = this.dataset.video;
                openVideoModal(videoFile);
            }
        });

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Воспроизвести видео: ${card.querySelector('h3').textContent}`);
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

const modalIframe = document.getElementById('modalIframe');

function openVideoModal(videoUrl) {
  modalIframe.src = videoUrl;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => closeButton.focus(), 100);
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
  modalIframe.src = '';
}


// Modal event handlers
function initializeModal() {
    closeButton.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Mobile menu placeholder
function initializeMobileMenu() {
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            console.log('Mobile menu clicked');
        });
    }
}

// Animate elements on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    videoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Preload thumbnails
function preloadImages() {
    const images = document.querySelectorAll('.video-thumbnail img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

// Hover effect on play button
videoCards.forEach(card => {
    const playButton = card.querySelector('.play-button');
    card.addEventListener('mouseenter', function() {
        if (playButton) {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }
    });
    card.addEventListener('mouseleave', function() {
        if (playButton) {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
});

// Video error handling
modalVideo.addEventListener('error', function() {
    console.error('Ошибка загрузки видео');
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;
        font-size: 18px;
        padding: 20px;
    `;
    errorMessage.textContent = 'Ошибка загрузки видео. Попробуйте позже.';
    document.querySelector('.modal-content').appendChild(errorMessage);
});

// Add spinning animation while loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);

videoCards.forEach(card => {
    card.addEventListener('click', function() {
        const playButton = this.querySelector('.play-button');
        if (playButton) {
            playButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
                </svg>
            `;
            playButton.style.animation = 'spin 1s linear infinite';
        }
    });
});
