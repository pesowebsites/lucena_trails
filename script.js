document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('.navbar .nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is an internal anchor on the same page
            // This is primarily for index.html's "Start Your Journey" button
            // or if we decide to re-introduce internal anchors within a page.
            // For multi-page navigation, the default href behavior handles it.
            const href = this.getAttribute('href');
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open after click
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
            // For external HTML links (e.g., index.html -> culinary.html),
            // we let the default behavior (page load) happen.
        });
    });

    // 2. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Highlight Active Navigation Link based on current page
    const currentPath = window.location.pathname.split('/').pop(); // e.g., "index.html", "culinary.html"
    const navLinksList = document.querySelectorAll('.nav-links a');

    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === '' || currentPath === 'index.html') { // Handle root and index.html
            if (linkPath === 'index.html') {
                link.classList.add('active');
            }
        } else if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure other links are not active
        }
    });


    // 4. Scroll-triggered Animations using Intersection Observer
    const animateSections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // callback fires when 10% of the target is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateSections.forEach(section => {
        observer.observe(section);
    });

    // 5. Basic Contact Form Submission (Client-side only for portfolio demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
            // Example:
            // const formData = new FormData(this);
            // fetch('/api/contact', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message sent successfully!');
            //     this.reset();
            // })
            // .catch(error => {
            //     alert('There was an error sending your message.');
            //     console.error('Error:', error);
            // });

            // For this demo, just simulate success:
            console.log('Contact form submitted (demo mode)!');
            // Use a custom modal or message box instead of alert() for better UX
            // For now, using alert() as a quick demonstration placeholder
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }

});
