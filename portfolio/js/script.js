document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("FtWRhyqO9M7tyU24W"); // Replace with your EmailJS user ID
    })();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('.submit-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitBtn.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: contactForm.name.value,
            from_email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
        };
        
        // Send email using EmailJS
        emailjs.send('service_l9resdp', 'template_saf58oo', templateParams)
            .then(function(response) {
                // Show success message
                formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                formMessage.classList.remove('d-none', 'alert-danger');
                formMessage.classList.add('alert-success');
                
                // Reset form
                contactForm.reset();
            }, function(error) {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later or contact me directly at dulankanimsadn@gmail.com';
                formMessage.classList.remove('d-none', 'alert-success');
                formMessage.classList.add('alert-danger');
            })
            .finally(function() {
                // Reset button state
                submitText.textContent = 'Send Message';
                spinner.classList.add('d-none');
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);
            });
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power1.out"
        });
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .form-control, .social-icon, .btn-glow-icon, [data-tooltip]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
        });
    });

    // Initialize Typed.js
    if (document.querySelector('.typed')) {
        const typed = new Typed('.typed', {
            strings: ["web applications","digital experiences","youtube tutorials","responsive websites","full-stack solutions"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: false
        });
    }
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress-fill');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out"
        });
    });
    
    // Service card animations
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out"
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Animate skill bars when about section is in view
    const aboutSection = document.querySelector('#about');
    
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(aboutSection);
    }
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

function trackDownload(type) {
    // You can replace this with actual analytics tracking
    console.log(`${type} downloaded`);
    // Example: Google Analytics
    // gtag('event', 'download', { 'event_category': 'resume', 'event_label': type });
}