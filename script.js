// State management
let isEnvelopeOpened = false;
let animationTimeout;

// DOM elements
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const instruction = document.getElementById('instruction');
const container = document.querySelector('.container');

// Envelope click handler
envelope.addEventListener('click', openEnvelope);

function openEnvelope() {
    // If envelope hasn't been opened yet, do the full opening sequence
    if (!isEnvelopeOpened) {
        isEnvelopeOpened = true;
        
        // Add opened class to envelope
        envelope.classList.add('opened');
        
        // Hide instruction
        instruction.classList.add('hidden');
        
        // Start animations
        startAnimations();
        
        // Show letter after a brief delay
        setTimeout(() => {
            showLetter();
        }, 1000);
        
        // Keep cursor as pointer for subsequent clicks
        envelope.style.cursor = 'pointer';
    } else {
        // If envelope is already opened, just show the letter immediately
        showLetter();
    }
}

function startAnimations() {
    // Add active class to trigger animations
    container.classList.add('animations-active');
    
    // Start individual animation cycles
    startButterflyAnimations();
    startFlowerAnimations();
    startHeartAnimations();
}

function startButterflyAnimations() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach((butterfly, index) => {
        // Reset position and start animation
        setTimeout(() => {
            butterfly.style.visibility = 'visible';
            butterfly.style.opacity = '1';
            butterfly.style.animationPlayState = 'running';
            butterfly.style.transform = 'translate(-50%, -50%) scale(0)';
        }, index * 300);
    });
}

function startFlowerAnimations() {
    const flowers = document.querySelectorAll('.flower');
    
    flowers.forEach((flower, index) => {
        setTimeout(() => {
            flower.style.visibility = 'visible';
            flower.style.opacity = '1';
            flower.style.animationPlayState = 'running';
            flower.style.transform = 'translate(-50%, -50%) scale(0)';
        }, index * 400 + 500);
    });
}

function startHeartAnimations() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.visibility = 'visible';
            heart.style.opacity = '1';
            heart.style.animationPlayState = 'running';
            heart.style.transform = 'translate(-50%, -50%) scale(0)';
        }, index * 800 + 1000);
    });
}

function showLetter() {
    letter.classList.add('show');
    
    // Add gentle shake effect to letter
    setTimeout(() => {
        letter.style.animation = 'gentle-shake 0.5s ease-in-out';
    }, 300);
}

function closeLetter() {
    letter.classList.remove('show');
}

// Add gentle shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes gentle-shake {
        0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        25% { transform: translate(-50%, -50%) scale(1) rotate(1deg); }
        75% { transform: translate(-50%, -50%) scale(1) rotate(-1deg); }
    }
`;
document.head.appendChild(style);

// Add some romantic touches
function createFloatingElements() {
    // Create subtle floating hearts in background
    setInterval(() => {
        if (!isEnvelopeOpened) return;
        
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.fontSize = '1em';
        heart.style.opacity = '0.3';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = 'float-up 15s linear forwards';
        
        document.body.appendChild(heart);
        
        // Remove element after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 15000);
    }, 3000);
}

// Float up animation for background hearts
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float-up {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        50% { opacity: 0.1; }
        100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(floatStyle);

// Start background effects after envelope is opened
setTimeout(() => {
    createFloatingElements();
}, 2000);

// Add sparkle effect on envelope hover
envelope.addEventListener('mouseenter', function() {
    this.style.filter = 'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))';
});

envelope.addEventListener('mouseleave', function() {
    this.style.filter = 'none';
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && letter.classList.contains('show')) {
        closeLetter();
    }
    
    if (e.key === 'Enter' && envelope === document.activeElement) {
        openEnvelope();
    }
});

// Click outside letter to close
letter.addEventListener('click', function(e) {
    if (e.target === letter) {
        closeLetter();
    }
});

// Prevent letter content clicks from closing the letter
document.querySelector('.letter-content').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Add focus for accessibility
envelope.setAttribute('tabindex', '0');
envelope.setAttribute('role', 'button');
envelope.setAttribute('aria-label', 'Click to open love letter');

// Add some console easter eggs for the tech-savvy girlfriend 😊
console.log('%c💖 Happy National Girlfriends Day! 💖', 'color: #d63384; font-size: 20px; font-weight: bold;');
console.log('%cYou found the secret message! Your boyfriend loves you very much! 🥰', 'color: #6c757d; font-style: italic;');

// Performance optimization: pause animations when not visible
document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('.butterfly, .flower, .heart');
    
    if (document.hidden) {
        animations.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else if (isEnvelopeOpened) {
        animations.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
