// ===== THEME TOGGLE FUNCTIONALITY =====
// Purpose: Allow users to toggle between light and dark mode
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Light Mode';
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    
    // ===== FAQ COLLAPSIBLE SECTION =====
    // Purpose: Allow users to expand/collapse FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Update icon
            icon.textContent = item.classList.contains('active') ? '−' : '+';
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });
        });
    });
    
    // ===== DROPDOWN MENU FUNCTIONALITY =====
    // Purpose: Show/hide dropdown menu on click
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });
    
    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ===== INTERACTIVE DEMO =====
    // Purpose: Demonstrate various event listeners
    const interactiveBox = document.getElementById('interactiveBox');
    const keypressDisplay = document.getElementById('keypressDisplay');
    
    // Change color on mouseover
    interactiveBox.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#e74c3c';
        this.textContent = 'Mouse Over!';
    });
    
    // Revert color on mouseout
    interactiveBox.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#4a90e2';
        this.textContent = 'Click Me!';
    });
    
    // Change on click
    interactiveBox.addEventListener('click', function() {
        this.style.backgroundColor = '#2ecc71';
        this.textContent = 'Clicked!';
    });
    
    // Double click action
    interactiveBox.addEventListener('dblclick', function() {
        this.style.backgroundColor = '#9b59b6';
        this.textContent = 'Double Clicked!';
    });
    
    // Display key presses
    document.addEventListener('keydown', function(e) {
        keypressDisplay.textContent = `You pressed: ${e.key}`;
        
        // Clear after 2 seconds
        setTimeout(() => {
            keypressDisplay.textContent = 'Press any key to see it here';
        }, 2000);
    });
    
    // ===== FORM VALIDATION =====
    // Purpose: Validate form inputs and provide user feedback
    const form = document.getElementById('validationForm');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        phone: document.getElementById('phone')
    };
    
    const errorMessages = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
        phone: document.getElementById('phoneError')
    };
    
    const successMessage = document.getElementById('successMessage');
    
    // Validation functions
    function validateName() {
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        if (!nameRegex.test(inputs.name.value.trim())) {
            showError(inputs.name, errorMessages.name);
            return false;
        } else {
            showSuccess(inputs.name);
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email.value.trim())) {
            showError(inputs.email, errorMessages.email);
            return false;
        } else {
            showSuccess(inputs.email);
            return true;
        }
    }
    
    function validatePassword() {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(inputs.password.value)) {
            showError(inputs.password, errorMessages.password);
            return false;
        } else {
            showSuccess(inputs.password);
            return true;
        }
    }
    
    function validatePhone() {
        // Simple 10-digit phone number validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(inputs.phone.value.trim())) {
            showError(inputs.phone, errorMessages.phone);
            return false;
        } else {
            showSuccess(inputs.phone);
            return true;
        }
    }
    
    // Helper functions for validation UI
    function showError(input, errorElement) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.style.display = 'block';
    }
    
    function showSuccess(input) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
    }
    
    // Real-time validation as user types
    inputs.name.addEventListener('input', validateName);
    inputs.email.addEventListener('input', validateEmail);
    inputs.password.addEventListener('input', validatePassword);
    inputs.phone.addEventListener('input', validatePhone);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPhoneValid = validatePhone();
        
        // If all valid, show success message
        if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
            successMessage.style.display = 'block';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
                
                // Remove success classes
                Object.values(inputs).forEach(input => {
                    input.classList.remove('input-success');
                });
            }, 2000);
        }
    });
});
