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
    const navLinks = document.querySelectorAll('.nav-link:not([href="#hero"]):not(.font-display)');

    window.addEventListener('scroll', () => {
        let current = 'hero';
        const navHeight = document.getElementById('navbar').offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - navHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-cyan-400');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-cyan-400');
            }
        });
    });

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


