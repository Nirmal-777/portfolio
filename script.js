// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-container img');
const totalSlides = slides.length;

function updateCarousel() {
    const offset = -currentSlide * 33.333;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 3000);

// Form validation
const form = document.getElementById('visitorForm');
const errorMessages = {
    firstName: 'First name should only contain letters',
    lastName: 'Last name should only contain letters',
    email: 'Please enter a valid email address',
    mobile: 'Mobile number should be 10 digits',
    address: 'Address is required',
    district: 'Please select a district',
    password: 'Password must be at least 8 characters',
    gender: 'Please select a gender',
    education: 'Please select at least one qualification'
};

function validateField(field, value) {
    switch (field) {
        case 'firstName':
        case 'lastName':
            return /^[A-Za-z\s]+$/.test(value);
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'mobile':
            return /^\d{10}$/.test(value);
        case 'password':
            return value.length >= 8;
        case 'address':
            return value.trim() !== '';
        case 'district':
            return value !== '';
        case 'gender':
            return document.querySelector('input[name="gender"]:checked') !== null;
        case 'education':
            return document.querySelectorAll('input[name="education"]:checked').length > 0;
        default:
            return true;
    }
}

function showError(field, isValid) {
    const errorElement = document.getElementById(`${field}Error`);
    if (!isValid) {
        errorElement.textContent = errorMessages[field];
    } else {
        errorElement.textContent = '';
    }
}

function validateForm(e) {
    e.preventDefault();
    let isValid = true;

    // Validate text inputs
    ['firstName', 'lastName', 'email', 'mobile', 'address', 'password', 'district'].forEach(field => {
        const input = document.getElementById(field);
        const fieldIsValid = validateField(field, input.value);
        showError(field, fieldIsValid);
        isValid = isValid && fieldIsValid;
    });

    // Validate gender and education
    const genderIsValid = validateField('gender');
    const educationIsValid = validateField('education');
    showError('gender', genderIsValid);
    showError('education', educationIsValid);
    isValid = isValid && genderIsValid && educationIsValid;

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
        // Clear all error messages
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
    }
}

// Reset form and clear error messages
function resetForm() {
    form.reset();
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

// Event listeners
form.addEventListener('submit', validateForm);
form.addEventListener('reset', resetForm);

// Real-time validation
form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            const fieldName = input.name;
            showError(fieldName, validateField(fieldName));
        } else {
            showError(input.id, validateField(input.id, input.value));
        }
    });
});