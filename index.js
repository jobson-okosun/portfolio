window.addEventListener('DOMContentLoaded', () => {
    emailjs.init({ publicKey: "4hMw_SMqumBtuFaAG" });

    const form = document.getElementById('contact-form');
    const btn = form?.querySelector('button[type="button"]');

    btn?.addEventListener('click', (e) => {
        e.preventDefault();

        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        const serviceID = "service_7jp8jke";
        const templateID = "template_vh4vf5v";

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                Toastify({
                    text: "Message sent successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch((error) => {
                console.log(error);
                Toastify({
                    text: "Failed to send message. Please try again later.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #ff0000, #ff7e5f)",
                    },
                }).showToast();
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Modern Scroll Spy using IntersectionObserver
    const scrollObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                setActiveLink(id);
                
                // Update URL hash without scroll jump
                if (id !== 'hero') {
                    history.replaceState(null, null, `#${id}`);
                } else {
                    history.replaceState(null, null, window.location.pathname + window.location.search);
                }
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => scrollObserver.observe(section));

    // Handle initial load and manual hash changes
    const handleLocation = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveLink(hash);
            const target = document.getElementById(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
            setActiveLink('hero');
        }
    };

    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('load', handleLocation);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

});


