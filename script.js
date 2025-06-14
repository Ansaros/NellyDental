// Contact form functionality
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !phone || !service) {
            alert('Пожалуйста, заполните обязательные поля');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'ОТПРАВЛЯЕМ...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Map controls functionality
const mapControls = document.querySelectorAll('.map-control');

mapControls.forEach(control => {
    control.addEventListener('click', function() {
        const action = this.classList.contains('zoom-in') ? 'zoom-in' :
                      this.classList.contains('zoom-out') ? 'zoom-out' : 'location';
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Here you would implement actual map functionality
        console.log('Map action:', action);
    });
});

// Update mobile menu for contacts page
const menuToggle = document.getElementById('menuToggle'); // Declare menuToggle variable
if (menuToggle) {
    const currentPath = window.location.pathname;
    const isContactsPage = currentPath.includes('kontakty.html');
    
    if (isContactsPage) {
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            const contactsLink = mobileNav.querySelector('a[href="kontakty.html"]');
            if (contactsLink) {
                contactsLink.classList.add('active');
            }
        }
    }
}