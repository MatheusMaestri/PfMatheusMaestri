import  ('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');

const body = document.body;
const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');
const backToTop = document.getElementById('back-to-top');
const downloadCV = document.getElementById('download-cv');
const contactForm = document.getElementById('contact-form');
const preloader = document.querySelector('.preloader');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.classList.remove('no-scroll');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    animateOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

downloadCV.addEventListener('click', (e) => {
    e.preventDefault();
    
    const curriculoURL = 'CurriculoMatheusMaestri.pdf';
    
    const link = document.createElement('a');
    link.href = curriculoURL;
    link.download = 'Curriculo-Matheus-Maestri.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

emailjs.init("EBdHJJ-N77BDyWP3e");
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    const templateParams = {
        to_email: 'matheusmaestri28@gmail.com',
        from_name: name,
        from_email: email,
        message: message
    };
    
    emailjs.send('service_53haut9', 'template_4gntoop', templateParams)
        .then(function(response) {
            console.log('Email enviado!', response.status, response.text);
            showNotification(name, email, message);
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Erro ao enviar email:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        })
        .finally(function() {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

function showNotification(name, email, message) {
    document.getElementById('notificationName').textContent = name;
    document.getElementById('notificationEmail').textContent = email;
    document.getElementById('notificationMessage').textContent = message;
    
    const notification = document.getElementById('successNotification');
    notification.classList.add('show');
    
    setTimeout(function() {
        closeNotification();
    }, 5000);
}

function closeNotification() {
    const notification = document.getElementById('successNotification');
    notification.classList.remove('show');
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('appear');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500);
    

    animateOnScroll();
    setActiveNavLink();
});
