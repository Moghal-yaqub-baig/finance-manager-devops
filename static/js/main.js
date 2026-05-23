// Add animation class to cards when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-fade-in');
        }, index * 100);
    });
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Format currency inputs
    const currencyInputs = document.querySelectorAll('input[type="number"][name="amount"]');
    currencyInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            if (this.value) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });
    });
    
    // Confirm delete
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm(this.dataset.confirm)) {
                e.preventDefault();
            }
        });
    });
    
    // Flash message auto-dismiss
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        setTimeout(() => {
            const closeButton = message.querySelector('.btn-close');
            if (closeButton) {
                closeButton.click();
            }
        }, 5000);
    });
    
    // Theme handling - fix any inconsistencies in theme display
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    
    // For theme toggling in settings
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // This doesn't immediately change the theme, but shows a preview
            if (this.checked) {
                document.documentElement.setAttribute('data-bs-theme', this.value);
            }
        });
    });
    
    // Fix any theme-related UI inconsistencies
    if (currentTheme === 'dark') {
        // Ensure all bg-light elements get proper dark mode styling
        document.querySelectorAll('.bg-light').forEach(el => {
            el.classList.remove('bg-light');
            el.classList.add('bg-dark');
        });
        
        // Ensure all text-muted get proper dark mode styling
        document.querySelectorAll('.text-muted').forEach(el => {
            el.classList.remove('text-muted');
            el.classList.add('text-body-secondary');
        });
    }
}); 