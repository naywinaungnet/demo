document.addEventListener('DOMContentLoaded', function() {
    // ------------------- Header Sticky and Shrink Effect -------------------
    const header = document.querySelector('header');

    function adjustMainPadding() {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled'); // Add class to body to adjust main padding
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', adjustMainPadding);
    adjustMainPadding(); // Call on load in case page is already scrolled


    // ------------------- Image Slider -------------------
    let slideIndex = 0;
    const slides = document.querySelectorAll('#hero .slide');
    const totalSlides = slides.length;

    function showSlides(n) {
        // Handle slide index
        if (n >= totalSlides) { slideIndex = 0; }
        if (n < 0) { slideIndex = totalSlides - 1; }

        // Remove active class and reset animation from current content
        slides.forEach(slide => {
            slide.classList.remove('active');
            const heroContent = slide.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.animation = 'none'; // Reset animation
                void heroContent.offsetWidth; // Trigger reflow for re-animation
            }
        });

        // Add active class to new slide and re-apply animation
        slides[slideIndex].classList.add('active');
        const newHeroContent = slides[slideIndex].querySelector('.hero-content');
        if (newHeroContent) {
            newHeroContent.style.animation = 'fadeIn 1.2s ease-out forwards'; // Match CSS animation duration
        }
    }

    function changeSlide(n) {
        // Clear existing interval to prevent conflicts when manually changing slides
        clearInterval(autoSlideInterval);
        showSlides(slideIndex += n);
        // Restart interval after manual change
        autoSlideInterval = setInterval(() => changeSlide(1), 5000);
    }

    // Initialize auto-advance
    let autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change image every 5 seconds

    // Add click listeners to slider nav buttons (prev/next)
    document.querySelector('.slider-nav .prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.slider-nav .next').addEventListener('click', () => changeSlide(1));

    // Initial display
    showSlides(slideIndex);


    // ------------------- Mobile Navigation (Hamburger Menu) -------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent body scroll when menu is open
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });


    // ------------------- Active Navigation Link on Scroll -------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = header.offsetHeight; // Get current header height (shrunk or full)

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.clientHeight;
            // Add a small buffer to ensure the link highlights a bit early
            if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});