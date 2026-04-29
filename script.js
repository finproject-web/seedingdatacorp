// B2B form functionality
document.addEventListener('DOMContentLoaded', function() {

    // Google Analytics placeholder - Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 Measurement ID

    // Track form start when user interacts with first field
    const firstField = document.querySelector('#company-name');
    if (firstField) {
        firstField.addEventListener('focus', function() {
            gtag('event', 'form_start', {
                'event_category': 'b2b_form',
                'event_label': 'lead_request_form'
            });
        }, { once: true });
    }

    // Form elements
    const form = document.getElementById('b2b-form');

    // Phone number formatting
    const phoneInput = document.getElementById('business-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
            } else if (value.length >= 3) {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
            }
            e.target.value = value;
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateB2BForm()) {
                // Collect form data
                const formData = {
                    companyName: document.getElementById('company-name')?.value || '',
                    contactName: document.getElementById('contact-name')?.value || '',
                    businessEmail: document.getElementById('business-email')?.value || '',
                    businessPhone: document.getElementById('business-phone')?.value || '',
                    leadType: document.getElementById('lead-type')?.value || '',
                    monthlyVolume: document.getElementById('monthly-volume')?.value || '',
                    b2bConsent: document.getElementById('b2b-consent')?.checked ? 'on' : 'off'
                };

                // Show success message and send data
                showB2BSuccessMessage(formData);
            }
        });
    }
});

// B2B Form Validation
function validateB2BForm() {
    let isValid = true;
    const form = document.getElementById('b2b-form');
    const requiredFields = form.querySelectorAll('[required]');

    // Remove previous error messages
    removeErrorMessages(form);

    requiredFields.forEach(field => {
        if (!validateB2BField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateB2BField(field) {
    let isValid = true;
    const value = field.value.trim();

    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    // Select validation
    if (field.tagName === 'SELECT' && value === '') {
        showFieldError(field, 'Please select an option');
        return false;
    }

    // Checkbox validation
    if (field.type === 'checkbox' && !field.checked) {
        showFieldError(field, 'You must agree to continue');
        return false;
    }

    return true;
}

// Error handling
function showFieldError(field, message) {
    field.classList.add('error');

    // Remove existing error message if any
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';

    field.parentNode.appendChild(errorElement);
}

function removeErrorMessages(container) {
    // Remove error classes
    const errorFields = container.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));

    // Remove error messages
    const errorMessages = container.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// B2B Success message
function showB2BSuccessMessage(formData) {
    // Track form submission
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'b2b_form',
            'event_label': 'lead_request_form',
            'value': 1
        });

        // Track conversion event
        gtag('event', 'conversion', {
            'event_category': 'lead_generation',
            'event_label': 'b2b_lead_request'
        });
    }

    // Custom event for external tracking
    const event = new CustomEvent('onFormSubmit', {
        detail: { formType: 'b2b_lead_request', timestamp: new Date().toISOString() }
    });
    document.dispatchEvent(event);

    // Create success message
    const formContainer = document.querySelector('.form-container');
    const form = document.getElementById('b2b-form');
    form.style.display = 'none';

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h3 style="color: #27ae60; margin-bottom: 20px;">Request Submitted Successfully!</h3>
            <p style="margin-bottom: 30px;">Thank you for your interest. Our team will review your request and contact you within 24 hours with your 20 free test leads.</p>
            <p style="color: #666; font-size: 14px;">For immediate assistance, please call us at 1-800-555-0199.</p>
        </div>
    `;
    formContainer.appendChild(successMessage);

    // Send form data to Google Apps Script
    sendB2BFormDataToGoogle(formData);
}

// Send B2B form data to Google Apps Script
function sendB2BFormDataToGoogle(formData) {
    // Google Apps Script URL (replace with your deployed script URL)
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwY2SBuj0ejGUDMg5LGDe6k8DBYltU4U1OMocJ7w7SsUFROfRn92ZDYyYbcHmEWB8ps/exec';

    // Get user IP and user agent
    const ip = 'Not detected';
    const userAgent = navigator.userAgent;

    // Prepare data for Google Apps Script
    const data = {
        companyName: formData.companyName,
        contactName: formData.contactName,
        businessEmail: formData.businessEmail,
        businessPhone: formData.businessPhone,
        leadType: formData.leadType,
        monthlyVolume: formData.monthlyVolume,
        b2bConsent: formData.b2bConsent,
        ip: ip,
        userAgent: userAgent
    };

    // Send data to Google Apps Script
    fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.text().then(text => {
            console.log('Response text:', text);
            try {
                return JSON.parse(text);
            } catch (e) {
                console.log('Failed to parse JSON, response was:', text);
                throw new Error('Invalid JSON response: ' + text);
            }
        });
    })
    .then(result => {
        console.log('Parsed result:', result);
        if (result.status === 'success') {
            console.log('B2B form submitted successfully');
        } else {
            console.error('Server returned error:', result);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        console.error('Error details:', error.message);
    });
}

// Smooth scroll to form
function scrollToForm() {
    const formSection = document.getElementById('form-section');
    if (formSection) {
        // Add small offset for better visibility on mobile
        const offset = 80; // Header height offset
        const elementPosition = formSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Focus on first form input for better UX
        setTimeout(() => {
            const firstInput = formSection.querySelector('#company-name');
            if (firstInput) {
                firstInput.focus();
            }
        }, 500);
    }
}

// FAQ toggle function
function toggleFAQ(element) {
    const faqItem = element.parentNode;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggle.textContent = '+';
        faqItem.classList.remove('active');
    } else {
        answer.style.display = 'block';
        toggle.textContent = '-';
        faqItem.classList.add('active');
    }
}
